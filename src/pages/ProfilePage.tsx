import { Avatar, AvatarFallback, AvatarImage } from '@/components/global/atoms/avatar';
import { Button, Form, Input, ConfigProvider } from 'antd';
import { Key, PiggyBank } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { RuleObject } from 'antd/lib/form';
import { formatPrice } from '@/lib/utils';
import { useAuth } from '@/auth/AuthProvider';
import { fetchUserDetail, updateUserProfile } from '@/apis/userAPI';
import Loader from '@/components/local/TabCardTrip/Loader';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
function ProfilePage() {
  const { user } = useAuth();
  const { data, isLoading, isError, refetch } = fetchUserDetail(user?.userID || "");

  const [hasChanges, setHasChanges] = useState(false);
  const [form] = Form.useForm();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const queryClient = useQueryClient();
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const droppedFile = acceptedFiles[0];
    setFile(droppedFile);
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setHasChanges(true);
    };

    if (droppedFile) {
      reader.readAsDataURL(droppedFile); // Read as URL if needed for preview
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const fetchAvatarAndConvertToBase64 = async (avatarUrl: string) => {
    try {
      const response = await fetch(avatarUrl);
      console.log("loi",response)
      if (!response.ok) {
        throw new Error('Failed to fetch avatar image');
      }
  
      const blob = await response.blob();
      const reader = new FileReader();
  
      return new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const base64data = reader.result as string;
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching avatar image:', error);
      throw error; // Rethrow the error to handle it elsewhere
    }
  };
  const onSubmit =async (values: any) => {
  //   const formData = { ...values };
  //   delete formData.email;
  //   delete formData.avatar
  //   if (base64Image) {
  //     formData.Avatar = base64Image;
  //   } else{
  //     formData.Avatar =""
  //   }
  //  console.log( form.getFieldValue("Address"))
  //   const payload = {
  //     UserName: form.getFieldValue("UserName") || data?.userName,
  //     FullName: form.getFieldValue("FullName") || data?.fullName,
  //     Address: form.getFieldValue("Address") || data?.address,
  //     PhoneNumber: form.getFieldValue("PhoneNumber") || data?.phoneNumber,
  //     Avatar: base64Image || "",
  //     Password:form.getFieldValue("Password") ,
  //     NewPassword:form.getFieldValue("NewPassword"),
  //     ConfirmPassword:form.getFieldValue("ConfirmPassword")
  //   };
  //   console.log("payd", payload)
  //     console.log('UserName from form:', form.getFieldValue('UserName'));
  //   console.log('Form Data:', formData);

  //   for (const key in formData) {
  //     if (formData.hasOwnProperty(key)) {
  //       console.log(`${key}: ${formData[key]}`);
  //     }
  //   }
  console.log("hskhjh",values.UserName )
  const formData = new FormData();
  // Append fields to FormData
  formData.append("UserName", values.UserName || data?.userName);
  formData.append("FullName", values.FullName || data?.fullName);
  formData.append("Address", values.Address || data?.address);
  formData.append("PhoneNumber", values.PhoneNumber || data?.phoneNumber);
  formData.append("Password", values.Password);
  formData.append("NewPassword", values.NewPassword);
  formData.append("ConfirmPassword", values.ConfirmPassword);
  
  // Append avatar if base64Image exists
  if (file) {
    formData.append("Avatar", file);
  } else {
    formData.append("Avatar", ""); // Set Avatar as empty string if base64Image is not available
  }
   
    try {
      const response = await updateUserProfile(user?.userID || "", formData); // Call your update function here
      console.log('Profile updated successfully:', response);
      // const response = await axios.put(`https://65a5598f52f07a8b4a3eeb7a.mockapi.io/product/User/2`, payload);
      console.log('Profile updated successfully:', response.data);
      setHasChanges(false);
      // queryClient.invalidateQueries('userDetail'); // Invalidate cache to reflect updated data
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error
    }

    // Dispatch update action here
  };

  const handleFormSubmit = async (values: any) => {
    
    await onSubmit(values);
    setHasChanges(false);
  };

  const handleValuesChange = () => {
    setHasChanges(true);
  };

  const validateConfirmPassword = (_rule: RuleObject, value: any) => {
    const passFieldValue = form.getFieldValue('NewPassword');
    if (passFieldValue && !value) {
      return Promise.reject('Vui lòng xác nhận mật khẩu');
    }
    if (value !== passFieldValue) {
      return Promise.reject('Mật khẩu xác nhận không khớp');
    }
    return Promise.resolve();
  };

  // const validatePassword = (_rule: RuleObject, value: any) => {
  //   const oldPassword = form.getFieldValue('password');
  //   if (value && value === oldPassword) {
  //     return Promise.reject('Vui lòng nhập mật khẩu mới');
  //   }
  //   return Promise.resolve();
  // };

  const handleTogglePasswordFields = () => {
    setShowPasswordFields((prevShowPasswordFields) => !prevShowPasswordFields);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <p>Đã xảy ra lỗi tải thông tin người dùng. Vui lòng thử lại sau!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex mt-4 flex-col items-center justify-center">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#F97316'
            },
            components: {
              Button: {
                colorTextLightSolid: '#000000'
              }
            }
          }}
        >
          <Form
            form={form}
            variant="filled"
            onFinish={handleFormSubmit}
            onValuesChange={handleValuesChange}
            className="w-full max-w-3xl rounded-lg p-4 shadow-mini-content"
            layout="vertical"
            initialValues={{
              UserName: data?.userName,
              email: data?.email,
              Password:"",
              FullName: data?.fullName,
              Avatar: data?.avatar,
              PhoneNumber: data?.phoneNumber,
              Address: data?.address,
              NewPassword: "",
              ConfirmPassword: ""
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-800 relative mx-auto w-full rounded-[20px] drop-shadow-md bg-white bg-clip-border p-4 dark:text-white dark:!shadow-none">
                <div className="relative flex h-36 w-full justify-center rounded-xl bg-cover">
                  <img
                    alt="banner"
                    src="https://cdn.eva.vn/upload/4-2017/images/2017-12-20/1513760778-721-cover-1513760779-width1920height1113.jpg"
                    className="absolute flex h-36  w-full object-cover justify-center rounded-xl bg-cover"
                  />
                  <div
                    {...getRootProps()}
                    title="Change avatar"
                    className="dark:!border-navy-700 absolute -bottom-14 flex h-[87px] w-[87px] cursor-pointer items-center justify-center rounded-full border-[4px] hover:border-tertiary border-amber-400"
                  >
                    <input {...getInputProps()} />
                    {!preview ? (
                      <Avatar className="h-full w-full" title="Change avatar">
                        <AvatarImage
                          className="object-cover"
                          src={user?.avatar}
                          alt="avatar"
                        />
                        <AvatarFallback>{user?.userName}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="h-full w-full" title="Change image">
                        <AvatarImage className="object-cover" src={preview as string} alt={user?.fullName} />
                        <AvatarFallback>{user?.userName}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
                <div className="mt-16 flex flex-col items-center">
                  <h4 className="text-navy-700 text-xl font-bold dark:text-white">{user?.userName}</h4>
                  <p className="flex items-center gap-2 text-base font-normal text-gray-600">
                    <Key size={16} /> Khách hàng
                  </p>
                  <p className="flex items-center gap-2 text-lg text-primary font-medium text-gray-600">
                    <PiggyBank size={24} /> <span>{formatPrice(user?.balance || 0)}</span>
                  </p>
                </div>

                <Form.Item
                  name="UserName"
                  label={<span className="font-medium">Tên người dùng</span>}
                  rules={[{ required: true, message: 'Tên người dùng không được bỏ trống' }]}
                >
                  <Input placeholder="Tên người dùng" />
                </Form.Item>
                <Form.Item
                  name="FullName"
                  label={<span className="font-medium">Họ và tên</span>}
                  rules={[{ required: true, message: 'Họ và tên không được bỏ trống' }]}
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>
                <Form.Item
                  name="Address"
                  label={<span className="font-medium">Địa chỉ</span>}
                >
                  <Input placeholder="Địa chỉ" />
                </Form.Item>
                <Form.Item className='hidden' name="avatar" label="Avatar" />

                <Form.Item
                  name="PhoneNumber"
                  label={<span className="font-medium">PhoneNumber</span>}
                  rules={[{ required: true, message: 'Số điện thoại không được bỏ trống' }]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item name="email" label={<span className="font-medium">Email</span>} rules={[{ required: true }]}>
                  <Input className="cursor-not-allowed" disabled />
                </Form.Item>
                
                <Button type="link" className="mb-2 p-0 text-tertiary" onClick={handleTogglePasswordFields}>
                  {showPasswordFields ? 'Ẩn đổi mật khẩu' : 'Đổi mật khẩu'}
                </Button>
                <Form.Item
                  name="Password"
                  label={<span className="font-medium">Mật khẩu cũ</span>}
                  hidden={!showPasswordFields}
                >
                  <Input.Password placeholder="Nhập mật khẩu cũ" />
                </Form.Item>
                <Form.Item
                  name="NewPassword"
                  label={<span className="font-medium">Mật khẩu mới</span>}
                  hidden={!showPasswordFields}
                >
                  <Input.Password placeholder="Nhập mật khẩu mới" />
                </Form.Item>

                <Form.Item
                  name="ConfirmPassword"
                  label={<span className="font-medium">Xác nhận mật khẩu</span>}
                  rules={[{ validator: validateConfirmPassword }]}
                  hidden={!showPasswordFields}
                >
                  <Input.Password placeholder="Xác nhận mật khẩu" />
                </Form.Item>
                <Form.Item className="mb-2 flex justify-center">
                  <Button
                    type="dashed"
                    htmlType="submit"
                    disabled={!hasChanges}
                  >
                    Update Profile
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}

export default ProfilePage;
