// Stub for removed Base44 SDK
// This file maintains the import structure but doesn't connect to any backend

export const base44 = {
  entities: {
    Booking: {
      filter: async () => [],
      create: async (data) => ({ id: Date.now(), ...data })
    }
  },
  integrations: {
    Core: {
      SendEmail: async () => console.log('Email function disabled - backend not connected')
    }
  }
};
