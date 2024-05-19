import { Star } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../atoms/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/global/atoms/accordion'
import { ScrollArea, ScrollBar } from '../atoms/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/tabs'
import { Card, CardContent } from '@/components/global/atoms/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/global/atoms/carousel'
function CardTrip() {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <div className='flex bg-white p-3 gap-3 border mt-4 border-gray-200 rounded-md transition duration-300 ease-in-out w-full hover:shadow-md hover:shadow-orange-400 hover:border-orange-500 '>
          <div className='w-1/5 min-w-48 relative  overflow-hidden bg-cover bg-no-repeat'>
            <img
              className='h-full rounded-sm transition duration-300 ease-in-out hover:scale-110 '
              src='https://mia.vn/media/uploads/blog-du-lich/top-8-xe-phong-nam-di-da-lat-tu-sai-gon-dam-bao-chat-luong-va-an-toan-nhat-1634463769.jpg'
            />
          </div>
          <div className=' w-full flex flex-col gap-1'>
            <div className='text-lg font-bold flex justify-between'>
              <p>Minh Tiên Limousine</p>
              <p className='text-tertiary text-xl'>940.000đ</p>
            </div>
            <p className='text-muted-foreground'>Limousine 24 phòng đôi</p>
            <p className='flex item-center justify-start gap-1'>
              4.6
              <Star className='w-5 text-primary' fill='orange' />
              (78 đánh giá)
            </p>
            <div className='flex justify-between items-end '>
              <div className='flex gap-3 justify-center items-center'>
                <div className=' h-full flex justify-between items-center'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='74' viewBox='0 0 14 74'>
                    <path
                      fill='none'
                      stroke='#484848'
                      stroke-linecap='round'
                      stroke-width='2'
                      stroke-dasharray='0 7'
                      d='M7 13.5v46'
                    ></path>
                    <g fill='none' stroke='#DC2910' stroke-width='3'>
                      <circle cx='7' cy='7' r='7' stroke='none'></circle>
                      <circle cx='7' cy='7' r='5.5'></circle>
                    </g>
                    <path
                      d='M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z'
                      fill='#188B05'
                    ></path>
                  </svg>
                </div>

                <div className='flex flex-col items-start justify-between gap-1'>
                  <p className='m-0 p-0'>
                    <span className='font-bold mr-2 text-lg'>6:00</span>• Tp Hồ Chí Minh
                  </p>
                  <p className='text-muted-foreground'>2 giờ</p>
                  <p>
                    <span className='font-bold mr-2 text-lg'>8:30</span>• Bến Tre
                  </p>
                </div>
              </div>
              <div className='flex justify-center items-center gap-1 cursor-pointer'>
                <AccordionTrigger className='text-tertiary font-medium underline hover:font-bold '>
                  Thông tin chi tiết
                </AccordionTrigger>
              </div>
              <div className='flex flex-col justify-end items-center gap-3'>
                <p>Còn trống 26 chỗ</p>
                <Button>Chọn chuyến</Button>
              </div>
            </div>
          </div>
        </div>

        <div className='h-[1px] bg-stone-300 mx-3'></div>
        <AccordionContent className=''>
          <Tabs defaultValue='hinhanh' className=''>
            <TabsList className='w-full  px-4'>
              <Carousel className='ml-20'>
                <CarouselContent>
                  <CarouselItem  className="md:basis-1/2 lg:basis-1/4 mr-4 ">
                      <TabsTrigger value='hinhanh' className=''>Hình ảnh</TabsTrigger>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <TabsTrigger value='tienich'>Tiện ích</TabsTrigger>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <TabsTrigger value='diemdon'>Điểm đón</TabsTrigger>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <TabsTrigger value='diemtra'>Điểm trả</TabsTrigger>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <TabsTrigger value='danhgia'>Đánh giá</TabsTrigger>
                  </CarouselItem>
                 
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </TabsList>
            <TabsContent value='hinhanh'>Ảnh nè.</TabsContent>
            <TabsContent value='tienich'>Tiện ích đâu.</TabsContent>
            <TabsContent value='diemdon'>Em chờ.</TabsContent>
            <TabsContent value='diemtra'>Em chờ.</TabsContent>
            <TabsContent value='danhgia'>Cho mấy sao.</TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default CardTrip
