import { Input } from '@/components/global/atoms/input'
import { loginSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/global/atoms/form'
import { z } from 'zod'
import { PasswordInput } from '../atoms/password-input'
import { useEffect } from 'react'
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
        <h1 className='font-bold'>Đăng nhập</h1>

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
              <FormLabel className='text-left'>Username</FormLabel>
              <FormControl className=''>
                <PasswordInput className='' placeholder='Nhập mật khẩu của bạn' {...field} />
              </FormControl>
              <FormMessage className='text-left' />
            </FormItem>
          )}
        />
        <Button type='submit'>Đăng nhập</Button>
      </form>
    </Form>
  )
}

export default FormLogin
