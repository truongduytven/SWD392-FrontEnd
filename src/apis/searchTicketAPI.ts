import busAPI from '@/lib/busAPI'
import { useQuery } from '@tanstack/react-query'
import {ISearchTicket  } from '@/types/searchTicket'

interface SearchTicketForm {
    email: string;
    qrCode: string;
  }

  
  export const useSearchTicket = ({ email, qrCode }: SearchTicketForm) => {
    return useQuery<ISearchTicket>({
      queryKey: ['searchTicket', email, qrCode], // Provide queryKey as an array
      queryFn: async () => {
        const { data } = await busAPI.get<ISearchTicket>(`/ticketDetail/ticket-detail-by-QRCode/${qrCode}/${email}`);
        return data;
      },
      enabled: false,
    });
  };