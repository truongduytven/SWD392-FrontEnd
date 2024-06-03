// import React, { useState, ChangeEvent, FormEvent } from 'react';

// const RatingForm: React.FC = () => {
//   const [rating, setRating] = useState<number>(0);
//   const [comment, setComment] = useState<string>('');
//   const [images, setImages] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);

//   const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     setImages(prevImages => [...prevImages, ...files]);

//     const imageUrls = files.map(file => URL.createObjectURL(file));
//     setImagePreviews(prevPreviews => [...prevPreviews, ...imageUrls]);
//   };

//   const logFormData = () => {
//     console.log('Rating:', rating);
//     console.log('Comment:', comment);
//     console.log('Images:', images);
//   };

//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();
//     logFormData();

//     // Your form submission logic here...
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
//         <select
//           value={rating}
//           onChange={(e) => setRating(parseInt(e.target.value))}
//           className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         >
//           <option value={0}>Select Rating</option>
//           <option value={1}>1</option>
//           <option value={2}>2</option>
//           <option value={3}>3</option>
//           <option value={4}>4</option>
//           <option value={5}>5</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Comment:</label>
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         ></textarea>
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Upload Images:</label>
//         <input
//           type="file"
//           multiple
//           onChange={handleImageUpload}
//           className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
//       <div className="mb-4">
//         {imagePreviews.length > 0 && (
//           <div className="mt-4">
//             <h3 className="text-gray-700 text-sm font-bold mb-2">Uploaded Images:</h3>
//             <div className="grid grid-cols-3 gap-4">
//               {imagePreviews.map((preview, index) => (
//                 <img key={index} src={preview} alt={`Preview ${index}`} className="w-full h-auto" />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="flex justify-between">
//         <button
//           type="button"
//           onClick={logFormData}
//           className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Log Form Data
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };

// export default RatingForm;
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RadioGroup, RadioGroupItem } from '@/components/global/atoms/radio-group'

import { Button } from '@/components/global/atoms/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/global/atoms/form'
import { Textarea } from '@/components/global/atoms/textarea'
import { ratingSchema } from '@/lib/schemas/ratingSchema'
import starIcon from '@/assets/star.svg'
import starFillIcon from '@/assets/star-fill.svg'
import { Input } from '../atoms/input'
import IterateUplaod from './IterateUplaod'
import MultipleImageUpload from './MultipleImageUpload'
import SingleImageUpload from './SingleImageUpload'
import cry from "@/assets/cry1.png"
import love from "@/assets/in-love.png"
// const FormSchema = z.object({
//   bio: z
//     .string()
//     .min(10, {
//       message: "Bio must be at least 10 characters.",
//     })
//     .max(160, {
//       message: "Bio must not be longer than 30 characters.",
//     }),
// })

const rateValueToText = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời']

function RatingForm() {
  const [rateValue, setRateValue] = useState(5)

  const form = useForm<z.infer<typeof ratingSchema>>({
    resolver: zodResolver(ratingSchema),
    defaultValues: { value: 5 }
  })

  function onSubmit(data: z.infer<typeof ratingSchema>) {
    console.log('object', data)
  }
  return (
    <div className='flex h-screen items-center justify-center py-40 '>
      <div className={'fixed inset-0 z-[1000] flex justify-center items-center'}>
        <div className='w-[500px] bg-background rounded-md p-6'>
          <div className='mb-2 text-lg font-medium'>Đánh giá chuyến đi</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='flex items-center gap-2'>
                <div className='text-sm'>Chất lượng chuyến đi:</div>
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
                                      <img className='w-8 h-8 cursor-pointer' src={love} />
                                    ) : (
                                      <img className='w-8 h-8 cursor-pointer text-gray-500' src={cry} />
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

             

              <div className='flex justify-end items-center gap-3'>
                <div onClick={() => {}}>Trở lại</div>
                <Button type='submit'>Đánh giá</Button>
              </div>
            </form>
          </Form>
        </div>
        <IterateUplaod/>
          {/* <MultipleImageUpload/>    */}
         {/* <SingleImageUpload />  */}
      </div>
    </div>
  )
}

export default RatingForm
