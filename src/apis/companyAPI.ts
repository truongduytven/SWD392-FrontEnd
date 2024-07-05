import { SearchData } from '@/contexts/SearchContext'
import busAPI from '@/lib/busAPI'
import { ICompany  } from '@/types/companyInterface'
import { useQuery } from '@tanstack/react-query'

export const useGetCompanies = () => {
    return useQuery<ICompany[]>({
      queryKey: ["getCompanies"],
      queryFn: async () => {
        const { data } = await busAPI.get<ICompany[]>("/company-management/managed-companies")
        return data
      }
    })
  }


