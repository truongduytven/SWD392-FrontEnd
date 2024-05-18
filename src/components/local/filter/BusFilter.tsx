import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/global/atoms/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/global/atoms/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/global/atoms/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/global/atoms/popover'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import { PopoverClose } from '@radix-ui/react-popover'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' }
] as const
const FormSchema = z.object({
  language: z.string({
    required_error: 'Please select a language.'
  })
})
function BusFilter() {
  const [showModal, setShowModal] = useState<Boolean>(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      language: 'es'
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }
  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='language'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormControl>
                  <Button
                    variant='ghost'
                    role='combobox'
                    className={cn('w-[210px] justify-between', !field.value && 'text-muted-foreground')}
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
                    <CommandInput placeholder='Search framework...' className='h-9' />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandList>
                      {/* <PopoverClose className='w-full'> */}
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue('language', language.value)
                              form.handleSubmit(onSubmit)() // Auto submit on change
                            }}
                          >
                            {language.label}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                language.value === field.value ? 'opacity-100' : 'opacity-0'
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
