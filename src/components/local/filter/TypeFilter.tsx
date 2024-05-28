import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Checkbox } from '@/components/global/atoms/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/global/atoms/form'
import { TypeSchema } from '@/lib/schemas/TypeSchema'
import { ChevronsUpDown } from 'lucide-react'

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
  },
  
] as const

interface TypeFilterProps {
  selectedItems: string[]
  onItemsChange: (items: string[]) => void
}

function TypeFilter({ selectedItems, onItemsChange }: TypeFilterProps) {
  const form = useForm<z.infer<typeof TypeSchema>>({
    resolver: zodResolver(TypeSchema),
    defaultValues: {
      items: selectedItems
    }
  })

  useEffect(() => {
    form.setValue('items', selectedItems)
  }, [selectedItems, form])

  function onSubmit(data: z.infer<typeof TypeSchema>) {
    onItemsChange(data.items || [])
    console.log(data)
  }

  const [showModal, setShowModal] = useState<Boolean>(false)

  return (
    <div className='px-4 py-2 border-t'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='items'
            render={() => (
              <FormItem>
                <div
                  className=''
                  onClick={() => {
                    setShowModal((prev) => !prev)
                  }}
                >
                  <FormLabel className='cursor-pointer text-lg font-bold flex items-center justify-between'>
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
                        render={({ field }) => (
                          <FormItem key={item.id} className='flex flex-row items-start space-x-3 space-y-0 mb-2'>
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
                        )}
                      />
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default TypeFilter
