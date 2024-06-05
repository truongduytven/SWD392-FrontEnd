import { Button } from '@/components/global/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/local/SelectService/dialogService'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/local/SelectService/tabsService'
import ServiceLayout from '@/components/local/SelectService/ServiceLayout'
import ServiceAction from '@/components/local/SelectService/ServiceAction'
import { ticket } from '@/types/invoiceData'
import { HandPlatter } from 'lucide-react'
import { ServiceData } from '@/constants/SeatData'
import { useState } from 'react'
import { formatPrice } from '@/lib/utils'
function TicketService({ services, seatCode }: ticket) {
  const [isServiceSelected, setIsServiceSelected] = useState(false)
  const [selectedStation, setSelectedStation] = useState<string | null>(null)
  const handleClickSelectService = (station: string) => {
    setIsServiceSelected(true)
    setSelectedStation(station)
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className='w-full flex justify-end p-2'>
            <Button onClick={() => setIsServiceSelected(false)} className='hover:scale-105'>
              Chọn dịch vụ
              <HandPlatter className='ml-1' />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className='sm:max-w-screen-lg flex justify-between space-x-4'>
          <div className='w-7/12'>
            <DialogHeader>
              <DialogTitle className='flex justify-between items-center mb-6'>
                Chọn dịch vụ
                <span className='text-xs text-red-500'>* Vui lòng chọn trạm trước khi lựa chọn dịch vụ</span>
              </DialogTitle>
            </DialogHeader>
            <ServiceAction onStationSelect={handleClickSelectService} />
            {isServiceSelected && (
              <Tabs defaultValue='food' className='w-full mt-4'>
                <TabsList>
                  <TabsTrigger value='food'>Thức ăn</TabsTrigger>
                  <TabsTrigger value='drink'>Đồ uống</TabsTrigger>
                  <TabsTrigger value='other'>Khác</TabsTrigger>
                </TabsList>
                <TabsContent value='food'>
                  <ServiceLayout props={ServiceData} seatCode={seatCode} selectedStation={selectedStation}/>
                </TabsContent>
                <TabsContent value='drink'>
                  <ServiceLayout props={ServiceData} seatCode={seatCode} selectedStation={selectedStation}/>
                </TabsContent>
                <TabsContent value='other'>
                  <ServiceLayout props={ServiceData} seatCode={seatCode} selectedStation={selectedStation}/>
                </TabsContent>
              </Tabs>
            )}
          </div>
          <div className='w-5/12 flex flex-col border-l-2 p-2'>
            <div className='h-full'>
              <DialogHeader>
                <DialogTitle className='flex justify-between items-center mb-6'>Đã chọn</DialogTitle>
              </DialogHeader>
              <div className='flex flex-col space-y-2 my-2 p-2 overflow-y-auto max-h-[500px]'>
                {services &&
                  services.map((service) => (
                    <div className='border flex rounded-md items-center'>
                      <img className='max-h-14 max-w-20 rounded-md' src={service.imageUrl} alt='ảnh dịch vụ' />
                      <div className='w-full flex flex-col text-sm p-2'>
                        <span>{service.name}</span>
                        <span>Trạm {service.station}</span>
                        <span className='text-right'>Giá: {formatPrice(service.price)}</span>
                        <span className='text-right'>Số lượng: {service.quantity}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TicketService
