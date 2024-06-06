import { formatPrice } from '@/lib/utils'
import { Service } from '@/types/invoiceData'
import QuantityInput from '@/components/local/SelectService/quantityInput'
import { useInvoice } from '@/contexts/InvoiceContext'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/global/atoms/alert-dialog'

interface ServiceItemProps {
  service: Service
  seatCode: string
}

function ServiceItem({ service, seatCode }: ServiceItemProps) {
  const { updateService, deleteService } = useInvoice()

  const handleQuantityUpdate = (newQuantity: number) => {
    updateService(seatCode, service.id, { ...service, quantity: newQuantity })
  }

  const handleDeleteService = () => {
    deleteService(seatCode, service.id)
    toast.success(`Xoá ${service.name} thành công`)
  }
  return (
    <div className='border flex rounded-md items-center pl-1'>
      <div
        style={{
          backgroundImage: `url(https://cafebiz.cafebizcdn.vn/162123310254002176/2023/9/12/mi-tom-9-3416-1694501408503-1694501408589217157289.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
        className='relative h-16 w-28 overflow-hidden rounded-md'
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className='absolute w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-gray-400 hover:bg-opacity-70'>
              <Trash2 />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn rằng muốn xóa {service.name} không ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteService}>Xác Nhận</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className='w-full relative flex flex-col text-sm p-2'>
        <span>{service.name}</span>
        <span>{formatPrice(service.price)}</span>
        <QuantityInput initialValue={service.quantity} onUpdate={handleQuantityUpdate} />
      </div>
    </div>
  )
}

export default ServiceItem
