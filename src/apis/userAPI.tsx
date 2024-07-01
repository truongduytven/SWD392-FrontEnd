import axios from 'axios';
import busAPI from '@/lib/busAPI';
import { useQuery } from '@tanstack/react-query';

interface IUserDetail {
  userID: string,
  userName: string,
  password: string,
  fullName: string,
  email: string,
  avatar: string,
  address: string,
  otpCode: string,
  phoneNumber: string,
  balance: number,
  createDate: string,
  isVerified: boolean,
  status: string,
  roleID: string
}
// export const fetchUserDetail = async (userId: string): Promise<IUserDetail> => {
//   const { data } = await busAPI.get<IUserDetail>(`/user-management/managed-users/${userId}/details`);
//   return data;
// };
export const fetchUserDetail = (userId: string) => {
    return useQuery({
      queryKey: ['userDetail', userId],
      queryFn: async () => {
        const { data } = await busAPI.get<IUserDetail>(`/user-management/managed-users/${userId}/details`);
        return data;
      }
    });
  };
  export const updateUserProfile = async (formData: any) => {
    try {
      const response = await busAPI.put(`/user-management/managed-users/${formData.userID}`, formData); // Adjust the API endpoint and method as per your backend API
      return response.data; // Assuming the API returns updated user data
    } catch (error) {
      console.log(error)
      throw new Error('Error updating user profile'); // Handle errors appropriately in your application
    }
  };