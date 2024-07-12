import { useStationData } from '@/apis/ticketAPI'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/global/atoms/select'
import { useInvoice } from '@/contexts/InvoiceContext'
import { Search } from 'lucide-react'
import { useRef } from 'react'
interface ServiceActionProps {
  onStationSelect: (station: string) => void
  onKeyChange: (key: string) => void
}

function ServiceAction({ onStationSelect, onKeyChange }: ServiceActionProps) {
  
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { invoiceData } = useInvoice()
  const { data } = useStationData({ routeID: invoiceData.routeID, companyID: invoiceData.companyID })
  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onKeyChange(event.target.value)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  return (
    <div className='flex space-x-4 justify-end'>
      <div className='relative w-full'>
        <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
          <Search className='h-4 w-4 text-gray-400' />
        </div>
        <input
          type='text'
          ref={searchInputRef}
          onChange={handleKeyChange}
          id='simple-search'
          className='block w-[300px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-primary focus:ring-0'
          placeholder='Tìm kiếm....'
        />
      </div>
      <div className='w-full'>
        <Select onValueChange={onStationSelect}>
          <SelectTrigger>
            <SelectValue placeholder='Chọn trạm sử dụng dịch vụ *' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Danh sách trạm</SelectLabel>
              {data &&
                data.map((station) => (
                  <SelectItem key={station.StationID} value={station.StationID}>
                    {station.Name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default ServiceAction
