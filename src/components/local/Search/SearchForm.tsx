import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/global/atoms/form'
import { Select, SelectContent, SelectValue } from '@/components/global/atoms/ui/select'
import { SearchSchema } from '@/lib/schemas/Search'
import { ISearch } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectItem, SelectTrigger } from '@radix-ui/react-select'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { DatePicker } from './DatePicker'

interface Props {
  initData: ISearch
}

export function SearchForm() {
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      startLocation: '',
      endLocation: '',
      startDate: new Date(),
      endDate: new Date()
    }
  })
  function onSubmit(values: z.infer<typeof SearchSchema>) {
    console.log(values)
  }
  return (
    <div className='w-full h-[200px] flex justify-center absolute top-[300px]'>
      <div className='bg-black h-full rounded-lg bg-secondary w-2/3'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='startLocation'
              render={({ field }) => (
                <FormItem>
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
              name='startLocation'
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormControl>
                    <DatePicker 
                        initialDate={field.value}
                        onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker 
                        initialDate={field.value as Date}
                        onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}
