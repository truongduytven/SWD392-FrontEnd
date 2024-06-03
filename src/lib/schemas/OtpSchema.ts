import { z } from 'zod';
export const OtpShema = z.object({
    otp: z.string().min(6, {
        message: "Mã xác thực bao gồm 6 chữ số",
      }),
})