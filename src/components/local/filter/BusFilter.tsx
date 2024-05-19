import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/global/atoms/form'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronsUpDown, XIcon } from 'lucide-react'
import { BusFilterSchema } from '@/lib/schemas/BusFilterSchema'
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


function BusFilter() {
  const [showModal, setShowModal] = useState<Boolean>(false)
  const form = useForm<z.infer<typeof BusFilterSchema>>({
    resolver: zodResolver(BusFilterSchema),
    defaultValues: {
      language: []
    }
  })

  function onSubmit(data: z.infer<typeof BusFilterSchema>) {
    console.log(data)
  }

  const toggleLanguage = (value: string) => {
    const currentLanguages = form.getValues('language') || [] // Ensure it's an array
    const newLanguages = currentLanguages.includes(value)
      ? currentLanguages.filter((lang) => lang !== value)
      : [...currentLanguages, value]
    form.setValue('language', newLanguages)

    onSubmit({ language: newLanguages })
  }
  const handleBadgeDelete = (value: string) => {
    const currentLanguages = form.getValues('language') || []
    const newLanguages = currentLanguages.filter((lang) => lang !== value)
    form.setValue('language', newLanguages)
    onSubmit({ language: newLanguages })
  }

  return (
    <div className='w-full border-t '>
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
                    className={cn(
                      'w-full justify-between text-lg font-bold',
                      !field.value && 'text-muted-foreground'
                    )}
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
                              toggleLanguage(language.value)
                            }}
                          >
                            {language.label}
                            <CheckIcon
                              strokeWidth={3}
                              className={cn(
                                'ml-auto h-4 w-4 text-primary ',
                                field.value?.includes(language.value) ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                )}
                <FormMessage />
                <div className='mt-4 flex flex-wrap'>
                  {field.value?.map((languageValue) => {
                    const language = languages.find((lang) => lang.value === languageValue)
                    return (
                      <span
                        key={languageValue}
                        className='inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mr-2 mb-2'
                      >
                        {language?.label}
                        <XIcon
                          className='ml-2 h-4 w-4 cursor-pointer'
                          onClick={() => handleBadgeDelete(languageValue)}
                        />
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

export default BusFilter
