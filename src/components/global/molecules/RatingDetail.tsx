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

function RatingDetail() {
  return (
    <div className='flex justify-center mb-4 bg-muted '>
    <div className='w-full p-4 cursor-pointer mx-10 '>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center justify-center'>
          <div className='w-12  h-12 mr-2 overflow-hidden rounded-full'>
            <img
              className='object-cover w-full h-full'
              src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'
              alt='Profile Image'
            />
          </div>

          <div className=' flex flex-col'>
            <strong className='text-md '>Thuongminhlsr</strong>
            <span className='text-muted-foreground text-sm'> Đi ngày: 15/04/2024</span>
          </div>
        </div>

        <div className='flex'>
          {Array(5)
            .fill(null)
            .map((_, index) => {
              return <img key={index} src={starFillIcon} className='w-5 h-5' />
            })}
        </div>
      </div>

      <div className='text-foreground text-base'>Chất lượng chuyến đi tuyệt vời</div>

      <div className='flex gap-2 mt-2'>
        {/* {!!rating.imageUrls?.length && ( */}

        <Dialog>
          <DialogTrigger className='flex gap-2'>
            {' '}
            <img
              className='object-cover w-24 rounded cursor-pointer aspect-square'
              src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'
              alt='rating'
            />
            <img
              className='object-cover w-24 rounded cursor-pointer aspect-square'
              src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'
              alt='rating'
            />
            <img
              className='object-cover w-24 rounded cursor-pointer aspect-square'
              src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'
              alt='rating'
            />
            <img
              className='object-cover w-24 rounded cursor-pointer aspect-square'
              src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'
              alt='rating'
            />
            <img
              className='object-cover w-24 rounded cursor-pointer aspect-square'
              src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'
              alt='rating'
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <Carousel className='w-full '>
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <div className='p-1'>
                          <Card>
                            <CardContent className='flex aspect-square items-center justify-center p-6'>
                              <img
                                className='object-cover w-24 rounded cursor-pointer aspect-square'
                                src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'
                                alt='rating'
                              />
                            </CardContent>
                          </Card>
                        </div>
                        <p className='text-right'>
                          {index}/ {Array.length}
                        </p>
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

        {/* )} */}
      </div>

      {/* {rating.order && ( */}
      <>
        {/* <div className='text-lg font-medium mb-2'>Sản phẩm đã mua:</div> */}

        {/* <div className='flex flex-wrap gap-4'> */}
        {/* {getBirds(rating.order).map((bird) => ( */}
        {/* <div className='flex items-center gap-4 bg-card p-2 rounded-lg'>
                        <img
                          className='object-cover w-20 border rounded-md cursor-pointer aspect-square'
                          src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                          alt='bird'
                        /> */}

        {/* <div>
                          <p className='font-semibold text-center md:text-left'>ndbnmbd</p>
                          <p className='flex items-center'>
                            Loài:fnhnjkn
                            {bird.gender === 'male' ? (
                              <img className='w-6 h-6 ml-1' src={maleIcon} alt='' />
                            ) : (
                              <img className='w-6 h-6 ml-1' src={femaleIcon} alt='' />
                            )}
                          </p>
                          <p className='flex items-center'>
                            Phân loại: Chim kiểng <img src={birdIcon} className='w-5 h-5 ml-1' />
                          </p>
                        </div>
                      </div> */}
        {/* ))} */}
        {/* {getNests(rating.order).map((nest) => (
                      <div className='flex items-center gap-4 bg-card p-2 rounded-lg'>
                        <img
                          className='object-cover w-20 border rounded-md cursor-pointer aspect-square'
                          src={nest.imageUrls?.[0] || noImage}
                          alt='nest'
                        />

                        <div>
                          <p className='font-semibold text-center md:text-left'>{nest.name}</p>
                          <p className='flex items-center'>Loài: {getSpecie(nest).name}</p>
                          <p className='flex items-center'>
                            Phân loại: Tổ chim non <img src={nestIcon} className='w-5 h-5 ml-1' />
                          </p>
                        </div>
                      </div>
                    ))} */}
        {/* </div> */}
      </>
      {/* )} */}
      {/* {rating.orderNest && (
                <>
                  <div className='text-lg font-medium mb-2'>Đặt tổ chim non:</div>

                  <div className='flex flex-wrap gap-4 items-center'>
                    <div className='flex items-center gap-4 bg-card p-2 rounded-lg'>
                      <img
                        className='object-cover w-20 border rounded-md cursor-pointer aspect-square'
                        src={rating.orderNest.dad.imageUrls?.[0] || noImage}
                        alt='rating.orderNest.dad'
                      />

                      <div>
                        <p className='font-semibold text-center md:text-left'>{rating.orderNest.dad.name}</p>
                        <p className='flex items-center'>
                          Loài: {getSpecie(rating.orderNest).name}
                          <img className='w-6 h-6 ml-1' src={maleIcon} alt='' />
                        </p>
                        <p className='flex items-center'>
                          Phân loại: Chim phối giống <img src={breedIcon} className='w-5 h-5 ml-1' />
                        </p>
                      </div>
                    </div>

                    <img src={redHeart} className='w-12 h-12' />

                    <div className='flex items-center gap-4 bg-card p-2 rounded-lg'>
                      <img
                        className='object-cover w-20 border rounded-md cursor-pointer aspect-square'
                        src={rating.orderNest.mom.imageUrls?.[0] || noImage}
                        alt='rating.orderNest.mom'
                      />

                      <div>
                        <p className='font-semibold text-center md:text-left'>{rating.orderNest.mom.name}</p>
                        <p className='flex items-center'>
                          Loài: {getSpecie(rating.orderNest).name}
                          <img className='w-6 h-6 ml-1' src={femaleIcon} alt='' />
                        </p>
                        <p className='flex items-center'>
                          Phân loại: Chim phối giống <img src={breedIcon} className='w-5 h-5 ml-1' />
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div> */}
    </div>
  </div>
  )
}

export default RatingDetail