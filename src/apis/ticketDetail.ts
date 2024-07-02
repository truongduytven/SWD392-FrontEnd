import busAPI from '@/lib/busAPI';

interface ITicketDetail {
    BookingID: string;
    CustomerName: string;
    CompanyName: string;
    StartDate: string;
    StartTime: string;
    EndDate: string;
    EndTime: string;
    StartCity: string;
    EndCity: string;
    SeatCode: string;
    TicketPrice: number;
    TotalServicePrice: number;
    SumOfPrice: number;
    Status: string;
    QrCodeImage: string;
    QrCode: string;
    ServiceDetailList: {
      ServiceName: string;
      Quantity: number;
      ServicePrice: number;
      ServiceInStation: string;
    }[];
  }
export const fetchTicketDetail = async (ticketDetailID: string): Promise<ITicketDetail> => {
  const { data } = await busAPI.get<ITicketDetail>(`/ticket-detail-management/managed-ticket-details/${ticketDetailID}`);
  return data;
};