import React from 'react'

function ModalDetail() {
  return (
    <div className='ribbondetail my-4 p-6 shadow-md rounded-md ring-1 ring-black ring-opacity-5 w-80'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-lg font-bold text-primary'>Phương Trang</h1>
        <div className='text-lg font-bold'>123456</div>
      </div>
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Khách hàng:</div>
          <div className='text-sm font-semibold'>Minh Thương</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Ngày:</div>
          <div className='text-sm font-semibold'>06-05-2024</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Thời gian:</div>
          <div className='text-sm font-semibold'>08:00 AM - 10:30 AM</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Từ:</div>
          <div className='text-sm font-semibold'>Bình Thuận</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Đến:</div>
          <div className='text-sm font-semibold'>Hồ Chí Minh</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Ghế:</div>
          <div className='text-sm font-semibold'>A34</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Giá:</div>
          <div className='text-sm font-semibold'>450.000đ</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Dịch vụ:</div>
          <div className='text-sm font-semibold'>230.000đ</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Tổng cộng:</div>
          <div className='text-sm font-semibold'>680.000đ</div>
        </div>
      </div>
      <hr className='my-3 border-t-2 border-orange-200' />
      <div className='text-sm'>
        <p className='font-semibold mb-1 text-primary'>Dịch vụ:</p>
        <ul className=''>
          <li className='flex justify-between items-center'>
            <span>Priority Boarding (x1)</span>
            <span className='font-medium'>100.000đ</span>
            <span>Bình Thuận</span>
          </li>
          <li className='flex justify-between items-center'>
            <span>In-Flight Meal (x1)</span>
            <span className='font-medium'>100.000đ</span>
            <span>Hồ Chí Minh</span>
          </li>
          <li className='flex justify-between items-center'>
            <span>WiFi Access (x1)</span>
            <span className='font-medium'>30.000đ</span>
            <span>Bình Thuận</span>
          </li>
        </ul>
      </div>
      <div className='flex flex-col justify-center items-center mt-4'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg'
          alt='QR Code'
          className='w-24 h-24'
        />
        <div className='text-lg font-bold'>123456</div>
      </div>
      <hr className='my-3 border-t-2 border-orange-200' />
      <div className='text-sm text-center'>
        <p>
          Cảm ơn quý khách đã tin tưởng <span className='font-bold ml-1'>The Bus Journey</span>
        </p>
      </div>
      {/* <div className="ribbondetail"> */}
      <span className='ribbondetail1'>
        <span>Сhưa sử dụng</span>
      </span>
    </div>

    //   </div>
  )
}

export default ModalDetail
