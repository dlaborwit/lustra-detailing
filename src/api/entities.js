// Stub entities - backend functionality removed

export const Booking = {
  filter: async () => [],
  create: async (data) => ({ id: Date.now(), ...data })
};

export const ContactMessage = {
  create: async (data) => ({ id: Date.now(), ...data })
};

export const User = {
  // Auth functionality disabled
};
