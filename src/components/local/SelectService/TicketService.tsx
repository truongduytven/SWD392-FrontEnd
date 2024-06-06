import { Button } from '@/components/global/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/local/SelectService/dialogService'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/local/SelectService/tabsService'
import ServiceLayout from '@/components/local/SelectService/ServiceLayout'
import ServiceAction from '@/components/local/SelectService/ServiceAction'
import { ticket } from '@/types/invoiceData'
import { HandPlatter } from 'lucide-react'
import { ServiceData, stationData } from '@/constants/SeatData'
import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/local/SelectService/accordionService'
import ServiceItem from './ServiceItem'
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
          <div className='w-full flex justify-end p-3'>
            <Button onClick={() => setIsServiceSelected(false)} className='hover:scale-105 transform scale-100 transition duration-200'>
              {services.length > 0 ? 'Chi tiết dịch vụ' : 'Chọn dịch vụ'}
              <HandPlatter className='ml-1' />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className='sm:max-w-screen-lg flex justify-between space-x-4'>
          <div className='w-3/5'>
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
                  <ServiceLayout props={ServiceData} seatCode={seatCode} selectedStation={selectedStation} />
                </TabsContent>
                <TabsContent value='drink'>
                  <ServiceLayout props={ServiceData} seatCode={seatCode} selectedStation={selectedStation} />
                </TabsContent>
                <TabsContent value='other'>
                  <ServiceLayout props={ServiceData} seatCode={seatCode} selectedStation={selectedStation} />
                </TabsContent>
              </Tabs>
            )}
          </div>
          <div className='w-4/12 flex flex-col border-l-2 p-2'>
            <div className='h-full'>
              <DialogHeader>
                <DialogTitle className='flex justify-between items-center mb-6'>Đã chọn</DialogTitle>
              </DialogHeader>
              <div className='flex flex-col space-y-2 my-2 p-2 overflow-y-auto max-h-[500px]'>
                <Accordion type='single' collapsible className='w-full'>
                  {stationData.map((station) => (
                    <AccordionItem value={station}>
                      <AccordionTrigger>Dịch vụ ở Trạm {station}</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col space-y-3'>
                          {services && services.filter((service) => service.station === station).length > 0 ? (
                            services
                              .filter((service) => service.station === station)
                              .map((service) => (
                                <ServiceItem service={service} seatCode={seatCode}/>
                              ))
                          ) : (
                            <div className='text-center text-gray-500'>Không có danh sách dịch vụ đã chọn tại trạm này</div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            {/* <DialogFooter>
              <Button type='submit'>Xác nhận</Button>
            </DialogFooter> */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TicketService
