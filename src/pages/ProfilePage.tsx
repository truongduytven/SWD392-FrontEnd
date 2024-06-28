import { Avatar, AvatarFallback, AvatarImage } from '@/components/global/atoms/avatar';
import { Button, Form, Input, ConfigProvider } from 'antd';
import { Key, PiggyBank } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { RuleObject } from 'antd/lib/form';
import { formatPrice } from '@/lib/utils';
import { useAuth } from '@/auth/AuthProvider';
import { fetchUserDetail } from '@/apis/userAPI';
import Loader from '@/components/local/TabCardTrip/Loader';
import axios from 'axios';

function ProfilePage() {
  const { user } = useAuth();
  const { data, isLoading, isError } = fetchUserDetail(user?.userID || "");
  console.log("tui ne", data);

  const [hasChanges, setHasChanges] = useState(false);
  const [form] = Form.useForm();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `https://ticket-booking-swd392-project.azurewebsites.net/ticket-detail-management/managed-ticket-details/customers/f2ddaf1e-cf45-4bfb-b537-ace42f5b6707`
        );
        console.log("hiuhd",response)
      } catch (err) {
      } finally {
      }
    };

    fetchTickets();
  }, []);
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setBase64Image(reader.result as string);
      setHasChanges(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const onSubmit = (values: any) => {
    const formData = { ...values };

    if (base64Image) {
      formData.avatar = base64Image;
    }

    console.log('Form Data:', formData);

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        console.log(`${key}: ${formData[key]}`);
      }
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
    const passFieldValue = form.getFieldValue('newPassword');
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
              userName: data?.userName,
              email: data?.email,
              passe: data?.password,
              fullName: data?.fullName,
              avatar: data?.avatar,
              phone: data?.phoneNumber,
              address: data?.address,
              newPassword: "",
              confirmPassword: ""
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
                  name="userName"
                  label={<span className="font-medium">Tên người dùng</span>}
                  rules={[{ required: true, message: 'Tên người dùng không được bỏ trống' }]}
                >
                  <Input placeholder="Tên người dùng" />
                </Form.Item>
                <Form.Item
                  name="fullName"
                  label={<span className="font-medium">Họ và tên</span>}
                  rules={[{ required: true, message: 'Họ và tên không được bỏ trống' }]}
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>
                <Form.Item
                  name="address"
                  label={<span className="font-medium">Địa chỉ</span>}
                >
                  <Input placeholder="Địa chỉ" />
                </Form.Item>
                <Form.Item className="hidden" name="avatar" label="Avatar" />

                <Form.Item
                  name="phone"
                  label={<span className="font-medium">Phone</span>}
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
                  name="password"
                  label={<span className="font-medium">Mật khẩu cũ</span>}
                  hidden={!showPasswordFields}
                >
                  <Input.Password placeholder="Nhập mật khẩu cũ" />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  label={<span className="font-medium">Mật khẩu mới</span>}
                  hidden={!showPasswordFields}
                >
                  <Input.Password placeholder="Nhập mật khẩu mới" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
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
