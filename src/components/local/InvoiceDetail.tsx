function InvoiceDetail() {
  return (
    <div className='shadow-lg border rounded-xl p-3'>
      <span className='font-bold text-xl'>Chi tiết hóa đơn</span>
      <div className='flex flex-col space-y-3 mt-3'>
        <div className='flex justify-between'>
          <span>Tuyến xe: </span>
          <span>Bx.Miền Tây - Bến Tre - Trà Vinh</span>
        </div>
        <div className='flex justify-between'>
          <span>Thời gian xuất bến: </span>
          <span>07:00 23/05/2023</span>
        </div>
        <div className='flex justify-between'>
          <span>Mã số ghế đã chọn: </span>
          <span>B01, B02, B03</span>
        </div>
        <hr />
        <div className='flex justify-between'>
          <span>Tiền vé: </span>
          <span>400.000đ</span>
        </div>
        <div className='flex justify-between'>
          <span>Tiền dịch vụ: </span>
          <span>0đ</span>
        </div>
        <hr />
        <div className='flex justify-between font-bold'>
          <span>Tổng tiền</span>
          <span>400.000đ</span>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetail
