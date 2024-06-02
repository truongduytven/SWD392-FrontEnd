// SeatLayout.tsx
import React, { useState } from 'react'
import Seat from './Seat'
import { useInvoice } from '@/contexts/InvoiceContext'
import { defaultSeats } from '@/constants/SeatData'
import { ticket } from '@/types/invoiceData'

const SeatLayout: React.FC = () => {
  const { invoiceData, updateTickets } = useInvoice()
  const [selectedSeats, setSelectedSeats] = useState<string[]>(invoiceData.tickets.map((ticket) => ticket.seatCode))

  const handleSeatClick = (seatCode: string) => {
    setSelectedSeats((prevSelected) => {
      let newSelected
      if (prevSelected.includes(seatCode)) {
        newSelected = prevSelected.filter((code) => code !== seatCode)
      } else {
        newSelected = [...prevSelected, seatCode]
      }
      const newTickets = newSelected.map((code) => {
        const seat = defaultSeats.find((seat) => seat.seatCode === code)!
        return { seatCode: seat.seatCode, price: seat.price, services: [] } as ticket
      })
      updateTickets(newTickets)
      return newSelected
    })
  }

  const upperDeckSeats = defaultSeats.filter((seat) => seat.seatCode.startsWith('A'))
  const lowerDeckSeats = defaultSeats.filter((seat) => seat.seatCode.startsWith('B'))

  return (
    <div className='flex items-center mt-2 space-x-10'>
      <div>
        <div>Tầng trên</div>
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
        <div>Tầng dưới</div>
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
