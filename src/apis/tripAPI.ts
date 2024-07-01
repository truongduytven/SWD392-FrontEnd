import { SearchData } from '@/contexts/SearchContext'
import busAPI from '@/lib/busAPI'
import { IPopularTrip, ITripSearchData, ITripSearchForm } from '@/types/tripInterface'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from 'date-fns'

export const useGetCitySearchForm = () => {
    return useQuery<ITripSearchForm>({
      queryKey: ["citySearchForm"],
      queryFn: async () => {
        const { data } = await busAPI.get<ITripSearchForm>("/route-management/managed-routes")
        return data
      }
    })
  }

export const useGetTripSearchForm = (searchData: SearchData) => {
  return useQuery<ITripSearchData>({
    queryKey: ["tripSearchForm", searchData],
    queryFn: async () => {
    const postData = {
      startLocaion: searchData.startLocation,
      endLocaion: searchData.endLocation,
      startDate: formatDate(searchData.startDate, 'yyyy-MM-dd')
    }
    const pageNumber = 1
    const totalPages = 10
    const { data } = await busAPI.get<ITripSearchData>(`/trip-management/managed-trips/from-city/${postData.startLocaion}/to-city/${postData.endLocaion}/start-time/${postData.startDate}/page-number/${pageNumber}/page-size/${totalPages}`)
    return data
    }
  })
}

export const useGetTripPictureDetails = (tripId: string) => {
  return useQuery({
    queryKey: ['tripPictureDetails', tripId],
    queryFn: async () => {
      const { data } = await busAPI.get(`/trip/trip-picture-detail/${tripId}`);
      return data;
    }
  });
};

export const useGetPopularTrip = () => {
  return useQuery<IPopularTrip[]>({
    queryKey: ['popularTrip'],
    queryFn: async () => {
      const { data } = await busAPI.get<IPopularTrip[]>(`/trip-management/manage-trips/populars`);
      return data;
    }
  });
}