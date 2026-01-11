const { Resend } = require('resend');
const twilio = require('twilio');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    try {
        const contactData = JSON.parse(event.body);

        // Validate required fields
        if (!contactData.name || !contactData.email || !contactData.phone || !contactData.message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing required fields' })
            };
        }

        // Generate unique contact ID
        const contactId = `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const contact = {
            id: contactId,
            ...contactData,
            createdAt: new Date().toISOString()
        };

        // Send notifications (email + SMS)
        try {
            await sendNotifications(contact);
        } catch (notificationError) {
            console.error('Notification error:', notificationError);
            // Don't fail the contact submission if notifications fail
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Contact form submitted successfully',
                contactId: contactId
            })
        };

    } catch (error) {
        console.error('Error submitting contact form:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};

async function sendNotifications(contact) {
    // Send SMS to customer
    await sendSMS(contact);

    // Send email to owner
    await sendEmail(contact);
}

async function sendSMS(contact) {
    // Check if Twilio credentials are configured
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
        console.log('Twilio credentials not configured. Skipping SMS.');
        return;
    }

    try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        const message = `Thanks for reaching out to Lustra Detailing, ${contact.name}! We received your message and will be in contact soon. - Lustra Detailing`;

        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: contact.phone
        });

        console.log('SMS sent successfully to', contact.phone);
    } catch (error) {
        console.error('SMS error:', error);
        throw error;
    }
}

async function sendEmail(contact) {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
        console.log('Resend API key not configured. Skipping email.');
        return;
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Email to business owner
        const ownerEmailHtml = `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #000; font-weight: 300; letter-spacing: -0.02em;">New Contact Form Submission</h2>
                <div style="background: #f8f8f8; padding: 20px; margin: 20px 0;">
                    <p style="margin: 10px 0;"><strong>Contact ID:</strong> ${contact.id}</p>
                    <p style="margin: 10px 0;"><strong>Name:</strong> ${contact.name}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> ${contact.email}</p>
                    <p style="margin: 10px 0;"><strong>Phone:</strong> ${contact.phone}</p>
                    <p style="margin: 10px 0;"><strong>Message:</strong></p>
                    <p style="margin: 10px 0; padding: 15px; background: white; border-left: 3px solid #000;">${contact.message}</p>
                </div>
                <p style="color: #666; font-size: 14px;">Please respond to this inquiry as soon as possible.</p>
            </div>
        `;

        // Send email to owner
        await resend.emails.send({
            from: 'Lustra Detailing <onboarding@resend.dev>',
            to: process.env.OWNER_EMAIL,
            replyTo: contact.email,
            subject: `💬 New Contact Form: ${contact.name}`,
            html: ownerEmailHtml
        });

        console.log('Email sent successfully to owner');
    } catch (error) {
        console.error('Email error:', error);
        throw error;
    }
}
