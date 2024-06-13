import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/global/atoms/form'
import { RadioGroup, RadioGroupItem } from '@/components/global/atoms/radio-group'
import { ArrangeSchema } from '@/lib/schemas/ArrangeSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function Arrange({ selectedValue, onValueChange }:any) {
  const form = useForm<z.infer<typeof ArrangeSchema>>({
    resolver: zodResolver(ArrangeSchema),
    defaultValues: { type: selectedValue},
  })

  function onSubmit(data: z.infer<typeof ArrangeSchema>) {
    onValueChange(data.type)
  }
console.log("gia tri nhan duoc o sap xep:", selectedValue)
  return (
    <div className='px-4 py-6 w-full border-t'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel className='text-md font-bold'>Sắp xếp</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value)
                      form.handleSubmit(onSubmit)() // Auto submit on change
                    }}
                    value={selectedValue}
                    defaultValue={field.value}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='mac dinh' />
                      </FormControl>
                      <FormLabel className='font-normal'  >Mặc định</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='gio som nhat' />
                      </FormControl>
                      <FormLabel className='font-normal'>Giờ sớm nhất</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='gio muon nhat'  />
                      </FormControl>
                      <FormLabel className='font-normal'>Giờ muộn nhất</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='gia tang dan'  />
                      </FormControl>
                      <FormLabel className='font-normal'>Giá tăng dần</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='gia giam dan' />
                      </FormControl>
                      <FormLabel className='font-normal'>Giá giảm dần</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default Arrange
