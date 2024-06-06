import { useEffect, useState } from 'react'
import { Button } from '../atoms/button'
import FormLogin from '../organisms/FormLogin'
import FormSignUp from '../organisms/FormSignUp'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './SignIn_SignUp.css'
function SignInSignUp() {
  const [addclass, setaddclass] = useState('')
  const [resetFormLogin, setResetFormLogin] = useState(false)
  const [resetFormSignUp, setResetSignUp] = useState(false)
  const [showSignupText, setShowSignupText] = useState(true)
  const [showSigninText, setShowSigninText] = useState(false)

  // useEffect(() => {
  //   setShowWelcomeText(true)
  // }, [])

  return (
    <div className='h-screen  flex justify-center items-center  '>
      <div className='absolute top-10 left-10 hover:font-bold hover:underline hover:text-primary'>
        <Link to='/' className='flex space-x-2'>
          <ArrowLeft className='scale-75' />
          Về trang chủ
        </Link>
      </div>
      <div className={`container ${addclass}`} id='container'>
        <div className='form-container  sign-up-container'>
          <FormSignUp reset={resetFormSignUp} />
        </div>
        <div className='form-container sign-in-container'>
          <FormLogin reset={resetFormLogin} />
        </div>
        <div className='overlay-container  '>
          <div className='overlay group relative'>
            <div className='overlay-panel overlay-left '>
              <Link to='/login' className='flex justify-center items-center flex-col gap-16'>
              {showSigninText && (
                <p className=' slide-up-text tracking-wide text-primary text-3xl text-center font-bold'>
                  Bạn đã có tài khoản của <span className=' font-bold mr-1'>The Bus Journey</span>?
                </p>
              )}
                <Button
                  className='px-8 py-2 rounded-md hover:bg-primary hover:text-white font-bold transition duration-200 bg-amber-50 text-primary border-2 hover:border-transparent border-primary'
                  id='signIn'
                  onClick={() => {
                    setaddclass('')
                    setResetSignUp((prev) => !prev)
                    setShowSignupText(true)
                    setShowSigninText(false)
                  }}
                >
                  Đăng nhập
                </Button>
              </Link>
            </div>
            <div className='overlay-panel overlay-right'>
            {showSignupText && (
                <p className=' slide-up-text text-3xl text-center font-bold tracking-wide'>
                  Bạn chưa có tài khoản của <span className='text-primary mr-1 '>The Bus Journey</span>?
                </p>
              )}
              <Link to='/register'>
                <Button
                  className='slide-up-text px-8 mt-16 py-2 rounded-md hover:bg-primary hover:text-white font-bold transition bg-amber-50 text-primary border-2 hover:border-transparent border-primary'
                  id='signUp'
                  onClick={() => {
                    setaddclass('right-panel-active')
                    setResetFormLogin((prev) => !prev)
                    setShowSignupText(false)
                    setShowSigninText(true)
                  }}
                >
                  Đăng kí
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
