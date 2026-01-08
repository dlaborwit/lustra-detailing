const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    try {
        const bookingData = JSON.parse(event.body);

        // Validate required fields
        if (!bookingData.name || !bookingData.email || !bookingData.phone ||
            !bookingData.date || !bookingData.time_window) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing required fields' })
            };
        }

        // Generate unique booking ID
        const bookingId = `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Create booking object
        const booking = {
            id: bookingId,
            ...bookingData,
            createdAt: new Date().toISOString()
        };

        // Send email notification
        try {
            await sendEmailNotification(booking);
        } catch (emailError) {
            console.error('Email error:', emailError);
            // Don't fail the booking if email fails
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Booking created successfully',
                bookingId: bookingId
            })
        };

    } catch (error) {
        console.error('Error creating booking:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};

async function sendEmailNotification(booking) {
    // Email configuration from environment variables
    const emailConfig = {
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    };

    // Check if email credentials are configured
    if (!emailConfig.auth.user || !emailConfig.auth.pass) {
        console.log('Email credentials not configured. Skipping email notification.');
        return;
    }

    const transporter = nodemailer.createTransport(emailConfig);

    const vehicleTypes = {
        sedan: 'Sedan',
        suv: 'SUV',
        truck: 'Truck',
        coupe: 'Coupe',
        van: 'Van'
    };

    const timeWindows = {
        morning: 'Morning (8 AM - 12 PM)',
        afternoon: 'Afternoon (12 PM - 4 PM)',
        evening: 'Evening (4 PM - 6 PM)'
    };

    const bookingDate = new Date(booking.date);
    const formattedDate = bookingDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Email to business owner
    const ownerEmailContent = `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #000; font-weight: 300; letter-spacing: -0.02em;">New Booking Received</h2>
            <div style="background: #f8f8f8; padding: 20px; margin: 20px 0;">
                <p style="margin: 10px 0;"><strong>Booking ID:</strong> ${booking.id}</p>
                <p style="margin: 10px 0;"><strong>Customer Name:</strong> ${booking.name}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> ${booking.email}</p>
                <p style="margin: 10px 0;"><strong>Phone:</strong> ${booking.phone}</p>
                <p style="margin: 10px 0;"><strong>Date:</strong> ${formattedDate}</p>
                <p style="margin: 10px 0;"><strong>Time Window:</strong> ${timeWindows[booking.time_window] || booking.time_window}</p>
                <p style="margin: 10px 0;"><strong>Vehicle Type:</strong> ${vehicleTypes[booking.vehicle_type] || booking.vehicle_type}</p>
                <p style="margin: 10px 0;"><strong>Address:</strong> ${booking.address}</p>
                ${booking.notes ? `<p style="margin: 10px 0;"><strong>Notes:</strong> ${booking.notes}</p>` : ''}
            </div>
            <p style="color: #666; font-size: 14px;">Please contact the customer to confirm the appointment details.</p>
        </div>
    `;

    // Email to customer
    const customerEmailContent = `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #000; font-weight: 300; letter-spacing: -0.02em;">Thank You for Your Booking!</h2>
            <p style="color: #666; font-size: 16px;">Dear ${booking.name},</p>
            <p style="color: #666; font-size: 16px;">We've received your detailing appointment request. Here are the details:</p>

            <div style="background: #f8f8f8; padding: 20px; margin: 20px 0;">
                <p style="margin: 10px 0;"><strong>Date:</strong> ${formattedDate}</p>
                <p style="margin: 10px 0;"><strong>Time Window:</strong> ${timeWindows[booking.time_window] || booking.time_window}</p>
                <p style="margin: 10px 0;"><strong>Vehicle:</strong> ${vehicleTypes[booking.vehicle_type] || booking.vehicle_type}</p>
                <p style="margin: 10px 0;"><strong>Location:</strong> ${booking.address}</p>
                <p style="margin: 10px 0;"><strong>Booking ID:</strong> ${booking.id}</p>
            </div>

            <p style="color: #666; font-size: 16px;">A member of our team will contact you shortly to confirm your appointment and provide any additional details.</p>
            <p style="color: #666; font-size: 16px;">If you have any questions, feel free to reply to this email.</p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="color: #000; font-size: 18px; font-weight: 300;"><span style="font-weight: 300;">Lustra</span> <span style="font-weight: 500;">Detailing</span></p>
                <p style="color: #999; font-size: 14px;">Premium Mobile Car Detailing</p>
            </div>
        </div>
    `;

    const ownerEmail = {
        from: emailConfig.auth.user,
        to: process.env.OWNER_EMAIL || emailConfig.auth.user,
        subject: `🚗 New Booking: ${booking.name} - ${formattedDate}`,
        html: ownerEmailContent
    };

    const customerEmail = {
        from: emailConfig.auth.user,
        to: booking.email,
        subject: '✓ Booking Confirmation - Lustra Detailing',
        html: customerEmailContent
    };

    // Send both emails
    await transporter.sendMail(ownerEmail);
    await transporter.sendMail(customerEmail);

    console.log('Emails sent successfully');
}
