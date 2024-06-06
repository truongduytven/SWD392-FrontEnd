import { Card, CardContent, CardFooter } from "@/components/local/SelectService/cardService"
import { Service } from "@/constants/SeatData"
import { useInvoice } from "@/contexts/InvoiceContext"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"

interface ServiceLayoutProps {
  props: Service[]
  seatCode: string
  selectedStation: string | null
}

const ServiceLayout = ({ props, seatCode, selectedStation }: ServiceLayoutProps) => {
  const { addService } = useInvoice()
  const handleCardclick = (service: Service) => {
    if(selectedStation) {
      const serviceFinal = {...service, station: selectedStation, quantity: 1}
      addService(seatCode, serviceFinal)
      toast.success('Đã thêm dịch vụ thành công!')
    } else {
      
    }
  }
  return (
    <div className="w-full grid grid-cols-3 gap-5 p-2 overflow-y-auto max-h-[500px]">
      {Array.isArray(props) && props.map((service) => (
        <div className="w-full">
          <Card onClick={() => handleCardclick(service)} className="cursor-text">
            <CardContent>
              <img className="max-w-32 max-h-20 rounded-md" src={service.imageUrl} alt="ảnh thức ăn" />
            </CardContent>
            <CardFooter>
              <div className="flex w-full flex-col justify-center items-center">
                  <p className="text-lg font-semibold text-center">{service.name}</p>
                  <p className="text-sm text-gray-500">{formatPrice(service.price)}</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default ServiceLayout
