import React from 'react'

function Ticket() {
  return (
    <div className=' mx-auto overflow-hidden flex justify-center items-center'>
      <div className='flex bg-white w-fit p-5 mx-2 my-4'>
        <div className='relative flex flex-col  justify-center items-center p-2 pr-4  border-r-2 border-dashed  border-gray-300'>
          <h2 className='text-center text-gray-900'>Giờ xuất bến</h2>
          <p className='text-center  text-gray-700'>9:00</p>
          <p className='text-center  text-gray-700'>Ngày: 23-03-2024</p>
          <span className='absolute -top-4 right-0 transform translate-x-1/2 -translate-y-1/2 bg-muted rounded-full p-4'></span>
          <span className='absolute -bottom-4 right-0 transform translate-x-1/2 translate-y-1/2 bg-muted rounded-full p-4'></span>
        </div>
        <div className='flex flex-col justify-center items-center  ml-3'>
          <div className='flex justify-between items-center'>
            <div className='flex  '>
              <div className='flex gap-3 justify-center items-center'>
                <div className=' h-full flex justify-between items-center'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='74' viewBox='0 0 14 74'>
                    <path
                      fill='none'
                      stroke='#484848'
                      stroke-linecap='round'
                      stroke-width='2'
                      stroke-dasharray='0 7'
                      d='M7 13.5v46'
                    ></path>
                    <g fill='none' stroke='#DC2910' stroke-width='3'>
                      <circle cx='7' cy='7' r='7' stroke='none'></circle>
                      <circle cx='7' cy='7' r='5.5'></circle>
                    </g>
                    <path
                      d='M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z'
                      fill='#188B05'
                    ></path>
                  </svg>
                </div>

                <div className='flex flex-col items-start justify-between gap-1'>
                  <p className='m-0 p-0'>
                    <span className='font-bold mr-2 text-lg'>6:00</span>• Tp Hồ Chí Minh
                  </p>
                  <p className='text-muted-foreground'>2 giờ</p>
                  <p>
                    <span className='font-bold mr-2 text-lg'>8:30</span>• Bến Tre
                  </p>
                </div>
              </div>
            </div>

            <div className='flex flex-col items-end justify-between gap-1'>
              <p>Số ghế: B01</p>
              <p>Giá vé: 400.000đ</p>
              <p>Giá dịch vụ: 230.000đ</p>
            </div>
          </div>
          {/* <button className='bg-gray-600 text-white float-right py-2 px-4 rounded'>Tickets</button> */}

        </div>
      </div>
    </div>
  )
}

export default Ticket
