import { formatPrice } from "@/lib/utils"
import { Service } from "@/types/invoiceData"
import QuantityInput from "@/components/local/SelectService/quantityInput"
import { useInvoice } from "@/contexts/InvoiceContext"

interface ServiceItemProps {
    service: Service
    seatCode: string
}

function ServiceItem({ service, seatCode }: ServiceItemProps) {
    const { updateService } = useInvoice()

    const handleQuantityUpdate = (newQuantity: number) => {
        updateService( seatCode, service.id, {...service, quantity: newQuantity})
    }
  return (
    <div className='border flex rounded-md items-center'>
      <img className='max-h-14 max-w-20 rounded-md' src={service.imageUrl} alt='ảnh dịch vụ' />
      <div className='w-full flex flex-col text-sm p-2'>
        <span>{service.name}</span>
        <span>{formatPrice(service.price)}</span>
        <QuantityInput initialValue={service.quantity} onUpdate={handleQuantityUpdate} />
      </div>
    </div>
  )
}

export default ServiceItem
