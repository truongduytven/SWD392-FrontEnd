import { SearchData } from '@/contexts/SearchContext'
import busAPI from '@/lib/busAPI'
import { IPopularTrip, ITripSearchData, ITripSearchForm } from '@/types/tripInterface'
import { useQuery } from '@tanstack/react-query'
import { format, formatDate } from 'date-fns'

export const useGetCitySearchForm = () => {
    return useQuery<ITripSearchForm>({
      queryKey: ["citySearchForm"],
      queryFn: async () => {
        const { data } = await busAPI.get<ITripSearchForm>("/route-management/managed-routes")
        return data
      }
    })
  }

// export const useGetTripSearchForm = (searchData: SearchData,filterState: { sortOption: string, sortCompany: string[], seatAvailability: string[]}) => {
//   return useQuery<ITripSearchData>({
//     queryKey: ["tripSearchForm", searchData],
//     queryFn: async () => {
//     const postData = {
//       startLocation: searchData.startLocation,
//       endLocation: searchData.endLocation,
//       startDate: formatDate(searchData.startDate, 'yyyy-MM-dd'),
//       sortOption: filterState.sortOption,
//       sortCompany: filterState.sortCompany,
//       seatAvailability: filterState.seatAvailability
//     }
//     const pageNumber = 1
//     const totalPages = 10
//     // const { data } = await busAPI.get<ITripSearchData>(`/trip-management/managed-trips/from-city/${postData.startLocaion}/to-city/${postData.endLocaion}/start-time/${postData.startDate}/page-number/${pageNumber}/page-size/${totalPages}`, {
//     //   params: {
//     //     sortOption: postData.sortOption,
//     //     sortCompany: postData.sortCompany,
//     //     seatAvailability: postData.seatAvailability
//     //   }})
//       // Construct the URL manually with query parameters
//       const url = `/trip-management/managed-trips/from-city/${postData.startLocation}/to-city/${postData.endLocation}/start-time/${postData.startDate}/page-number/${pageNumber}/page-size/${totalPages}`
//       const queryParams = {
//         sortOption: postData.sortOption,
//         sortCompany: postData.sortCompany,
//         seatAvailability: postData.seatAvailability
//       }

//       // Convert arrays to repeated query parameters for sortCompany
//       const queryString = Object.entries(queryParams)
//         .map(([key, value]) => {
//           if (Array.isArray(value)) {
//             return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&')
//           } else {
//             return `${key}=${encodeURIComponent(value)}`
//           }
//         })
//         .join('&')

//       // Append the query string to the URL
//       const finalUrl = queryString ? `${url}?${queryString}` : url

//       const { data } = await busAPI.get<ITripSearchData>(finalUrl)
//     return data
//     }
//   })
// }
export const useGetTripSearchForm = (
  searchData: SearchData,
  filterState: { sortOption: string; sortCompany: string[]; seatAvailability: string[] },
  page: number
) => {
  return useQuery<ITripSearchData>({
    queryKey: ['tripSearchForm', searchData, filterState, page],
    queryFn: async () => {
      const postData = {
        startLocation: searchData.startLocation,
        endLocation: searchData.endLocation,
        startDate: format(searchData.startDate, 'yyyy-MM-dd'),
        sortOption: filterState.sortOption,
        sortCompany: filterState.sortCompany,
        seatAvailability: filterState.seatAvailability,
      };
      const pageSize = 5; // Adjust page size as needed
      const url = `/trip-management/managed-trips/from-city/${postData.startLocation}/to-city/${postData.endLocation}/start-time/${postData.startDate}/page-number/${page}/page-size/${pageSize}`;
      const queryParams = {
        sortOption: postData.sortOption,
        sortCompany: postData.sortCompany,
        seatAvailability: postData.seatAvailability,
      };

      const queryString = Object.entries(queryParams)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((v) => `${key}=${encodeURIComponent(v)}`).join('&');
          } else {
            return `${key}=${encodeURIComponent(value)}`;
          }
        })
        .join('&');

      const finalUrl = queryString ? `${url}?${queryString}` : url;

      const { data } = await busAPI.get<ITripSearchData>(finalUrl);
      return data;
    },
  });
};

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