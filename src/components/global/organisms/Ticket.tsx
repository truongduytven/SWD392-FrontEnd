
function Ticket() {
  return (
    <div className='flex flex-col items-center justify-center text-sm '>
            <h1 className="text-3xl font-bold mb-4">Tra cứu vé thành công</h1>

      <div className='flex bg-white shadow-lg rounded-lg border'>
        <div className='flex '>
          <div className='flex flex-col justify-between bg-cover border-r border-dashed border-gray-700 p-5 opacity-85'>
            <div className='flex flex-col gap-2 items-center'>
              <p className='text-lg font-semibold'>
                Giá vé: 
                <span className='text-xl font-bold text-orange-500 ml-1'>170.000đ</span>
              </p>
              <p className='text-md font-semibold'>Giá dịch vụ:</p>
            </div>
            <div className='flex justify-between text-md gap-2'>
              <span className='text-gray-500'>Dịch vụ 1:</span>
              <span className='font-bold text-orange-500'>20.000đ</span>
              <span className='italic font-semibold'>Trạm A</span>
            </div>
            <div className='flex justify-between text-md gap-2'>
              <span className='text-gray-500'>Dịch vụ 2:</span>
              <span className='font-bold text-orange-500'>30.000đ</span>
              <span className='italic font-semibold'>Trạm B</span>
            </div>
            <div className='flex justify-between text-md gap-2'>
              <span className='text-gray-500'>Dịch vụ 3:</span>
              <span className='font-bold text-orange-500'>30.000đ</span>
              <span className='italic font-semibold'>Trạm C</span>
            </div>
          </div>
          <div className='flex flex-col gap-2 items-center p-7 justify-between  text-center space-y-2'>
            <p className='border-t text-lg border-b border-gray-400 py-2 font-bold text-orange-500'>THE BUS JOURNEY</p>
            <h3 className='text-lg font-medium'>Nguyễn Ngọc Quân</h3>
            <h4 className='text-md'>
              Chặng đi: <span className='font-bold'>Hà Nội - Bến Tre</span>
            </h4>
            <p>
              Khởi hành:
              <span className='text-base font-bold ml-2'>15:30</span>
            </p>
            <p>
              Ngày:
              <span className='text-base font-bold ml-2'>24/07/2023</span>
            </p>
            <p>
              Vị trí vé:
              <span className='text-base font-bold ml-2'>A15</span>
            </p>
          </div>
        </div>
        <div className='w-64 border-l border-dashed border-gray-700 relative'>
          <p className='absolute ml-20 lg:ml-7  w-full text-orange-600 h-full flex items-end justify-center gap-6 transform rotate-90'>
            <span>The bus journey</span>
            <span>The bus journey</span>
          </p>
          <div className='flex flex-col items-center justify-around h-full bg-yellow-400 py-4 rounded-tr-md rounded-br-md'>
            <div>
              <h1 className='text-lg'>Tổng hóa đơn</h1>
            </div>
            <div>
              <h1 className='text-lg font-bold'>650.000đ</h1>
            </div>
            <div className='h-24'>
              <img
                src='https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb'
                alt='QR code'
                className='h-full'
              />
            </div>
            <p>Cảm ơn quý khách đã tin tưởng</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
