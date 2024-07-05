import { z } from 'zod';

export const ArrangeSchema = z.object({
    type: z.enum(['MẶC ĐỊNH', 'THỜI GIAN ĐI SỚM NHẤT', 'THỜI GIAN ĐI MUỘN NHẤT', 'GIÁ TĂNG DẦN', "GIÁ GIẢM DẦN", "TỔNG SỐ ĐÁNH GIÁ TĂNG DẦN","TỔNG SỐ ĐÁNH GIÁ GIẢM DẦN"], {
      required_error: 'You need to select a notification type.'
    })
  })