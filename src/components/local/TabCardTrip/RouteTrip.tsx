import React from 'react'
import Loader from './Loader'
const steps = [
  {
    stationID: 'a36d0f2d-e66f-4660-a4ed-0321023ac899',
    name: 'Hà Giang Scenic Overlook'
  },
  {
    stationID: '7a686ce0-a5ba-4d11-9abc-0e3db5580bba',
    name: 'Ninh Thuận Kê Gà Beach'
  },
  {
    stationID: '54607a1a-8f60-498d-8a18-392ed3a298e3',
    name: 'Yên Bái Tú Lệ Rice Terraces'
  },
  {
    stationID: '54607a1a-8f60-498d-8a18-392ed3a298e3',
    name: 'Yên Bái Tú Lệ Rice Terraces'
  },
  {
    stationID: '54607a1a-8f60-498d-8a18-392ed3a298e3',
    name: 'Yên Bái Tú Lệ Rice Terraces'
  }
]
interface Route {
    StationID: string;
    Name: string;
  }
interface RouteTabProps {
  tripRouteDetails: Route[]
  isLoading: boolean
  error: any
}
function RouteTrip({ tripRouteDetails, isLoading, error }: RouteTabProps) {
  return (
    <div>
    {isLoading ? (
      <Loader />
    ) : error ? (
      <p className='text-center font-semibold mt-8'>Đã xảy ra lỗi trong quá trình tải, vui lòng thử lại sau!</p>
    ) : tripRouteDetails && tripRouteDetails.length > 0 ? (
        <div className='ml-10 mt-8 text-base flex justify-center items-center '>
        <div>
          <ol className='relative border-l  border-orange-400 border-dashed '>
            {tripRouteDetails.map((item, index) => (
              <li key={index} className='mb-10 ml-6'>
                <span
                  className={
                    'flex absolute text-white -left-3 bg-primary justify-center items-center w-6 h-6  rounded-full ring-8 ring-white '
                  }
                >
                  {index + 1}
                </span>
                <h3 className={'flex items-center mb-1'}>{item.Name}</h3>
                {/* <p className='text-base font-normal text-gray-500'>{item.description}</p> */}
              </li>
            ))}
          </ol>
        </div>
      </div>
    ) : (
      <p className='text-center font-semibold mt-8'>Không có lộ trình cho chuyến xe này</p>
    )}
  </div>
   
  )
}

export default RouteTrip
