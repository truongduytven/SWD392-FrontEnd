import React, { useState } from 'react'
import './FormLogin.css'
function FormLogin() {
  const [addclass, setaddclass] = useState('')
  return (
    <div className=''>

    <div className={`container ${addclass}`} id='container'>
      <div className='form-container sign-up-container'>
        <form>
          <h1>Create Account</h1>
          <input type='text' placeholder='NAME' />
          <input type='email' placeholder='EMAIL' />
          <input type='password' placeholder='PASSWORD' autoComplete='on' />
          <button type='submit'>REGISTER</button>
        </form>
      </div>
      <div className='form-container sign-in-container'>
        <form>
          <h1>Login</h1>
          <input type='email' placeholder='EMAIL' className='w-full' />
          <input type='password' placeholder='PASSWORD' autoComplete='on' />
          <button type='submit'>LOGIN</button>
        </form>
      </div>
      <div className='overlay-container'>
        <div className='overlay'>
          <div className='overlay-panel overlay-left'>
            {addclass &&<button className='ghost' id='signIn' onClick={() => setaddclass('')}>
              GO TO LOGIN
            </button>}
            
          </div>
          <div className='overlay-panel overlay-right'>
            {!addclass && <button className='ghost' id='signUp' onClick={() => setaddclass('right-panel-active')}>
              GO TO REGISTER
            </button>}
            
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default FormLogin
