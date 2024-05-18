import React from 'react'
import { SearchForm } from '@/components/local/Search/SearchForm'
import Arrange from '@/components/local/filter/Arrange'
import BusFilter from '@/components/local/filter/BusFilter'
function SearchPage() {
  return (
    <div>
      <SearchForm top='100px' />
      <div className='mt-60 flex gap-10'>
        <div className=''>
            <Arrange/>
            <BusFilter/>
        </div>
        <div className=' bg-red-500' >
            dnkjgnkjfdhgjkhjkghkjfjnbgmfb
        </div>
        
      </div>
    </div>
  )
}

export default SearchPage
