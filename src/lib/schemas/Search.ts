import { z } from 'zod';
export const SearchSchema = z.object({
    startLocation: z.string(),
    endLocation: z.string(),
    startDate: z.date(),
})