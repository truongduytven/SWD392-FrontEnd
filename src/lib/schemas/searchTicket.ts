import { z } from 'zod'
export const searchTicket = z.object({
	email: z
		.string()
		.min(1, 'Email là bắt buộc')
		.max(40, 'Email ít hơn 40 kí tự')
		.email('Email không hợp lệ'),
	qrCode: z.string().min(3, 'Mã code phải dài ít nhất 3 kí tự'),
})