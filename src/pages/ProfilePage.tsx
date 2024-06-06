import { Avatar, AvatarFallback, AvatarImage } from '@/components/global/atoms/avatar'
// import { RootState } from '@/store'
import { Button, Form, Input, Select } from 'antd'
import { Key } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
// import { useDispatch, useSelector } from 'react-redux'
import { RuleObject } from 'antd/lib/form'

import { Collapse } from 'antd'
function ProfilePage() {
  // const dispatch = useDispatch()
  // const profile = useSelector((state: RootState) => state.user.userDetails)
  // const loading = useSelector((state: RootState) => state.allUser.loading)
  const [hasChanges, setHasChanges] = useState(false)
  const [form] = Form.useForm()
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader()

    file.onload = function () {
      setPreview(file.result)
      setHasChanges(true)
    }

    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop
  })

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)

  const onSubmit = (values: any) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'avatar' || (key === 'avatar' && acceptedFiles.length === 0)) {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString())
        }
      }
    })

    if (acceptedFiles.length > 0) {
      formData.append('file', acceptedFiles[0])
    }
    console.log('hehe', formData)
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`)
    }
    // dispatch({
    // 	type: 'users/updateUser',
    // 	payload: {
    // 		userId: profile?.id,
    // 		userData: formData,
    // 	},
    // })
  }
  const handleFormSubmit = async (values: any) => {
    await onSubmit(values)
    setHasChanges(false)
  }

  const handleValuesChange = () => {
    setHasChanges(true)
  }

  const validateConfirmPassword = (_rule: RuleObject, value: any) => {
    const passFieldValue = form.getFieldValue('pass')
    if (passFieldValue &&!value) {
      return Promise.reject('Vui lòng xác nhận mật khẩu')
    }
    if (value !== passFieldValue) {
      return Promise.reject('Mật khẩu xác nhận không khớp')
    }
    return Promise.resolve()
  }
  const validatePassword = (_rule: RuleObject, value: any) => {
    const oldPassword = form.getFieldValue('passe')
    if (value && value === oldPassword) {
      return Promise.reject('Vui lòng nhập mật khẩu mới')
    }
    return Promise.resolve()
  }
  const [showPasswordFields, setShowPasswordFields] = useState(false)

  const handleTogglePasswordFields = () => {
    setShowPasswordFields((prevShowPasswordFields) => !prevShowPasswordFields)
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center  '>
        <Form
          form={form}
          variant='filled'
          onFinish={handleFormSubmit}
          onValuesChange={handleValuesChange}
          className='w-full max-w-3xl rounded-lg p-4 shadow-mini-content'
          layout='vertical'
          initialValues={{
            userName: 'Thuongminhlsr',
            email: 'admin@gmail.com',
            passe: 'abc',
            fullName:"Võ Thị Mỹ Tiên",
            avatar: 'anh ne',
            phone:"012345679",
            address:"Bình Thuận",
            // ...profile,
            // role: profile?.role ? profile?.role.roleName : undefined,
          }}
        >
          <div className='flex flex-col items-center justify-center '>
            <div className='shadow-3xl shadow-shadow-500 dark:!bg-navy-800 relative mx-auto w-full rounded-[20px] bg-white bg-clip-border p-4 dark:text-white dark:!shadow-none'>
              <div className='relative flex h-36 w-full justify-center rounded-xl bg-cover'>
                <img
                  alt='banner'
                  src='https://cdn.eva.vn/upload/4-2017/images/2017-12-20/1513760778-721-cover-1513760779-width1920height1113.jpg'
                  className='absolute flex h-36  w-full object-cover justify-center rounded-xl bg-cover'
                />
                <div
                  {...getRootProps()}
                  title='Change avatar'
                  className='dark:!border-navy-700  absolute -bottom-14 flex h-[87px] w-[87px] cursor-pointer items-center justify-center rounded-full border-[4px] hover:border-tertiary border-amber-400'
                >
                  <input {...getInputProps()} />
                  {!preview ? (
                    <Avatar className='h-full w-full' title='Change avatar'>
                      <AvatarImage
                        className='object-cover'
                        src='https://symbols.vn/wp-content/uploads/2022/02/Hinh-Canh-Cut-Cute-Chibi-dang-yeu.png'
                        alt='avatar'
                        sizes=''
                      />
                      <AvatarFallback>ThuongMinhLsr</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className='h-full w-full' title='Change image'>
                      <AvatarImage className='object-cover' src={preview as string} alt='avatar' />
                      <AvatarFallback>Thuongminhlsr</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
              <div className='mt-16 flex flex-col items-center'>
                <h4 className='text-navy-700 text-xl font-bold dark:text-white'>ThuongMinhLsr</h4>
                <p className='flex items-center gap-2 text-base font-normal text-gray-600'>
                  <Key size={16} /> Khách hàng
                </p>
              </div>

              <Form.Item
                name='userName'
                label={<span className='font-medium'>Tên người dùng</span>}
                rules={[{ required: true, message: 'Tên người dùng không được bỏ trống' }]}
              >
                <Input placeholder='Tên người dùng' />
              </Form.Item>
              <Form.Item
                name='fullName'
                label={<span className='font-medium'>Họ và tên</span>}
                rules={[{ required: true, message: 'Họ và tên không được bỏ trống' }]}
              >
                <Input placeholder='Họ và tên' />
              </Form.Item>
              <Form.Item
                name='address'
                label={<span className='font-medium'>Địa chỉ</span>}
                rules={[{ required: true, message: 'Địa chỉ không được bỏ trống' }]}
              >
                <Input placeholder='Địa chỉ' />
              </Form.Item>
              <Form.Item className='hidden' name='avatar' label='Avatar' />
              {/* <Form.Item className="hidden">
                <Input type="hidden" name="avatar" />
              </Form.Item> */}

              <Form.Item
                name='phone'
                label={<span className='font-medium'>Phone</span>}
                rules={[{ required: true, message: 'Số điện thoại không được bỏ trống' }]}
              >
                <Input placeholder='Số điện thoại' />
              </Form.Item>
              <Form.Item name='email' label={<span className='font-medium'>Email</span>} rules={[{ required: true }]}>
                <Input className='cursor-not-allowed' disabled />
              </Form.Item>
              <Form.Item
                name='passe'
                label={<span className='font-medium'>Mật khẩu</span>}
                rules={[{ required: true }]}
              >
                <Input className='cursor-not-allowed' disabled />
              </Form.Item>
              <Button type='link' className='mb-2 p-0 text-tertiary' onClick={handleTogglePasswordFields}>
                {showPasswordFields ? 'Ẩn đổi mật khẩu' : 'Đổi mật khẩu'}
              </Button>
              <Form.Item
                name='pass'
                label={<span className='font-medium'>Mật khẩu mới</span>}
                rules={[{ validator: validatePassword }]}
                hidden={!showPasswordFields}
              >
                <Input.Password placeholder='Nhập mật khẩu mới' />
              </Form.Item>

              <Form.Item
                name='confirm'
                label={<span className='font-medium'>Xác nhận mật khẩu</span>}
                rules={[{ validator: validateConfirmPassword }]}
                hidden={!showPasswordFields}
              >
                <Input.Password placeholder='Xác nhận mật khẩu' />
              </Form.Item>
              <Form.Item className='-mb-2 flex justify-center'>
                <Button
                  className='hover:text-primary hover:bg-black'
                  //  loading={loading}
                  type='dashed'
                  htmlType='submit'
                  disabled={!hasChanges}
                >
                  Update Profile
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
export default ProfilePage
