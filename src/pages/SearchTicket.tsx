import { Button } from '@/components/global/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/global/atoms/form'
import { Input } from '@/components/global/atoms/input'
import { searchTicket } from '@/lib/schemas/searchTicket'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { UserRoundSearch, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { z } from 'zod'
import { useState } from 'react'
function SearchTicket() {
  const searchTicketForm = useForm<z.infer<typeof searchTicket>>({
    resolver: zodResolver(searchTicket),
    defaultValues: {
      email: '',
      code: ''
    }
  })
  function onSubmitLogin(values: z.infer<typeof searchTicket>) {
    console.log(values)
  }
  const [showModal, setShowModal] = useState<Boolean>(false)
  return (
    <div className='relative flex gap-8 justify-start flex-col items-center h-fit w-full mt-16'>
      <h1 className='font-bold text-3xl'>Tra cứu thông tin vé</h1>
      <div className='absolute top-2 left-10 hover:font-bold hover:underline hover:text-primary'>
        <Link to='/' className='flex space-x-2'>
          <ArrowLeft className='scale-75' />
          Về trang chủ
        </Link>
      </div>
      <Form {...searchTicketForm}>
        <form
          onSubmit={searchTicketForm.handleSubmit(onSubmitLogin)}
          className='flex w-1/2 items-center justify-center w-s gap-5 flex-col text-center'
        >
          <FormField
            control={searchTicketForm.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-2/3 flex flex-col justify-center items-start'>
                <FormLabel>Email</FormLabel>
                <FormControl className=''>
                  <Input placeholder='Nhập email của bạn' {...field} className='' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={searchTicketForm.control}
            name='code'
            render={({ field }) => (
              <FormItem className='w-2/3 flex flex-col justify-center '>
                <FormLabel className='text-left'>Mã Code</FormLabel>
                <FormControl className=''>
                  <Input placeholder='Nhập mã code của bạn' {...field} className='' />
                </FormControl>
                <FormMessage className='text-left' />
              </FormItem>
            )}
          />
          <Button type='submit' onClick={()=>setShowModal(true)} >
            <UserRoundSearch className='w-5 mr-2'/>
            Tra cứu
          </Button>
        </form>
      </Form>
      {showModal && <div>
        <div className='fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'></div>
        <div className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg'>
          ljglkjnnjgnjnlkwenklnlknlkwlknlkenlnwln Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti sed
          maiores possimus earum. Obcaecati nemo nihil fugit non quibusdam eos similique nobis officia, ipsa error,
          placeat architecto delectus ab nesciunt?
          <div className='flex justify-end'>

          <Button className='w-fit' onClick={()=>setShowModal(false)}>Đã hiểu</Button>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default SearchTicket
