import { z } from 'zod';

export const ArrangeSchema = z.object({
    type: z.enum(['mac dinh', 'gio som nhat', 'gio muon nhat', 'gia tang dan', "gia giam dan"], {
      required_error: 'You need to select a notification type.'
    })
  })