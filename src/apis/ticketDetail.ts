import busAPI from '@/lib/busAPI';

interface ITicketDetail {
    bookingID: string;
    customerName: string;
    companyName: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    startCity: string;
    endCity: string;
    seatCode: string;
    ticketPrice: number;
    totalServicePrice: number;
    sumOfPrice: number;
    status: string;
    qrCodeImage: string;
    qrCode: string;
    serviceDetailList: {
      serviceName: string;
      quantity: number;
      servicePrice: number;
      serviceInStation: string;
    }[];
  }
export const fetchTicketDetail = async (ticketDetailID: string): Promise<ITicketDetail> => {
  const { data } = await busAPI.get<ITicketDetail>(`/ticket-detail-management/managed-ticket-details/${ticketDetailID}`);
  return data;
};