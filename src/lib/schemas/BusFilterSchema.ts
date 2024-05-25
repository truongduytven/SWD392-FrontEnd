import { z } from 'zod';
export const BusFilterSchema = z.object({
    language: z.array(z.string()).optional()
  })