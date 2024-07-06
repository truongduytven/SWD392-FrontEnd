import busAPI from '@/lib/busAPI'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/auth/AuthProvider'
import { useParams } from 'react-router-dom'
import { error } from 'console'

interface TicketData {
  BookingID: string
  UserID: string
  TripID: string
  TicketDetailID: string
  CompanyName: string
  StartDate: string
  StartTime: string
  EndDate: string
  EndTime: string
  TotalTime: string
  StartCity: string
  EndCity: string
  SeatCode: string
  TicketPrice: number
  TotalServicePrice: number
  Status: string
  IsRated: boolean
}

export const userAllTickets = () => {
  const userId = useParams()
  console.log('id ne', userId)
  return useQuery<TicketData[], Error>({
    queryKey: ['allTickets'],
    queryFn: async () => {
      const { data } = await busAPI.get<TicketData[]>(
        `/ticket-detail-management/managed-ticket-details/customers/${userId.id}`
      )
      return data
    }
  })
}

export const useCancelTicket = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (ticketDetailID: string) => {
      const res = await busAPI.put(`/ticket-detail-management/managed-ticket-details/cancel-tickets/${ticketDetailID}`)
      return res.data.Message
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['allTickets'] })
    }
  })
}
