import React from 'react'

function Ticket() {
  return (
    <div className=' max-w-screen-xl mx-auto overflow-hidden'>
      <div className='flex flex-wrap bg-white p-5 mx-2 my-4'>
        <div className='relative flex flex-col justify-center items-center w-1/4 p-4 border-r-2 border-dashed  border-gray-300'>
          <h2 className='text-6xl text-center text-gray-900'>23</h2>
          <p className='text-center text-xl text-gray-700'>Feb</p>
          <span className='absolute -top-4 right-0 transform translate-x-1/2 -translate-y-1/2 bg-muted rounded-full p-4'></span>
          <span className='absolute -bottom-4 right-0 transform translate-x-1/2 translate-y-1/2 bg-muted rounded-full p-4'></span>
        </div>
        <div className=' w-3/4 p-4'>
          <p className='text-xl text-gray-700'>Music Event</p>
          <h2 className='text-3xl text-gray-900 mb-3'>Live In Sydney</h2>
          <div className='flex items-center mb-3'>
            <div className='text-xl text-gray-600 mr-3'>
              <i className='fa fa-table'></i>
            </div>
            <p className='text-gray-500'>
              Monday 15th 2016 <br /> 15:20 PM & 11:00 AM
            </p>
          </div>
          <div className='flex items-center mb-3'>
            <div className='text-xl text-gray-600 mr-3'>
              <i className='fa fa-map-marker'></i>
            </div>
            <p className='text-gray-500'>
              North, South, United State, Amre <br /> Party Number 16, 20
            </p>
          </div>
          <button className='bg-gray-600 text-white py-2 px-4 rounded'>Tickets</button>
        </div>
      </div>
    </div>
  )
}

export default Ticket
