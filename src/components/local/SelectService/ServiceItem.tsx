import { formatPrice } from '@/lib/utils'
import { Service } from '@/types/invoiceData'
import QuantityInput from '@/components/local/SelectService/quantityInput'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/global/atoms/alert-dialog'
import { useState } from 'react'

interface ServiceItemProps {
  service: Service
  seatCode: string
  onUpdateService: (service: Service) => void
  onDeleteService: (serviceId: string, selectedStation: string) => void
}

function ServiceItem({ service, onDeleteService, onUpdateService }: ServiceItemProps) {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  const handleQuantityUpdate = (newQuantity: number) => {
    if (newQuantity <= 0) {
      setIsAlertDialogOpen(true)
    } else {
      onUpdateService({ ...service, quantity: newQuantity })
    }
  }

  const handleDeleteService = () => {
    onDeleteService(service.ServiceID, service.station)
    toast.success(`Xoá ${service.Name} thành công`)
  }
  return (
    <div className='border flex rounded-md items-center pl-1'>
      <div
        style={{
          backgroundImage: `url(${service.ImageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
        className='relative h-16 w-28 overflow-hidden rounded-md'
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className='absolute w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 hover:backdrop-blur-sm '>
              <Trash2 color='white'/>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
              <AlertDialogDescription>Bạn có chắc chắn rằng muốn xóa {service.Name} không ?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteService}>Xác Nhận</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className='w-full relative flex flex-col text-sm p-2'>
        <span>{service.Name}</span>
        <span>{formatPrice(service.Price)}</span>
        <QuantityInput initialValue={service.quantity} onUpdate={handleQuantityUpdate} />
      </div>
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>Bạn có chắc chắn rằng muốn xóa {service.Name} không?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteService()
                setIsAlertDialogOpen(false)
              }}
            >
              Xác Nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ServiceItem
