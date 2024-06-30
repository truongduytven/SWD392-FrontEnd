import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/global/atoms/form'
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from '@/components/global/atoms/select'
import { SearchSchema } from '@/lib/schemas/Search'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { DatePicker } from './DatePicker'
import { Button } from '@/components/global/atoms/button'
import { CircleDot, MapPin, Clock } from 'lucide-react'
import { SearchData, useSearch } from '@/contexts/SearchContext'
import { useGetCitySearchForm } from '@/apis/tripAPI'
import { useEffect } from 'react'
import Loader from '../TabCardTrip/Loader'

interface SearchFormProps {
  onsubmitSearch: (values: SearchData) => void
}

export function SearchForm({ onsubmitSearch }: SearchFormProps) {
  const { searchData, setSearchData } = useSearch()
  const { data, isPending } = useGetCitySearchForm()
  console.log('object', data)
  console.log(searchData)

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      startLocation: '',
      endLocation: '',
      startDate: searchData.startDate
    }
  })
  useEffect(() => {
    if (data) {
      form.reset({
        startLocation: searchData.startLocation || data?.FromCities[0]?.CityID.toString(),
        endLocation: searchData.endLocation || data?.ToCities[0]?.CityID.toString(),
        startDate: searchData.startDate
      })
    }
  }, [searchData, data])
  function onSubmit(values: z.infer<typeof SearchSchema>) {
    setSearchData(values)
    onsubmitSearch(values)
  }
  return (
    <div className='h-full py-5 rounded-lg bg-white w-2/3 drop-shadow-lg'>
      {isPending ? (
        <Loader />
      ) : (
        data && (
          <Form {...form}>
            <form className='w-full h-full' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='w-full h-1/2 flex justify-around items-end p-3'>
                <div className='flex w-full justify-around'>
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
                              {data.FromCities &&
                                data?.FromCities.map((city, index) => (
                                  <SelectItem key={index} value={city.CityID.toString()}>
                                    {city.CityName}
                                  </SelectItem>
                                ))}
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
                              {data.ToCities &&
                                data?.ToCities.map((city, index) => (
                                  <SelectItem key={index} value={city.CityID.toString()}>
                                    {city.CityName}
                                  </SelectItem>
                                ))}
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
                </div>
                <Button
                  type='submit'
                  className='px-8 font-bold bg-primary hover:scale-110 transform scale-100 transition duration-200'
                >
                  Tìm kiếm
                </Button>
              </div>
            </form>
          </Form>
        )
      )}
    </div>
  )
}
