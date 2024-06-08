import busAPI from '@/lib/busAPI'
import { ITripSearchForm } from '@/types/tripInterface'
import { useQuery } from '@tanstack/react-query'

export const useGetCitySearchForm = () => {
    return useQuery<ITripSearchForm>({
      queryKey: ["tripSearchForm"],
      queryFn: async () => {
        const { data } = await busAPI.get<ITripSearchForm>("/city/from-cities-to-cities")
        return data
      }
    })
  }