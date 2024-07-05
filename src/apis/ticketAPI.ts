import busAPI from "@/lib/busAPI";
import { IService, IStations, ITicketData } from "@/types/ticketInterface";
import { useQuery } from "@tanstack/react-query";

interface getTripData {
    tripID: string;
}

interface getStationData {
    routeID: string;
    companyID: string;
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
      retry: 2,
    });
  };

export const useStationData = ({ routeID, companyID }: getStationData) => {
    return useQuery<IStations[]>({
      queryKey: ['StationData'], // Provide queryKey as an array
      queryFn: async () => {
        const { data } = await busAPI.get<IStations[]>(`/station-management/managed-stations/routes/${routeID}/companyID/${companyID}`);
        return data;
      },
      enabled: !!routeID,
    });
  }

export const useGetServiceWithStation = (stationId: string | null) => {
    return useQuery<IService[]>({
      queryKey: ['ServiceData', stationId], // Provide queryKey as an array
      queryFn: async () => {
        const { data } = await busAPI.get<IService[]>(`/service-management/managed-services/stations/${stationId}`);
        console.log(data)
        return data;
      },
      enabled: !!stationId,
    });
}
