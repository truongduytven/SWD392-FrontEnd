import { z } from 'zod'

export const ratingSchema = z.object({
  value: z.coerce.number({ invalid_type_error: 'Số sao không hợp lệ' }).min(1, 'Ít nhất 1 sao').max(5, 'Tối đa 5 sao'),
  content: z.string().optional(),
  imageUrls: z.array(z.instanceof(File)).optional()
})