import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/global/atoms/select'
import { Search } from 'lucide-react'

interface ServiceActionProps {
  onSelectService: (value: string) => void;
}

function ServiceAction({onSelectService} : ServiceActionProps) {
  return (
    <div className='flex space-x-4'>
      <div className='relative w-full'>
        <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
          <Search className='h-4 w-4 text-gray-400' />
        </div>
        <input
          type='text'
          id='simple-search'
          className='block w-[300px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-primary focus:ring-0'
          placeholder='Tìm kiếm....'
        />
      </div>
      <div className='w-full'>
        <Select onValueChange={onSelectService}>
          <SelectTrigger>
            <SelectValue placeholder='Chọn trạm sử dụng dịch vụ *' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Danh sách trạm</SelectLabel>
              <SelectItem value='Bến Tre'>Bến Tre</SelectItem>
              <SelectItem value='TP Hồ Chí Minh'>TP Hồ Chí Minh</SelectItem>
              <SelectItem value='Long An'>Long An</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default ServiceAction
