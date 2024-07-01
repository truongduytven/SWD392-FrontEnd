import { Input } from '@/components/global/atoms/input'
import { signUpSchema } from '@/lib/schemas/Signin_Signup'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/global/atoms/form'
import { z } from 'zod'
import { PasswordInput } from '../atoms/password-input'
import { useEffect, useState } from 'react'
import LogoIcon from '@/assets/LogoMini.png'
import { Link, useNavigate } from 'react-router-dom'
import busAPI from '@/lib/busAPI'
import { toast } from 'sonner'
import Loading from '@/components/local/login/Loading'

type FormSignUpProps = {
  reset: boolean
}
function FormSignUp({ reset }: FormSignUpProps) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const formSignUp = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: '',
      fullName: '',
      email: '',
      address: '',
      phoneNumber: '',
      password: '',
      confirmpassword: ''
    }
  })
  useEffect(() => {
    console.log('sign up xóa')
    formSignUp.reset()
  }, [reset])

  const onSubmitSignUp = async (data: any) => {
    try {
      setLoading(true)
      const response = await busAPI.post('/auth-management/managed-auths/sign-ups', data)
      console.log('Signup successful:', response.data.message)
      setLoading(false)
      toast.success('Đăng kí thành công, vui lòng kiểm tra mail và xác nhận!')
      navigate(`/otp-verified/${data.email}`)
      // Handle successful signup, e.g., redirect or display success message
    } catch (error) {
      setLoading(false)
      console.error('Error signing up:', error)
      toast.error('Email đã tồn tại, vui lòng thử với email khác')

      // toast.error("Đăng kí thất bại, vui lòng thử lại")
      // Handle error, e.g., display error message to user
    }
  }
  return (
    <Form {...formSignUp}>
      <form
        onSubmit={formSignUp.handleSubmit(onSubmitSignUp)}
        className='flex items-center justify-start flex-col h-full gap-2 text-center shadow-xl mr-20 '
      >
        <p className='font-medium text-2xl'>Tạo tài khoản</p>
        <p className='flex items-center text-muted-foreground'>
          để tiếp tục với <img src={LogoIcon} className='mx-1' width={20} />
          The Bus Journey
        </p>
        <FormField
          control={formSignUp.control}
          name='fullName'
          render={({ field }) => (
            <FormItem className='w-3/4 flex flex-col justify-center items-start'>
              <FormLabel>Họ và Tên</FormLabel>
              <FormControl className=''>
                <Input placeholder='Nhập họ tên của bạn' {...field} className='' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-3/4 justify-center gap-2 items-start'>
          <FormField
            control={formSignUp.control}
            name='userName'
            render={({ field }) => (
              <FormItem className='w-3/4 flex flex-col justify-center items-start'>
                <FormLabel>Tên</FormLabel>
                <FormControl className=''>
                  <Input placeholder='Nhập tên của bạn' {...field} className='' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formSignUp.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem className='w-3/4 flex flex-col justify-center items-start'>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl className=''>
                  <Input placeholder='Nhập số điện thoại của bạn' {...field} className='' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={formSignUp.control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-3/4 flex flex-col justify-center items-start'>
              <FormLabel>Email</FormLabel>
              <FormControl className=''>
                <Input placeholder='Nhập email của bạn' {...field} className='' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formSignUp.control}
          name='address'
          render={({ field }) => (
            <FormItem className='w-3/4 flex flex-col justify-center items-start'>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl className=''>
                <Input placeholder='Nhập địa chỉ của bạn' {...field} className='' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex w-3/4 justify-center gap-2 items-start'>
          <FormField
            control={formSignUp.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-3/4 flex flex-col justify-center '>
                <FormLabel className='text-left'>Mật khẩu</FormLabel>
                <FormControl className=''>
                  <PasswordInput className='' placeholder='Nhập mật khẩu của bạn' {...field} />
                </FormControl>
                <FormMessage className='text-left' />
              </FormItem>
            )}
          />
          <FormField
            control={formSignUp.control}
            name='confirmpassword'
            render={({ field }) => (
              <FormItem className='w-3/4 flex flex-col  justify-center '>
                <FormLabel className='text-left'>Xác nhận mật khẩu</FormLabel>
                <FormControl className=''>
                  <PasswordInput className='' placeholder='Xác nhận mật khẩu ' {...field} />
                </FormControl>
                <FormMessage className='text-left' />
              </FormItem>
            )}
          />
        </div>

        {/* <Link to ="/otp-verified" className='w-full'> */}
        <Button type='submit' className='w-3/4' disabled={loading}>
          {loading && <Loading />}Đăng kí
        </Button>
        {/* </Link> */}
      </form>
    </Form>
  )
}

export default FormSignUp
