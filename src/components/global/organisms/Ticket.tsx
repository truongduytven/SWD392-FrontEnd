import { formatPrice } from "@/lib/utils"

interface Station {
  ServiceName: string
  Price: number,
  Quantity:number,
  StationName:string
}

interface Trip {
  UserName: string
  Route: string
  Company: string
  Date: string
  Time: string
  Position: string
}

export interface TicketProps {
  Price: {
    Price: number
    Services: Station[]
  }
  Trip: Trip
  TotalBill: number
  QrCodeImage: string
  QrCode: string
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
function Ticket({ Price, Trip, TotalBill, QrCode, QrCodeImage }: TicketProps) {
  return (
    <div className=' flex flex-col items-center justify-center text-sm '>
      <h1 className='text-3xl font-bold mb-4'>Tra cứu vé thành công</h1>

      <div className='flex bg-white shadow-lg rounded-lg border'>
        <div className='flex '>
          <div className='flex flex-col w-fit justify-start bg-cover border-r border-dashed border-gray-700 p-5 opacity-85'>
            <div className='flex flex-col gap-2 items-center'>
              <p className='text-lg font-semibold  mt-4'>
                Giá vé:
                <span className='text-xl font-bold text-orange-500 ml-1'>{formatPrice(Price.Price)}</span>
              </p>
              <p className='text-md font-semibold mt-10'>Giá dịch vụ:</p>
            </div>

            {Price.Services.map((service, index) => (
              <div className='flex justify-between text-md gap-2  max-w-full overflow-hidden' key={index}>
                <span className='text-gray-500 mt-6  whitespace-nowrap overflow-hidden text-ellipsis'>{`${service.ServiceName}`} <strong className="text-black">(x{service.Quantity})</strong></span>
                <span className='font-bold text-orange-500 mt-6  whitespace-nowrap overflow-hidden text-ellipsis'>{`${formatPrice(service.Price)}`}</span>
                <span className='italic font-semibold mt-6  whitespace-nowrap overflow-hidden text-ellipsis'>{service.StationName}</span>
              </div>
             

            ))}
          </div>
          <div className='flex flex-col gap-2 items-center p-7 justify-between  text-center space-y-2 min-w-72'>
            <p className='border-t text-lg border-b border-gray-400 py-2 font-bold text-orange-500'>THE BUS JOURNEY</p>
            <h3 className='text-lg font-medium'>{Trip.UserName}</h3>
            <h4 className='text-md'>
              Chặng đi: <span className='font-bold'>{Trip.Route}</span>
            </h4>
            <h4 className='text-md'>
              Nhà xe: <span className='font-bold'>{Trip.Company}</span>
            </h4>
            <p>
              Khởi hành:
              <span className='text-base font-bold ml-2'>{Trip.Time}</span>
            </p>
            <p>
              Ngày:
              <span className='text-base font-bold ml-2'>{Trip.Date}</span>
            </p>
            <p>
              Vị trí vé:
              <span className='text-base font-bold ml-2'>{Trip.Position}</span>
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
              <h1 className='text-lg font-bold'>{formatPrice(TotalBill)}</h1>
            </div>
            <div className='h-24'>
              <img src={QrCodeImage} alt='QR code' className='h-full' />
              <p className='text-center font-bold mt-2'>{QrCode}</p>
            </div>
            <p>Cảm ơn quý khách đã tin tưởng</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
