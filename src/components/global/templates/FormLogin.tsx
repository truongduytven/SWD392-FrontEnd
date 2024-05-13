import React, { useState } from 'react'
import { Input } from '@/components/global/atoms/input'
import { Button } from '../atoms/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema, signUpSchema } from '@/lib/schemas'
import './FormLogin.css'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/global/atoms/form'
import { PasswordInput } from '../atoms/password-input'

function FormLogin() {
  const formLogin = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
  function onSubmitLogin(values: z.infer<typeof loginSchema>) {
    console.log(values)
  }
  const formSignUp = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
      confirmpassword:""
    },
  })
  function onSubmitSignUp(values: z.infer<typeof signUpSchema>) {
    console.log(values)
  }
  const [addclass, setaddclass] = useState('')
  return (
    <div className='h-screen flex justify-center items-center  '>
      <div className={`container ${addclass}`} id='container'>
        <div className='form-container  sign-up-container'>
        <Form {...formSignUp}>
            <form
              onSubmit={formSignUp.handleSubmit(onSubmitSignUp)}
              className='flex items-center px-10 justify-center gap-5 flex-col h-full text-center shadow-xl mr-20 '
            >
              <h1 className='font-bold'>Đăng kí</h1>
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
              <Button type='submit'>Đăng kí</Button>
            </form>
          </Form>
         
        </div>
        <div className='form-container sign-in-container'>
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
        </div>
        <div className='overlay-container '>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <Button
                className='ghost bg-transparent hover:bg-transparent border-2 border-white'
                id='signIn'
                onClick={() => {setaddclass('')
                  formSignUp.reset()
                }}
              >
                GO TO LOGIN
              </Button>
            </div>
            <div className='overlay-panel overlay-right'>
              <Button
                className='ghost bg-transparent hover:bg-transparent border-2 border-white'
                id='signUp'
                onClick={() => {setaddclass('right-panel-active')
                  formLogin.reset()
                }}
              >
                GO TO REGISTER
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormLogin
