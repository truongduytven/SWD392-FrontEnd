import busAPI from '@/lib/busAPI';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/auth/AuthProvider';
import { useParams } from 'react-router-dom';
import { error } from 'console';

interface TicketData {
    bookingID: string;
    userID:string;
    tripID:string;
    ticketDetailID: string;
    companyName: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    totalTime: string;
    startCity: string;
    endCity: string;
    seatCode: string;
    ticketPrice: number;
    totalServicePrice: number;
    status: string;
  }

  export const userAllTickets = () => {
    
const userId = useParams()
console.log("id ne", userId)
    return useQuery<TicketData[], Error>({
      queryKey: ['allTickets'],
      queryFn: async () => {
        const { data } = await busAPI.get<TicketData[]>(`/ticket-detail-management/managed-ticket-details/customers/${userId.id}`);
        return data;
      }
    });
  };