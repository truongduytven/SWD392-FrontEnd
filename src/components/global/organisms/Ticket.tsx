interface Station {
  serviceName: string
  price: number
}

interface Trip {
  userName: string
  route: string
  company: string
  date: string
  time: string
  position: string
}

export interface TicketProps {
  price: {
    price: number
    services: Station[]
  }
  trip: Trip
  totalBill: number
  qrCodeImage: string
  qrCode: string
}
const data = [
  {
    price: {
      price: 9000,
      services: [
        {
          serviceName: 'Mì tôn',
          price: 9000
        },
        {
          serviceName: 'Mì trộn',
          price: 195000
        }
      ]
    },
    trip: {
      userName: 'Staff',
      route: 'Hòa Bình - Thừa Thiên Huế',
      company: 'My Thuong',
      date: '2024-08-15',
      time: '20:00',
      position: 'A02'
    },
    totalBill: 54000,
    qrCodeImage:
      'https://firebasestorage.googleapis.com/v0/b/cloudfunction-yt-2b3df.appspot.com/o/TICKETBOOKING%2FQR%2Fc7b9e6cc-69aa-4fb3-a694-9c2ca765d149?alt=media&token=f6e58350-0f4d-4aee-aa7b-ab94de9d5d77',
    qrCode: '12055878'
  }
]
function Ticket({ price, trip, totalBill, qrCode, qrCodeImage }: TicketProps) {
  return (
    <div className='flex flex-col items-center justify-center text-sm '>
      <h1 className='text-3xl font-bold mb-4'>Tra cứu vé thành công</h1>

      <div className='flex bg-white shadow-lg rounded-lg border'>
        <div className='flex '>
          <div className='flex flex-col w-fit justify-start bg-cover border-r border-dashed border-gray-700 p-5 opacity-85'>
            <div className='flex flex-col gap-2 items-center'>
              <p className='text-lg font-semibold  mt-4'>
                Giá vé:
                <span className='text-xl font-bold text-orange-500 ml-1'>{price.price}</span>
              </p>
              <p className='text-md font-semibold mt-10'>Giá dịch vụ:</p>
            </div>

            {price.services.map((service, index) => (
              <div className='flex justify-between text-md gap-2' key={index}>
                <span className='text-gray-500 mt-6 whitespace-nowrap'>{`${service.serviceName}`}</span>
                <span className='font-bold text-orange-500 mt-6 whitespace-nowrap'>{`${service.price}`}</span>
                <span className='italic font-semibold mt-6  whitespace-nowrap'>{`Trạm${index + 1}`}</span>
              </div>
             

            ))}
          </div>
          <div className='flex flex-col gap-2 items-center p-7 justify-between  text-center space-y-2'>
            <p className='border-t text-lg border-b border-gray-400 py-2 font-bold text-orange-500'>THE BUS JOURNEY</p>
            <h3 className='text-lg font-medium'>{trip.userName}</h3>
            <h4 className='text-md'>
              Chặng đi: <span className='font-bold'>{trip.route}</span>
            </h4>
            <h4 className='text-md'>
              Nhà xe: <span className='font-bold'>{trip.company}</span>
            </h4>
            <p>
              Khởi hành:
              <span className='text-base font-bold ml-2'>{trip.time}</span>
            </p>
            <p>
              Ngày:
              <span className='text-base font-bold ml-2'>{trip.date}</span>
            </p>
            <p>
              Vị trí vé:
              <span className='text-base font-bold ml-2'>{trip.position}</span>
            </p>
          </div>
        </div>
        <div className='w-64 border-l border-dashed border-gray-700 relative'>
          {/* <p className='absolute ml-20 lg:ml-7  w-full text-orange-600 h-full flex items-end justify-center gap-6 transform rotate-90'>
            <span>The bus journey</span>
            <span>The bus journey</span>
          </p> */}
          <div className='flex flex-col items-center justify-around h-full bg-yellow-400 py-4 rounded-tr-md rounded-br-md'>
            <div>
              <h1 className='text-lg'>Tổng hóa đơn</h1>
            </div>
            <div>
              <h1 className='text-lg font-bold'>{totalBill}</h1>
            </div>
            <div className='h-24'>
              <img src={qrCodeImage} alt='QR code' className='h-full' />
              <p className='text-center font-bold mt-2'>{qrCode}</p>
            </div>
            <p>Cảm ơn quý khách đã tin tưởng</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
