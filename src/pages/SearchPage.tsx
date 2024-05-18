import React from 'react'
import { SearchForm } from '@/components/local/Search/SearchForm'
import Arrange from '@/components/local/filter/Arrange'
import BusFilter from '@/components/local/filter/BusFilter'
import TypeFilter from '@/components/local/filter/TypeFilter'
import { Trash2 } from 'lucide-react'
function SearchPage() {
  return (
    <div className='w-full  '>
      <SearchForm top='100px' />
      <div className='flex flex-col justify-center items-center '>
        <h1 className='mt-60 mb-4'>Hồ Chí Minh - Bến Tre</h1>
        <div className='flex gap-10 '>
          <div className='flex flex-col gap-2 shadow-md border rounded-lg  '>
            <div className='flex justify-between items-center gap-5 px-4 py-3 text-lg font-bold'>
              <p>Bộ lọc tìm kiếm</p>
              <span className='flex text-red-500'>
                Bỏ lọc
                <Trash2 />
              </span>
            </div>
            <Arrange />
            <BusFilter />
            <TypeFilter />
          </div>
          <div className=' bg-red-500'>dnkjgnkjfdhgjkhjkghkjfjnbgmfb</div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
