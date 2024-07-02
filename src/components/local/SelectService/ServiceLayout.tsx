import { Card, CardContent, CardFooter } from "@/components/local/SelectService/cardService"
import { formatPrice } from "@/lib/utils"
import { Service } from "@/types/invoiceData"
import { IServiceModel } from "@/types/ticketInterface"
import { toast } from "sonner"

interface ServiceLayoutProps {
  keySearch: string
  props: IServiceModel[]
  selectedStation: string | null
  onAddService: (service: Service) => void
}

const ServiceLayout = ({ props, selectedStation, onAddService, keySearch }: ServiceLayoutProps) => {
  const handleCardclick = (service: IServiceModel) => {
    if(selectedStation) {
      const serviceFinal = {...service, station: selectedStation, quantity: 1}
      onAddService(serviceFinal)
      toast.success('Đã thêm dịch vụ thành công!')
    } else {
      toast.error('Vui lòng chọn trạm trước khi thêm dịch vụ.')
    }
  }
  return (
    <div className="w-full grid grid-cols-3 gap-5 p-2 overflow-y-auto max-h-[500px]">
      {Array.isArray(props) && props.filter(service => service.name.toLowerCase().includes(keySearch.toLowerCase())).map((service, index) => (
        <div className="w-full" key={index}>
          <Card onClick={() => handleCardclick(service)} className="cursor-pointer">
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
