import axios from 'axios';
import busAPI from '@/lib/busAPI';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

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
  roleID: string,
  roleName:string
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
        console.log("tui ne", data)
        return data;
      }
    });
  };
  export const updateUserProfile = async (userId:string,formData: any) => {
    console.log("tuiiiiii", userId)
    console.log("vo day")
    try {
      const response = await busAPI.put(`/user-management/managed-users/${userId}`, formData); // Adjust the API endpoint and method as per your backend API
      console.log("res của update", response)
      return response.data; // Assuming the API returns updated user data
    } catch (error) {
      console.log(error)
      console.log("loi ne ma", error)
      throw new Error('Error updating user profile'); // Handle errors appropriately in your application
    }
  };