// src/auth/AuthProvider.tsx
import axios from 'axios'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import busAPI from '@/lib/busAPI'
import { toast } from 'sonner'
import { useInvoice } from '@/contexts/InvoiceContext'
import { set } from 'lodash'
// Define the shape of our AuthContext
interface AuthContextType {
  token: string | null
  user: User | null
  login: (username: string, password: string) => Promise<void>
  loginWithGG: (AccessToken: string) => Promise<void>
  logout: () => void
  errorMessage: string | null
  loading: boolean
  loadingGG: boolean
}

// Define the shape of User
interface User {
  UserID: string
  UserName: string
  Password: string
  FullName: string
  Email: string
  Avatar: string
  Address: string
  OtpCode: string
  PhoneNumber: string
  Balance: number
  CreateDate: string
  IsVerified: boolean
  Status: string
  RoleID: string
  Result: any
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Define the AuthProvider component
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token')
  })
  const { resetInvoiceData } = useInvoice()
  const [user, setUser] = useState<User | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingGG, setLoadingGG] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await busAPI.get<User>('/auth-management/managed-auths/token-verification', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUser(response.data.Result.User)
        } catch (error) {
          localStorage.removeItem('token')
          localStorage.removeItem('token')
          console.error('Fetching user information failed:', error)
        }
      }
    }
    fetchUser()
  }, [token])

  // const login = async (username: string, password: string) => {
  //   try {
  //     const response = await busAPI.post('/auth/login', { email: username, password: password })
  //     console.log('red', response)
  //     const newToken = response.data.result.accessToken
  //     setToken(newToken)
  //     localStorage.setItem('token', newToken)
  //     // Redirect to home or another route after successful login
  //     navigate(-1)
  //   } catch (error) {
  //     console.error('Login failed:', error)
  //   }
  // }

  // const login = async (username: string, password: string) => {
  //   try {
  //     const response = await busAPI.post('/auth/login', { email: username, password: password })
  //     console.log('red', response)
  //     const newToken = response.data.result.accessToken
  //     setToken(newToken)
  //     localStorage.setItem('token', newToken)
  //     setErrorMessage(null)
  //     navigate(-1)
  //   } catch (error) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       const message = error.response.data.result.message
  //       setErrorMessage(message)
  //       toast.error(message)
  //     } else {
  //       console.error('Login failed:', error)
  //     }
  //   }
  // }
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await busAPI.post('/auth-management/managed-auths/sign-ins', {
        email: email,
        password: password
      })
      const newToken = response.data.AccessToken
      setToken(newToken)
      localStorage.setItem('token', newToken)
      setErrorMessage(null)
      toast.success('Đăng nhập thành công')
      navigate(-1)
      // Fetch user data after setting the token
      //  const fetchUser = async () => {
      //   try {
      //     const response = await busAPI.get<User>('/auth-management/managed-auths/token-verification', {
      //       headers: {
      //         Authorization: `Bearer ${newToken}`
      //       }
      //     });
      //     const userData = response.data.result.user;
      //     setUser(userData);

      //     if (userData.isVerified) {
      //       toast.success('Đăng nhập thành công')
      //       navigate(-1);
      //     } else {
      //       toast.error('Tài khoản chưa được xác thực, vui lòng xác thực')
      //       const response = await busAPI.post('user-management/managed-users/otp-code-sending', user?.email)
      //       navigate(`/otp-verified/${user?.email}`); // Navigate to the verification page
      //     }
      //   } catch (error) {
      //     console.error('Fetching user information failed:', error);
      //   }
      // };

      // fetchUser();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error)
        const message = error.response.data.message
        console.log('msajgjgaej', message)
        if (error.response.data.verified === false) {
          toast.error('Email đã đăng kí nhưng chưa xác thực. Vui lòng xác thực email!')
          navigate(`/otp-verified/${email}`)
          const response = await busAPI.post('user-management/managed-users/otp-code-sending', { email: email })
        } else {
          setLoading(false)
          toast.error('Email hoặc mật khẩu không đúng')
        }
        console.log('check verified', error.response.data.verified)
        setErrorMessage(message)
      } else {
        setLoading(false)
        toast.error('Đăng nhập lỗi. Vui lòng thử lại')
        console.error('Login failed:', error)
      }
    } finally {
      setLoading(false)
    }
  }
  const loginWithGG = async (accessToken: string) => {
    console.log('token ơ gg ', accessToken)
    setLoadingGG(true)
    try {
      setLoading(true)
      const response = await busAPI.post('/auth-management/managed-auths/access-token-verification', accessToken)
      const newToken = response.data.token
      setToken(newToken)
      localStorage.setItem('token', newToken)
      setErrorMessage(null)
      toast.success('Đăng nhập thành công')
      navigate(-1)
      setLoadingGG(false)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error)
        localStorage.removeItem('token')

        toast.error('Lỗi đăng nhập')
      setLoadingGG(false)

      }
    } finally {
      setLoadingGG(false)

    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    resetInvoiceData();
    toast.success('Đăng xuất tài khoản thành công')
    // Redirect to login page after logout
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ token, user,loadingGG, loginWithGG, login, logout, errorMessage, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
