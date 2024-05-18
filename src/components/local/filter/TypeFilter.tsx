import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/global/atoms/button'
import { Checkbox } from '@/components/global/atoms/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/global/atoms/form'
import { ChevronsUpDown } from 'lucide-react'
import { TypeSchema } from '@/lib/schemas/TypeSchema'
const items = [
  {
    id: 'ghengoi',
    label: 'Ghế ngồi'
  },
  {
    id: 'giuongnam',
    label: 'Giường nằm'
  },
  {
    id: 'giuongnamdoi',
    label: 'Giường nằm đôi'
  }
] as const


function TypeFilter() {
  const form = useForm<z.infer<typeof TypeSchema>>({
    resolver: zodResolver(TypeSchema)
  })
  function onSubmit(data: z.infer<typeof TypeSchema>) {
    console.log(data)
  }
  const [showModal, setShowModal] = useState<Boolean>(false)
  return (
    <div className=' px-4 py-2 border-t'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='items'
            render={() => (
              <FormItem>
                <div className=''
                  onClick={() => {
                    setShowModal((prev) => !prev)
                  }}
                >
                  <FormLabel className='text-lg font-bold flex items-center justify-between'>

                    Loại ghế/Giường
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </FormLabel>
                </div>
                {showModal && (
                  <div>
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='items'
                        render={({ field }) => {
                          return (
                            <FormItem key={item.id} className='flex flex-row items-start space-x-3 space-y-0'>
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(field.value?.filter((value) => value !== item.id))
                                    form.handleSubmit(onSubmit)()
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='text-sm font-normal'>{item.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                )}
                  <div className='mt-4 flex flex-wrap'>
                  {form.getValues('items')?.map((itemId) => {
                    const item = items.find((i) => i.id === itemId)
                    return (
                      <span
                        key={itemId}
                        className='inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mr-2 mb-2'
                      >
                        {item?.label}
                      </span>
                    )
                  })}
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default TypeFilter
