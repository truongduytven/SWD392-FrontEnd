import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/global/atoms/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/global/atoms/command'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/global/atoms/form'
import { BusFilterSchema } from '@/lib/schemas/BusFilterSchema'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import { useGetCompanies } from '@/apis/companyAPI'
const companies = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'ger' },
  { label: 'Spanish', value: 'sp' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' }
] as const

interface BusFilterProps {
  selectedItems: string[]
  onItemsChange: (items: string[]) => void
}
function BusFilter({ selectedItems, onItemsChange }: BusFilterProps) {
  const [showModal, setShowModal] = useState<Boolean>(false)
  const { data: companies } = useGetCompanies()

  const form = useForm<z.infer<typeof BusFilterSchema>>({
    resolver: zodResolver(BusFilterSchema),
    defaultValues: {
      company: selectedItems
    }
  })
  useEffect(() => {
    form.setValue('company', selectedItems)
  }, [selectedItems, form])

  function onSubmit(data: z.infer<typeof BusFilterSchema>) {
    onItemsChange(data.company || [])
  }

  const toggleLanguage = (value: string) => {
    const currentCompanies = form.getValues('company') || [] // Ensure it's an array
    const newCompanies = currentCompanies.includes(value)
      ? currentCompanies.filter((com) => com !== value)
      : [...currentCompanies, value]
    form.setValue('company', newCompanies)

    onSubmit({ company: newCompanies })
  }

  return (
    <div className='w-full border-t  '>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='company'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormControl>
                  <Button
                    variant='ghost'
                    role='combobox'
                    className={cn('w-full justify-between text-md font-bold', !field.value && 'text-muted-foreground')}
                    onClick={(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                      setShowModal((prev) => !prev)
                    }}
                  >
                    Nhà xe
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </FormControl>

                {showModal && (
                  <Command className='w-full'>
                    <CommandInput placeholder='Tìm nhà xe...' className='h-9' />
                    <CommandEmpty>Không tìm thấy nhà xe</CommandEmpty>
                    <CommandList className='h-40 overflow-y-auto'>
                      {/* <PopoverClose className='w-full'> */}
                      <CommandGroup>
                        {companies?.map((com) => (
                          <CommandItem
                            value={com.Name}
                            key={com.CompanyID}
                            onSelect={() => {
                              toggleLanguage(com.CompanyID)
                            }}
                          >
                            {com.Name}
                            <CheckIcon
                              strokeWidth={3}
                              className={cn(
                                'ml-auto h-4 w-4 text-primary ',
                                field.value?.includes(com.CompanyID) ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
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

export default BusFilter
