import { z } from 'zod'
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email là bắt buộc')
		.max(40, 'Email ít hơn 40 kí tự')
		.email('Email không hợp lệ'),
	password: z.string().min(5, 'Mật khẩu phải dài ít nhất 5 kí tự'),
})
export const signUpSchema = z
	.object({
        name: z
            .string()
            .min(2, 'Tên phải nhiều hơn 2 kí tự')
            .max(40, 'Tên ít hơn 40 kí tự'),
        email: z
            .string()
            .min(1, 'Email là bắt buộc')
            .max(40, 'Email ít hơn 40 kí tự')
            .email('Email không hợp lệ'),
       
		password: z
			.string()
			.min(8, {
				message:
					'Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 8 ký tự.Yêu cầu bao gồm: 1 chữ hoa (A-Z) 1 chữ thường (a-z) 1 số (0-9) 1 ký tự đặc biệt(_, #, ?, !, @, $, %, ^, &, *, -)',
			})
			.regex(
				/^(?!.*(.)\1{2,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[_#?!@$%^&*\\-])[A-Za-z0-9_#?!@$%^&*\\-]{8,}$/,
				{
					message:
						'Mật khẩu không hợp lệ. Yêu cầu gồm: 1 chữ hoa (A-Z) 1 chữ thường (a-z) 1 số (0-9) 1 ký tự đặc biệt(_, #, ?, !, @, $, %, ^, &, *, -)',
				},
			),
		confirmpassword: z.string(),
	})	
	.refine((data) => data.password === data.confirmpassword, {
		message: "Mật khẩu không khớp, vui lòng kiểm tra lại!",
		path: ['confirmpassword'], // path of error
	})