import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/global/atoms/popover'
import { Card, CardContent } from '@/components/global/atoms/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/global/atoms/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/global/atoms/dialog'
import starFillIcon from '@/assets/star-fill.svg'
import { Image } from 'antd'
interface Feedback {
  UserName: string;
  Date: string;
  Desciption: string;
  ImageUrl: string[];
  Rating: number;
  Avt: string;
}
interface RatingDetailProps {
  feedback: Feedback;
}
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
function RatingDetail({ feedback }:RatingDetailProps) {
  console.log("rating", feedback)
  const defaultAvatar = 'https://i.pinimg.com/originals/7d/83/2a/7d832a6867b7a6b4fbec7ff05864df6e.png';
  return (
    <div className='flex justify-center mb-4 bg-muted '>
    <div className='w-full p-4 cursor-pointer mx-10 '>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center justify-center'>
          <div className='w-12 h-12 mr-2 overflow-hidden rounded-full'>
            <img
              className='object-cover w-full h-full'
              src={defaultAvatar}
              alt='Profile Image'
            />
          </div>

          <div className=' flex flex-col'>
            <strong className='text-md '>{feedback.UserName}</strong>
            <div className='text-muted-foreground text-sm flex justify-center items-center gap-1'> <span>Đi ngày: </span><span>{formatDate(feedback.Date)}</span></div>
          </div>
        </div>

        <div className='flex'>
          {Array(feedback.Rating)
            .fill(null)
            .map((_, index) => {
              return <img key={index} src={starFillIcon} className='w-5 h-5 ' />
            })}
        </div>
      </div>

      <div className='text-foreground text-base'>{feedback.Desciption}</div>

      <div className='flex gap-2 mt-2'>
        {/* {!!rating.imageUrls?.length && ( */}

        {/* <Dialog>
          <DialogTrigger className='flex gap-2'>
           {' '}
             {feedback.ImageUrl?.map((img:any, index:any) => (
           <img
           key={index}
           className='object-cover w-24 h-32 rounded cursor-pointer aspect-square '
           src={img}
           alt='rating'
         />
        ))}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <Carousel className='w-full '>
                  <CarouselContent>
                  {feedback.ImageUrl.map((img:any, index:any) => (
                      <CarouselItem key={index}>
                        <div className='flex flex-col h-full gap-3 justify-center items-center'>
                          <Card className='shadow-none  border-none flex justify-center items-center'>
                            <CardContent className='p-0 flex justify-center items-center'>
                              <img
                                className='object-cotain h-full rounded-md cursor-pointer '
                                src={img}
                                alt='rating'
                              />
                            </CardContent>
                          </Card>
                          <div className='text-right '>
                          {index+1}/ {feedback.ImageUrl.length}
                        </div>
                        </div>
                      
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
         {feedback.ImageUrl && feedback.ImageUrl.length > 0 && (
            <Dialog>
              <DialogTrigger className="flex gap-2">
                {feedback.ImageUrl.map((img, index) => (
                  <img
                    key={index}
                    className="object-cover w-24 h-32 rounded cursor-pointer aspect-square"
                    src={img}
                    alt="rating"
                  />
                ))}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <Carousel className="w-full">
                      <CarouselContent>
                        {feedback.ImageUrl.map((img, index) => (
                          <CarouselItem key={index}>
                            <div className="flex flex-col h-full gap-3 justify-center items-center">
                              <Card className="shadow-none border-none flex justify-center items-center">
                                <CardContent className="p-0 flex justify-center items-center">
                                  <img
                                    className="object-contain h-[400px] rounded-md cursor-pointer"
                                    src={img}
                                    alt="rating"
                                  />
                                </CardContent>
                              </Card>
                              <div className="text-right">
                                {index + 1} / {feedback.ImageUrl.length}
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}

      </div>

       
     
    </div>
  </div>
  )
}

export default RatingDetail