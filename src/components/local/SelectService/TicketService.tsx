import { Button } from '@/components/global/atoms/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/local/SelectService/tabsService'
import ServiceLayout from '@/components/local/SelectService/ServiceLayout'
import ServiceAction from '@/components/local/SelectService/ServiceAction'
import { Service, ticket } from '@/types/invoiceData'
import { HandPlatter } from 'lucide-react'
// import { stationData } from '@/constants/SeatData'
import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/local/SelectService/accordionService'
import ServiceItem from './ServiceItem'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/global/atoms/alert-dialog'
import { useInvoice } from '@/contexts/InvoiceContext'
import { formatPrice } from '@/lib/utils'
import { useGetServiceWithStation, useStationData } from '@/apis/ticketAPI'
import { IService } from '@/types/ticketInterface'

function TicketService({ services, seatCode }: ticket) {
  const [ servicesData, setServices ] = useState<IService[] | undefined>([])
  const { updateTicketServices, invoiceData } = useInvoice()
  const [isServiceSelected, setIsServiceSelected] = useState(false)
  const [selectedStation, setSelectedStation] = useState<string | null>(null)
  const [localServices, setLocalServices] = useState<Service[]>(services)
  const [keySearch, setKeySearch] = useState<string>('')
  const [priceStation, setPriceStation] = useState(0)
  const { data: serviceData } = useGetServiceWithStation(selectedStation)
  const { data: stationsData} = useStationData({ routeID: invoiceData.routeID, companyID: invoiceData.companyID })
  console.log(serviceData)
  useEffect(() => {
    // Recalculate price whenever localServices changes
    let totalPrice = 0;
    localServices.forEach(service => {
      totalPrice += service.Price * service.quantity;
    });
    setPriceStation(totalPrice);
  }, [localServices]);

  useEffect(() => {
    if (serviceData) {
      setServices(serviceData);
    }
  }, [serviceData]);

  const handleClickSelectService = (station: string) => {
    setIsServiceSelected(true)
    setSelectedStation(station)
  }

  const handleAddService = (service: Service) => {
    const findService = localServices.find(
      (localServices) => localServices.ServiceID === service.ServiceID && localServices.station === service.station
    )
    if (findService) {
      setLocalServices(
        localServices.map((service) =>
          service === findService ? { ...service, quantity: service.quantity + 1 } : service
        )
      )
      return
    }
    setLocalServices([...localServices, service])
  }

  const handleUpdateService = (updatedService: Service) => {
    setLocalServices(
      localServices.map((service) =>
        service.ServiceID === updatedService.ServiceID && service.station === updatedService.station ? updatedService : service
      )
    )
  }

  const handleDeleteService = (serviceId: string, selectedStation: string) => {
    const findService = localServices.find(
      (localServices) => localServices.ServiceID === serviceId && localServices.station === selectedStation
    )
    setLocalServices(localServices.filter((service) => service !== findService))
  }

  const handleConfirm = () => {
    updateTicketServices(seatCode, localServices)
  }

  const handleCancel = () => {
    setLocalServices(services)
    setSelectedStation(null)
    setIsServiceSelected(false)
    setKeySearch('')
  }

  const handleKeyChange = (keySearch: string) => {
    setKeySearch(keySearch)
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className='w-full flex justify-end p-3'>
            <Button
              onClick={() => setIsServiceSelected(false)}
              className='hover:scale-105 transform scale-100 transition duration-200'
            >
              {services.length > 0 ? 'Chi tiết dịch vụ' : 'Chọn dịch vụ'}
              <HandPlatter className='ml-1' />
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className='sm:max-w-screen-lg h-[700px] flex justify-between space-x-4'>
          <div className='w-3/5'>
            <AlertDialogHeader>
              <AlertDialogTitle className='flex justify-between items-center mb-6'>
                Chọn dịch vụ
                <span className='text-xs text-red-500'>* Vui lòng chọn trạm trước khi lựa chọn dịch vụ</span>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <ServiceAction onKeyChange={handleKeyChange} onStationSelect={handleClickSelectService} />
            {isServiceSelected && servicesData && servicesData?.length > 0 ? (
              <Tabs defaultValue={servicesData?.[0].ServiceTypeID} className='w-full mt-4'>
                <TabsList>
                  {servicesData?.map((items, index) => (
                    <TabsTrigger key={index} value={items.ServiceTypeID}>
                      {items.Name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {servicesData?.map((items) => (
                  <TabsContent key={items.ServiceTypeID} value={items.ServiceTypeID}>
                  <ServiceLayout
                    keySearch={keySearch}
                    props={items.ServiceModels}
                    selectedStation={selectedStation}
                    onAddService={handleAddService} 
                  />
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className='text-center text-gray-500 mt-10'>Không có dịch vụ nào tại trạm này</div>
            )}
          </div>
          <div className='w-4/12 flex flex-col border-l-2 p-2'>
            <div className='h-full'>
              <AlertDialogHeader>
                <AlertDialogTitle className='flex justify-between items-center mb-6'>Dịch vụ đã chọn</AlertDialogTitle>
              </AlertDialogHeader>
              <div className='flex flex-col space-y-2 my-2 p-2 overflow-y-auto max-h-[500px]'>
                <Accordion type='multiple' className='w-full' defaultValue={stationsData?.map(station => station.StationID)}>
                  {stationsData && stationsData?.map((station, index) => (
                    <AccordionItem key={index} value={station.StationID} defaultValue={station.StationID}>
                      <AccordionTrigger className='hover:text-tertiary'>
                        <span>{station.Name}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col space-y-3'>
                          {localServices &&
                          localServices.filter((service) => service.station === station.StationID).length > 0 ? (
                            localServices
                              .filter((service) => service.station === station.StationID)
                              .map((service) => (
                                <ServiceItem
                                  service={service}
                                  seatCode={seatCode}
                                  onUpdateService={handleUpdateService}
                                  onDeleteService={handleDeleteService}
                                />
                              ))
                          ) : (
                            <div className='text-center text-wrap text-gray-500'>
                              Không có danh sách dịch vụ đã chọn tại trạm này
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            <span className='flex justify-end my-2 font-bold'>Tổng tiền: {formatPrice(priceStation)}</span>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>Xác nhận</AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default TicketService
