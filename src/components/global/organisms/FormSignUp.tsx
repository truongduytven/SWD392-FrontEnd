import { Input } from '@/components/global/atoms/input'
import { signUpSchema } from '@/lib/schemas/Signin_Signup'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/global/atoms/form'
import { z } from 'zod'
import { PasswordInput } from '../atoms/password-input'
import { useEffect } from 'react'
import LogoIcon from '@/assets/LogoIcon.png';

type FormSignUpProps = {
  reset: boolean
}
function FormSignUp({ reset }: FormSignUpProps) {
  const formSignUp = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
    }
  })
  useEffect(() => {
    console.log('sign up xóa')
    formSignUp.reset()
  }, [reset])
  function onSubmitSignUp(values: z.infer<typeof signUpSchema>) {
    console.log(values)
  }
  return (
    <Form {...formSignUp}>
      <form
        onSubmit={formSignUp.handleSubmit(onSubmitSignUp)}
        className='flex items-center px-10 justify-center gap-5 flex-col h-full text-center shadow-xl mr-20 '
      >
        <p className='font-medium text-2xl'>Tạo tài khoản</p>
        <p className='flex items-center text-muted-foreground'>để tiếp tục với <img src={LogoIcon} className='mx-1' width={20}/>The Bus Journey</p>
        <FormField
          control={formSignUp.control}
          name='name'
          render={({ field }) => (
            <FormItem className='w-2/3 flex flex-col justify-center items-start'>
              <FormLabel>Họ và Tên</FormLabel>
              <FormControl className=''>
                <Input placeholder='Nhập họ tên của bạn' {...field} className='' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formSignUp.control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-2/3 flex flex-col justify-center items-start'>
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
          name='password'
          render={({ field }) => (
            <FormItem className='w-2/3 flex flex-col justify-center '>
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
            <FormItem className='w-2/3 flex flex-col justify-center '>
              <FormLabel className='text-left'>Xác nhận mật khẩu</FormLabel>
              <FormControl className=''>
                <PasswordInput className='' placeholder='Nhập mật khẩu của bạn' {...field} />
              </FormControl>
              <FormMessage className='text-left' />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-2/3'>Đăng kí</Button>
      </form>
    </Form>
  )
}

export default FormSignUp
