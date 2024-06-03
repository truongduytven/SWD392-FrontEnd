import { Input } from '@/components/global/atoms/input'
import { loginSchema } from '@/lib/schemas/Signin_Signup'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/global/atoms/form'
import { z } from 'zod'
import { PasswordInput } from '../atoms/password-input'
import { useEffect } from 'react'
import LogoIcon from '@/assets/LogoIcon.png';

type FormLoginProps = {
  reset: boolean
}
function FormLogin({ reset }: FormLoginProps) {
  const formLogin = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  useEffect(() => {
    console.log('login xóa')
    formLogin.reset()
  }, [reset])
  function onSubmitLogin(values: z.infer<typeof loginSchema>) {
    console.log(values)
  }
  return (
    <Form {...formLogin}>
      <form
        onSubmit={formLogin.handleSubmit(onSubmitLogin)}
        className='flex items-center px-10 justify-center gap-5 flex-col h-full text-center shadow-xl mr-20 '
      >
       <p className='font-medium text-2xl'>Đăng nhập</p>
        <p className='flex items-center text-muted-foreground'>để tiếp tục với <img src={LogoIcon} className='mx-1' width={20}/>The Bus Journey</p>

        <FormField
          control={formLogin.control}
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
          control={formLogin.control}
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
        <Button type='submit' className='w-2/3'>Đăng nhập</Button>
      </form>
    </Form>
  )
}

export default FormLogin
