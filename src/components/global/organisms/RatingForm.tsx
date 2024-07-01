import cry from '@/assets/cry1.png'
import love from '@/assets/in-love.png'
import { Button } from '@/components/global/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/global/atoms/form'
import { RadioGroup, RadioGroupItem } from '@/components/global/atoms/radio-group'
import { Textarea } from '@/components/global/atoms/textarea'
import { ratingSchema } from '@/lib/schemas/ratingSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

interface RatingFormProps {
  setShowRatingForm: (show: boolean) => void;
}

const rateValueToText = ['Rất tệ', 'Tệ', 'Bình thường', 'Hài lòng', 'Tuyệt vời']
const suggestedContents = [
  'Rất hài lòng với dịch vụ',
  'Chất lượng chuyến đi tốt',
  'Nhân viên chu đáo',
  'An toàn, tiện nghi',
  "Nhà vệ sinh sạch sẽ"
]

function RatingForm ({ setShowRatingForm }: RatingFormProps) {
  const [files, setFiles] = useState<File[]>([])
  const [base64Files, setBase64Files] = useState<string[]>([])
  const [suggestedContent, setSuggestedContent] = useState<string>('')

  const form = useForm<z.infer<typeof ratingSchema>>({
    resolver: zodResolver(ratingSchema),
    defaultValues: { value: 5, content: '', imageUrls: [] }
  })

  const { handleSubmit, control, setValue, reset } = form

  const onSubmit = (data: z.infer<typeof ratingSchema>) => {
    
    const formData = new FormData()
    formData.append('value', data.value.toString())
    formData.append('content', data.content || '')
    
    base64Files.forEach((base64File, index) => {
      formData.append('imageUrls', base64File)
    })
    console.log('Form Data:', data)
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }
    // You can use this formData to send the data to your server using an Axios POST request or any other method.

    reset({ value: 5, content: '', imageUrls: [] })
    setFiles([])
    setBase64Files([])
    setSuggestedContent('')
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const newFiles = [...files, ...selectedFiles]

    setFiles(newFiles)
    setValue('imageUrls', newFiles)

    selectedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setBase64Files((prev) => [...prev, reader.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeFile = (index: number) => {
    const newFiles = [...files.slice(0, index), ...files.slice(index + 1)]
    const newBase64Files = [...base64Files.slice(0, index), ...base64Files.slice(index + 1)]

    setFiles(newFiles)
    setBase64Files(newBase64Files)
    setValue('imageUrls', newFiles)
  }

  const handleSuggestedContentClick = (content: string) => {
    setValue('content', content)
    setSuggestedContent(content)
  }

  return (
    <div className='flex h-screen items-center justify-center py-40 '>
      <div className='fixed inset-0 z-[1000] flex flex-col justify-center items-center bg-black/70'>
        <div className='w-[500px] bg-background rounded-md p-6 drop-shadow-lg'>
          <div className='text-2xl font-medium text-center mb-4'>Đánh giá chuyến đi</div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='flex items-center gap-2'>
                <div className='text-sm font-medium'>Chất lượng chuyến đi:</div>
                <FormField
                  control={control}
                  name='value'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormControl>
                        <RadioGroup
                          value={field.value.toString()}
                          onValueChange={(value: string) => {
                            setValue('value', Number(value))
                          }}
                          className='flex'
                        >
                          {Array(5)
                            .fill(null)
                            .map((_, index) => (
                              <FormItem key={index}>
                                <FormControl>
                                  <RadioGroupItem className='hidden' value={(index + 1).toString()} />
                                </FormControl>
                                <FormLabel>
                                  {field.value > index ? (
                                    <img className='w-8 h-8 cursor-pointer' src={love} />
                                  ) : (
                                    <img className='w-8 h-8 cursor-pointer' src={cry} />
                                  )}
                                </FormLabel>
                              </FormItem>
                            ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className='text-center text-[#eab308] font-medium' id='rating-text'>
                  {rateValueToText[form.watch('value') - 1]}
                </p>
              </div>

              <FormField
                control={control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nội dung</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder='Nhập đánh giá...' {...field} />
                    </FormControl>
                    <div className='mt-2 flex flex-wrap gap-2'>
                      {suggestedContents.map((suggestion, index) => (
                        <button
                          type='button'
                          key={index}
                          className={`bg-gray-200 px-3 py-1 text-sm rounded-md ${
                            suggestedContent === suggestion ? 'bg-primary text-white' : ''
                          }`}
                          onClick={() => handleSuggestedContentClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className='font-medium'>Thêm hình ảnh mô tả trải nghiệm của bạn</p>
              <div className='flex flex-wrap gap-2'>
                {files.map((file, index) => (
                  <div key={index} className='m-2 relative'>
                    <img className='w-32 h-32 object-cover rounded-2xl' src={URL.createObjectURL(file)} alt='...' />
                    <button
                      type='button'
                      className='absolute -top-3 -right-3 font-medium text-white bg-primary rounded-full px-2 py-1 text-xs'
                      onClick={() => removeFile(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
                {files.length < 3 && (
                  <div className='m-2'>
                    <label
                      htmlFor='fileUpload'
                      className='block w-32 h-32 border border-gray-300 rounded-xl cursor-pointer'
                    >
                      <div className='flex justify-center items-center w-full h-full'>
                        <span className='text-4xl'>+</span>
                      </div>
                      <input
                        id='fileUpload'
                        type='file'
                        name='myfile'
                        className='hidden'
                        onChange={handleFileChange}
                        accept='image/*'
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className='flex justify-end items-center gap-3'>
                <Button variant='outline' onClick={() => setShowRatingForm(false)}>Trở lại</Button>
                <Button type='submit'>Đánh giá</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default RatingForm
