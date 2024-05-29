import { z } from 'zod'
export const searchTicket = z.object({
	email: z
		.string()
		.min(1, 'Email là bắt buộc')
		.max(40, 'Email ít hơn 40 kí tự')
		.email('Email không hợp lệ'),
	code: z.string().min(5, 'Mã code phải dài ít nhất 5 kí tự'),
})