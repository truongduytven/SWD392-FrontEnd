import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/global/atoms/form'
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from '@/components/global/atoms/select'
import { SearchSchema } from '@/lib/schemas/Search'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { DatePicker } from './DatePicker'
import { Button } from '@/components/global/atoms/button'
import { formatDate } from 'date-fns'
import { CircleDot, MapPin, Clock } from 'lucide-react'

export function SearchForm() {
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      startLocation: 'TPHCM',
      endLocation: 'Đà Lạt',
      startDate: new Date()
    }
  })
  function onSubmit(values: z.infer<typeof SearchSchema>) {
    const postData = { ...values, startDate: formatDate(values.startDate, 'yyyy-MM-dd') }
    console.log(postData)
  }
  return (
    <div className='w-full flex justify-center absolute top-[300px]'>
      <div className='h-full py-5 rounded-lg bg-secondary w-2/3'>
        <Form {...form}>
          <form className='w-full h-full' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='w-full h-1/2 flex justify-around items-end'>
              <FormField
                control={form.control}
                name='startLocation'
                render={({ field }) => (
                  <FormItem className='w-1/4 flex flex-col '>
                    <div className='flex justify-start space-x-3 pl-2'>
                      <CircleDot className='text-red-500' />
                      <span>Địa điểm đi</span>
                    </div>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn địa điểm' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='TPHCM'>TPHCM</SelectItem>
                          <SelectItem value='Đà Lạt'>Đà Lạt</SelectItem>
                          <SelectItem value='Vũng Tàu'>Vũng Tàu</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endLocation'
                render={({ field }) => (
                  <FormItem className='w-1/4 flex flex-col'>
                    <div className='flex justify-start space-x-3 pl-2'>
                      <MapPin className='text-green-500' />
                      <span>Địa điểm đến</span>
                    </div>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn địa điểm' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='TPHCM'>TPHCM</SelectItem>
                          <SelectItem value='Đà Lạt'>Đà Lạt</SelectItem>
                          <SelectItem value='Vũng Tàu'>Vũng Tàu</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <div className='flex justify-start space-x-3 pl-2'>
                      <Clock className='text-blue-500' />
                      <span>Thời gian đi</span>
                    </div>
                    <FormControl>
                      <DatePicker initialDate={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='px-8 font-bold bg-yellow-400 hover:bg-yellow-300 hover:scale-110 hover:duration-700'
              >
                Tìm kiếm
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
