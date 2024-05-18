import { z } from 'zod';
export const SearchSchema = z.object({
    startLocation: z.string().min(1, "Vui lòng chọn điểm đến"),
    endLocation: z.string().min(1, "Vui lòng chọn điểm đi"),
    startDate: z.date(),
})