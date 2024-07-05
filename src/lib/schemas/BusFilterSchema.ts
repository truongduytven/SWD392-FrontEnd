import { z } from 'zod';
export const BusFilterSchema = z.object({
    company: z.array(z.string()).optional()
  })