import { Button } from '@/components/global/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/global/atoms/dialog'
import { Input } from '@/components/global/atoms/input'
import { Label } from '@/components/global/atoms/label'
import { ticket } from '@/types/invoiceData'
import { HandPlatter } from 'lucide-react'

function TicketService({ services }: ticket) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className='w-full flex justify-end p-2'>
            <Button className='hover:scale-105'>
              Chọn dịch vụ
              <HandPlatter className='ml-1' />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className='sm:max-w-screen-lg flex justify-between'>
          <div className='w-7/12'>
            <DialogHeader>
              <DialogTitle>Chọn dịch vụ</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' defaultValue='Pedro Duarte' className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Username
                </Label>
                <Input id='username' defaultValue='@peduarte' className='col-span-3' />
              </div>
            </div>
          </div>
          <div className='w-4/12 border'>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' defaultValue='Pedro Duarte' className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Username
                </Label>
                <Input id='username' defaultValue='@peduarte' className='col-span-3' />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TicketService
