import { z } from 'zod';

export const ArrangeSchema = z.object({
    type: z.enum(['DEFAULT', 'TIME_SOONER', 'TIME_LATER', 'PRICE_ASC', "PRICE_DESC", "RATING_ASC","RATING_DESC"], {
      required_error: 'You need to select a notification type.'
    })
  })