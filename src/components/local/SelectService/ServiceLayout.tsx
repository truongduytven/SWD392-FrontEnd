import { Card, CardContent } from "@/components/global/atoms/card"
import { Service } from "@/constants/SeatData"

const ServiceLayout = ({ props }: { props: Service[] }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-5">
      {Array.isArray(props) && props.map((service) => (
        <div className="w-full">
          <Card>
            <CardContent>
              <img className="" src={service.imageUrl} alt="ảnh thức ăn" />
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default ServiceLayout
