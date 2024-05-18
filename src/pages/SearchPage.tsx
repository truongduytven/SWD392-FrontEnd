import React from 'react'
import { SearchForm } from '@/components/local/Search/SearchForm'
import Arrange from '@/components/local/filter/Arrange'
import BusFilter from '@/components/local/filter/BusFilter'
import TypeFilter from '@/components/local/filter/TypeFilter'
function SearchPage() {
  return (
    <div className=''>

      <SearchForm top='100px'/>
      <div className='mt-60 flex gap-10'>
        <div className=''>
            <Arrange/>
            <BusFilter/>
            <TypeFilter/>

        </div>
        <div className=' bg-red-500' >
            dnkjgnkjfdhgjkhjkghkjfjnbgmfb
        </div>
        
      </div>
    </div>
  )
}

export default SearchPage
