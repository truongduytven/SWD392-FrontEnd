import React, { useState } from 'react'
import { Input } from "@/components/global/atoms/input"

import './FormLogin.css'
function FormLogin() {
  const [addclass, setaddclass] = useState('')
  return (
    <div className='h-screen flex justify-center items-center  '>
      <div className={`container ${addclass}`} id='container'>
        <div className='form-container  sign-up-container'>
          <form className='bg-white flex items-center justify-center flex-col px-10 h-full text-center shadow-lg'>
            <h1>Create Account</h1>
            <Input type='text' placeholder='NAME' />
            <Input type='email' placeholder='EMAIL' />
            <Input type='password' placeholder='PASSWORD' />
            <Input type='password' placeholder='CONFIRM PASSWORD' />
            <button type='submit'>REGISTER</button>
          </form>
        </div>
        <div className='form-container sign-in-container'>
          <form className='bg-white flex items-center justify-center flex-col px-10 h-full text-center shadow-lg'>
            <h1>Login</h1>
            <Input type='email' placeholder='EMAIL' />
            <Input type='password' placeholder='PASSWORD' />
            <button type='submit'>LOGIN</button>
          </form>
        </div>
        <div className='overlay-container '>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <button className='ghost' id='signIn' onClick={() => setaddclass('')}>
                GO TO LOGIN
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <button className='ghost' id='signUp' onClick={() => setaddclass('right-panel-active')}>
                GO TO REGISTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormLogin
