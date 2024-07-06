
const CardTripSkeleton = () => (
    
  <div className='w-full animate-pulse mb-3 '>
    <div className='flex bg-white h-48  p-3 gap-3 border border-gray-200 rounded-md'>
      <div className='w-1/5 min-w-48 relative overflow-hidden bg-gray-200 rounded-sm'>
        <div className='w-full h-full rounded-sm'></div>
      </div>
      <div className='w-full flex flex-col gap-1'>
        <div className='text-lg font-bold flex gap-10 justify-between'>
          <div className='h-6 bg-gray-200 rounded w-3/4'></div>
          <div className='h-6 bg-gray-200 rounded w-1/3'></div>
        </div>
        <div className='flex item-center justify-start '>
          <div className='h-6 bg-gray-200 mr-40 rounded w-3/4'></div>
        </div>

        <div className='flex justify-between items-end  mt-10'>
          <div className='flex gap-3 justify-center items-center w-full'>
            <div className='flex flex-col items-start justify-between gap-1 w-full'>
              <div className='text-muted-foreground text-sm h-5 bg-gray-200 rounded w-1/2'></div>
              <div className='h-5 bg-gray-200 rounded w-2/3'></div>
            </div>
          </div>
          <div className='w-1/3 bg-gray-200'></div>
          <div className='flex flex-col justify-end items-center gap-3'>
            <div className='h-6 bg-gray-200 rounded w-1/2 px-10'></div>
            <div className='px-10 py-3 bg-gray-200 w-1/3'></div>
          </div>
        </div>
      </div>
    </div>

    <div className='bg-white rounded-md h-fit'></div>
  </div>
)

export default CardTripSkeleton
