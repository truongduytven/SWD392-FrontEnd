import { z } from 'zod';
export const TypeSchema = z.object({
    items: z.array(z.string()).optional()
  })