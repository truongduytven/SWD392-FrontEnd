// SeatLayout.tsx
import React, { useState } from 'react'
import Seat from './Seat'
import { useInvoice } from '@/contexts/InvoiceContext'
import { defaultSeats } from '@/constants/SeatData'
import { ticket } from '@/types/invoiceData'
import { toast } from 'sonner'

const SeatLayout: React.FC = () => {
  const { invoiceData, updateTickets } = useInvoice()
  const [selectedSeats, setSelectedSeats] = useState<string[]>(invoiceData.tickets.map((ticket) => ticket.seatCode))

  const handleSeatClick = (seatCode: string) => {
    if (selectedSeats.includes(seatCode)) {
      let newSelected = selectedSeats.filter((code) => code !== seatCode)
      const newTickets = newSelected.map((code) => {
        const seat = defaultSeats.find((seat) => seat.seatCode === code)!
        const seatService = invoiceData.tickets.find((ticket) => ticket.seatCode === code)!
        return { seatCode: seat.seatCode, price: seat.price, services: (seatService ? seatService.services : []) } as ticket
      })
      updateTickets(newTickets)
      setSelectedSeats(newSelected)
    } else if (selectedSeats.length === 5) {
      toast.warning('Chỉ được chọn tối đa 5 ghế')
      return
    } else {
      let newSelected = [...selectedSeats, seatCode]
      const newTickets = newSelected.map((code) => {
        const seat = defaultSeats.find((seat) => seat.seatCode === code)!
        const seatService = invoiceData.tickets.find((ticket) => ticket.seatCode === code)!
        return { seatCode: seat.seatCode, price: seat.price, services: (seatService ? seatService.services : []) } as ticket
      })
      updateTickets(newTickets)
      setSelectedSeats(newSelected)
    }
  }

  const upperDeckSeats = defaultSeats.filter((seat) => seat.seatCode.startsWith('A'))
  const lowerDeckSeats = defaultSeats.filter((seat) => seat.seatCode.startsWith('B'))

  return (
    <div className='flex items-center mt-2 space-x-10'>
      <div>
        <div className='text-lg font-semibold'>Tầng trên</div>
        <div className='grid grid-cols-2 gap-4 p-4'>
          {upperDeckSeats.map((seat) => (
            <Seat
              key={seat.seatCode}
              seat={seat}
              onClick={handleSeatClick}
              selected={selectedSeats.includes(seat.seatCode)}
            />
          ))}
        </div>
      </div>
      <div>
        <div className='text-lg font-semibold'>Tầng dưới</div>
        <div className='grid grid-cols-2 gap-4 p-4'>
          {lowerDeckSeats.map((seat) => (
            <Seat
              key={seat.seatCode}
              seat={seat}
              onClick={handleSeatClick}
              selected={selectedSeats.includes(seat.seatCode)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SeatLayout
