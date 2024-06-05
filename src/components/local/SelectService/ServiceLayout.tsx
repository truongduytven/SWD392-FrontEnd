import { Card, CardContent, CardFooter } from "@/components/local/SelectService/cardService"
import { Service } from "@/constants/SeatData"
import { formatPrice } from "@/lib/utils"

const ServiceLayout = ({ props }: { props: Service[] }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-5 p-2 overflow-y-auto max-h-[500px]">
      {Array.isArray(props) && props.map((service) => (
        <div className="w-full">
          <Card>
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
