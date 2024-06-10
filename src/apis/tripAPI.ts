import { SearchData } from '@/contexts/SearchContext'
import busAPI from '@/lib/busAPI'
import { SearchSchema } from '@/lib/schemas/Search'
import { ITripSearchData, ITripSearchForm } from '@/types/tripInterface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { formatDate } from 'date-fns'
import { z } from 'zod'

export const useGetCitySearchForm = () => {
    return useQuery<ITripSearchForm>({
      queryKey: ["citySearchForm"],
      queryFn: async () => {
        const { data } = await busAPI.get<ITripSearchForm>("/city/from-cities-to-cities")
        return data
      }
    })
  }

export const useGetTripSearchForm = (searchData: SearchData) => {
  return useQuery<ITripSearchData>({
    queryKey: ["tripSearchForm", searchData],
    queryFn: async () => {
    const postData = {
      startLocaion: parseInt(searchData.startLocation),
      endLocaion: parseInt(searchData.endLocation),
      startDate: formatDate(searchData.startDate, 'yyyy-MM-dd')
    }
    const pageNumber = 1
    const totalPages = 10
    const { data } = await busAPI.get<ITripSearchData>(`/trip/list-trip-fromCity-toCity/${postData.startLocaion}/${postData.endLocaion}/${postData.startDate}/${pageNumber}/${totalPages}`)
    return data
    }
  })
}