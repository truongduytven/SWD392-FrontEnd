import React from 'react'
import { Atom } from 'lucide-react';
import Loader from './Loader';
interface UtilityTabProps {
    tripUtilityDetails:[]
    isLoading: boolean
    error: any
  }
const utily = [
    {
      name: 'Wi-Fi miễn phí',
      status: 'ACTIVE',
      description: 'Xe cung cấp dịch vụ Wi-Fi miễn phí để hành khách có thể sử dụng internet trong suốt chuyến đi'
    },
    {
      name: 'Chăn',
      status: 'ACTIVE',
      description:
        'Xe cung cấp chăn để hành khách có thể giữ ấm trong suốt hành trình, đặc biệt là vào ban đêm hoặc khi điều hòa nhiệt độ lạnh.'
    },
    {
      name: 'Wi-Fi miễn phí',
      status: 'ACTIVE',
      description: 'Xe cung cấp dịch vụ Wi-Fi miễn phí để hành khách có thể sử dụng internet trong suốt chuyến đi'
    }
  ]
function UtilitiesTab({ tripUtilityDetails, isLoading, error }: UtilityTabProps) {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className='text-center font-semibold mt-8'>Đã xảy ra lỗi trong quá trình tải, vui lòng thử lại sau!</p>
      ) : tripUtilityDetails && tripUtilityDetails.length > 0 ? (
        <div className='space-y-4 px-10 py-4 rounded-md bg-muted'>
        {utily.map((ut, index) => (
          <div key={index} className='bg-white rounded-lg drop-shadow-md p-4'>
            <h2 className='font-semibold text-primary flex justify-start items-center gap-2'><Atom width={24}/>{ut.name}</h2>
            <p className='text-gray-700'>{ut.description}</p>
          </div>
        ))}
      </div>
      ) : (
        <p className='text-center font-semibold mt-8'>Không có tiện ích cho chuyến xe này</p>
      )}
    </div>
    
  )
}

export default UtilitiesTab