import { Button, buttonVariants } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TRatingSchema, ratingSchema } from '@/lib/validations/rating'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Shell } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { cn } from '@/lib/utils'
import { Textarea } from '../ui/textarea'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import starIcon from '@/assets/star.svg'
import starFillIcon from '@/assets/star-fill.svg'
import { useRatingFormStore } from '@/store/use-rating-form'
import { birdFarmApi } from '@/services/bird-farm-api'
import { useNavigate } from 'react-router-dom'

const rateValueToText = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời']

export function RatingForm() {
  const { toast } = useToast()
  const form = useForm<TRatingSchema>({
    resolver: zodResolver(ratingSchema),
    defaultValues: { value: 5 }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rateValue, setRateValue] = useState(5)
  const { display, orderId, orderNestId } = useRatingFormStore()
  const navigate = useNavigate()

  async function onSubmit(values: TRatingSchema) {
    try {
      setIsSubmitting(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body: any = { ...values }
      if (orderId) {
        body.order = orderId
      } else if (orderNestId) {
        body.orderNest = orderNestId
      }

      await birdFarmApi.post('/api/ratings', body)
      useRatingFormStore.setState({ display: false })
      navigate('/ratings')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: 'Không thể đánh giá',
        description: messageError || 'Không rõ nguyễn nhân'
      })
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {display ? (
        <div className={'fixed inset-0 z-[1000] flex justify-center items-center bg-foreground/60'}>
          <div className='w-[500px] bg-background rounded-md p-6'>
            <div className='mb-2 text-lg font-medium'>Đánh giá đơn hàng</div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <div className='text-sm'>Chất lượng đơn hàng:</div>
                  <FormField
                    control={form.control}
                    name='value'
                    render={() => (
                      <FormItem className='space-y-3'>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value: string) => {
                              setRateValue(Number(value))
                              form.setValue('value', Number(value))
                            }}
                            // defaultValue={field.value}
                            className='flex'
                          >
                            {Array(5)
                              .fill(null)
                              .map((_, index) => {
                                return (
                                  <FormItem key={index}>
                                    <FormControl>
                                      <RadioGroupItem className='hidden' value={(index + 1).toString()} />
                                    </FormControl>
                                    <FormLabel>
                                      {rateValue > index ? (
                                        <img className='w-8 h-8 cursor-pointer' src={starFillIcon} />
                                      ) : (
                                        <img className='w-8 h-8 cursor-pointer' src={starIcon} />
                                      )}
                                    </FormLabel>
                                  </FormItem>
                                )
                              })}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className='text-center text-[#eab308]' id='rating-text'>
                    {rateValueToText[rateValue - 1]}
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl>
                        <Textarea rows={5} placeholder='Nhập đánh giá...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex justify-end gap-3'>
                  <div
                    onClick={() => {
                      if (isSubmitting) return
                      useRatingFormStore.setState({ display: false, orderId: undefined })
                    }}
                    className={cn('cursor-pointer', buttonVariants({ variant: 'outline' }))}
                  >
                    Trở lại
                  </div>
                  <Button disabled={isSubmitting} type='submit'>
                    Đánh giá {isSubmitting && <Shell className='w-4 h-4 animate-spin' />}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      ) : null}
    </>
  )
}
