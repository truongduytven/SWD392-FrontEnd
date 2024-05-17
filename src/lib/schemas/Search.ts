import { z } from 'zod';
export const SearchSchema = z.object({
    startLocation: z.string().min(1 ,"Start location is required"),
    endLocation: z.string().min(1 ,"End location is required"),
    startDate: z.string(),
    endDate: z.string(),
})