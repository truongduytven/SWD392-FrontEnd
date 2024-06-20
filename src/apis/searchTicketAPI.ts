import busAPI from '@/lib/busAPI';
import { useQuery } from '@tanstack/react-query';
import { ISearchTicket } from '@/types/searchTicket';
import { useAuth } from '@/auth/AuthProvider';

interface SearchTicketForm {
  email: string;
  qrCode: string;
}

export const useSearchTicket = ({ email, qrCode }: SearchTicketForm) => {
  return useQuery<ISearchTicket, Error>({
    queryKey: ['searchTicket', email, qrCode], // Provide queryKey as an array
    queryFn: async () => {
      const { data } = await busAPI.get<ISearchTicket>(`/ticket-detail-management/managed-ticket-details/qrCodes/${qrCode}/emails/${email}`);
      return data;
    },
    enabled: false,
  });
};


