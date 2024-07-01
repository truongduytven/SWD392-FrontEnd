import busAPI from "@/lib/busAPI";
import { ITicketData } from "@/types/ticketInterface";
import { useQuery } from "@tanstack/react-query";

interface getTripData {
    tripID: string;
}

export const useGetTripData = ({ tripID }: getTripData) => {
    return useQuery<ITicketData>({
      queryKey: ['TicketData', tripID], // Provide queryKey as an array
      queryFn: async () => {
        const { data } = await busAPI.get<ITicketData>(`/trip-management/managed-trips/${tripID}/booked-seats`);
        console.log(data)
        return data;
      },
      enabled: !!tripID, // Enable the query only when tripID is available
    });
  };
