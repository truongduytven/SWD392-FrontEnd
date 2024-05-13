import { useState } from 'react'
import { Button } from '../atoms/button'
import FormLogin from "../organisms/FormLogin"
import FormSignUp from '../organisms/FormSignUp'
import { Link } from 'react-router-dom'
import './SignIn_SignUp.css'
function SignInSignUp() {
  
  const [addclass, setaddclass] = useState('')
  const [resetFormLogin, setResetFormLogin] = useState(false)
  const [resetFormSignUp, setResetSignUp] = useState(false)
  return (
    <div className='h-screen flex justify-center items-center  '>
      <div className={`container ${addclass}`} id='container'>
        <div className='form-container  sign-up-container'>
       
         <FormSignUp reset={resetFormSignUp}/>
        </div>
        <div className='form-container sign-in-container'>
          <FormLogin reset={resetFormLogin}/>
       
        </div>
        <div className='overlay-container '>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <Link to="/login">
              <Button
                className='ghost bg-transparent hover:bg-transparent border-2 border-white'
                id='signIn'
                onClick={() => {setaddclass('')
                setResetSignUp(prev=>!prev)
              }}
              >
                GO TO LOGIN
              </Button>
                </Link>
            </div>
            <div className='overlay-panel overlay-right'>
              <Link to="/register">
              <Button
                className='ghost bg-transparent hover:bg-transparent border-2 border-white'
                id='signUp'
                onClick={() => {setaddclass('right-panel-active')
                setResetFormLogin(prev=> !prev)
              }}
              >
                GO TO REGISTER
              </Button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInSignUp
