'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import OtpCode from '@/assets/OtpCode.png'
import LogoIcon from '@/assets/LogoIcon.png'

import { Button } from '@/components/global/atoms/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/global/atoms/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/global/atoms/input-otp'

import { OtpShema } from '@/lib/schemas/OtpSchema'
import { Badge } from '../atoms/badge'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import busAPI from '@/lib/busAPI'
import { toast } from 'sonner'
import Loading from '@/components/local/login/Loading'

function OtpForm() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const email = useParams().email
  const form = useForm<z.infer<typeof OtpShema>>({
    resolver: zodResolver(OtpShema),
    defaultValues: {
      otpCode: ''
    }
  })

  // function onSubmit(data: z.infer<typeof OtpShema>) {
  //   console.log(data)
  // }
  const onSubmit = async (data: z.infer<typeof OtpShema>) => {
    try {
      setLoading(true)
      const response = await busAPI.put('/user-management/managed-users/otp-code-submission', {
        email: email,
        otpCode: data.otpCode
      })
      setLoading(false)
      toast.success('Xác thực thành công vui lòng đăng nhập!')
      console.log('OTP verification successful:', response.data)
      navigate("/login")
      // Handle successful OTP verification, e.g., redirect or display success message
    } catch (error) {
      setLoading(false)
      console.error('Error verifying OTP:', error)
      toast.error('Xác thực thất bại vui lòng kiểm tra lại!')
      // Handle error, e.g., display error message to user
    }
  }
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [])
  return (
    <div className='flex h-screen items-center justify-center py-40 '>
      <div className='flex w-[1000px] items-center justify-between gap-4  rounded-md shadow-content shadow-xl'>
        <div className=' w-1/2  flex-1'>
          <img className='h-[600px] w-full object-contain' src={OtpCode} alt='logo' />
        </div>
        <div className='flex w-1/2 flex-col items-center justify-center gap-6 '>
          <p className='text-center text-2xl font-semibold'> Nhập mã xác nhận</p>

          <div className='flex flex-col items-center justify-center gap-4'>
            <img src={LogoIcon} alt='Logo' width={50} />
            <Badge variant='outline' className='text-primary text-lg font-bold border-primary'>
              The Bus Journey
            </Badge>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6 w-fit flex flex-col justify-center items-center'
            >
              <FormField
                control={form.control}
                name='otpCode'
                render={({ field }) => (
                  <FormItem className='flex flex-col justify-center items-center'>
                    <FormLabel className='text-center text-md'>
                      Chúc mừng bạn đã hoàn thành thủ tục tạo tài khoản.
                      <br />
                      <p className='mt-1 mb-4'>Mã xác thực đã được gửi qua Email của bạn!</p>
                    </FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field} ref={firstInputRef}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>Vui lòng nhập mã xác thực đã được gửi qua mail nhé!</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' disabled={loading}>{loading && <Loading/>}Xác nhận</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default OtpForm
