import { Button } from '@/components/global/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/local/SelectService/dialogService'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/local/SelectService/tabsService'
import { Input } from '@/components/global/atoms/input'
import ServiceLayout from '@/components/local/SelectService/ServiceLayout'
import ServiceAction from '@/components/local/SelectService/ServiceAction'
import { Label } from '@/components/global/atoms/label'
import { ticket } from '@/types/invoiceData'
import { HandPlatter } from 'lucide-react'
import { ServiceData } from '@/constants/SeatData'

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
              <DialogTitle className='flex justify-between items-center mb-6'>Chọn dịch vụ <span className="text-xs text-red-500">* Vui lòng chọn trạm trước khi lựa chọn dịch vụ</span></DialogTitle>
            </DialogHeader>
            <ServiceAction />
            <Tabs defaultValue='food' className='w-full mt-4'>
              <TabsList>
                <TabsTrigger value='food'>Thức ăn</TabsTrigger>
                <TabsTrigger value='drink'>Đồ uống</TabsTrigger>
                <TabsTrigger value='other'>Khác</TabsTrigger>
              </TabsList>
              <TabsContent value='food'><ServiceLayout props={ServiceData}/></TabsContent>
              <TabsContent value='drink'><ServiceLayout props={ServiceData}/></TabsContent>
              <TabsContent value='other'><ServiceLayout props={ServiceData}/></TabsContent>
            </Tabs>
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
