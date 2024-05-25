import CardTrip from '@/components/global/organisms/CardTrip'
import Arrange from '@/components/local/filter/Arrange'
import BadgeList from '@/components/local/filter/BadgeListFilter'
import BusFilter from '@/components/local/filter/BusFilter'
import TypeFilter from '@/components/local/filter/TypeFilter'
import { ArrowBigUpDash, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
const items = [
  {
    id: 'ghengoi',
    label: 'Ghế ngồi'
  },
  {
    id: 'giuongnam',
    label: 'Giường nằm'
  },
  {
    id: 'giuongnamdoi',
    label: 'Giường nằm đôi'
  },
  { label: 'English', id: 'en' },
  { label: 'French', id: 'fr' },
  { label: 'German', id: 'de' },
  { label: 'Spanish', id: 'es' },
  { label: 'Portuguese', id: 'pt' },
  { label: 'Russian', id: 'ru' },
  { label: 'Japanese', id: 'ja' },
  { label: 'Korean', id: 'ko' },
  { label: 'Chinese', id: 'zh' },
  { label: 'Giờ sớm nhất', id: 'gio som nhat' },
  { label: 'Giờ muộn nhất', id: 'gio muon nhat' },
  { label: 'Giá tăng dần', id: 'gia tang dan' },
  { label: 'Giá giảm dần', id: 'gia giam dan' }
] as const

function SearchPage() {
  const initialState = {
    arrangeValue: 'mac dinh',
    selectedItems: [] as string[]
  }

  const [filterState, setFilterState] = useState(initialState)

  const handleArrangeChange = (value: string) => {
    setFilterState((prevState) => ({
      ...prevState,
      arrangeValue: value
    }))
  }

  const handleItemsChange = (items: string[]) => {
    setFilterState((prevState) => ({
      ...prevState,
      selectedItems: items
    }))
  }
  const handleClearFilters = () => {
    setFilterState(initialState)
  }

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  console.log('filter ne', filterState)
  const cardTrips = []
  for (let i = 0; i < 10; i++) {
    cardTrips.push(<CardTrip key={i} />)
  }

  return (
    <div className='w-full flex justify-center items-center bg-muted'>
      <div className='flex flex-col justify-center  items-center w-fit '>
        <h1 className='mt-60 mb-4 text-4xl font-bold'>Hồ Chí Minh - Bến Tre</h1>

        <div className='flex gap-10 w-2/3 main '>
          <div className='sticky top-10  slidebar flex flex-col shadow-md border rounded-lg bg-white w-1/4 h-fit'>
            <div className='flex justify-between items-center gap-5 px-4 py-2 text-lg font-bold'>
              <p className='m-0'>Bộ lọc tìm kiếm</p>
              <span
                className='flex text-red-500 cursor-pointer justify-center items-center gap-2 px-2 py-1 rounded-md hover:bg-secondary'
                onClick={handleClearFilters}
              >
                Bỏ lọc
                <Trash2 />
              </span>
            </div>
            <Arrange selectedValue={filterState.arrangeValue} onValueChange={handleArrangeChange} />
            <BusFilter selectedItems={filterState.selectedItems} onItemsChange={handleItemsChange} />
            <TypeFilter selectedItems={filterState.selectedItems} onItemsChange={handleItemsChange} />
          </div>
          <div className='w-2/3 tripcard flex flex-col'>
            <BadgeList items={items} selectedItems={filterState.selectedItems} onItemsChange={handleItemsChange} />

            <CardTrip />
            {cardTrips.map((card, index) => (
              <div key={index}>{card}</div>
            ))}
          </div>
        </div>
      </div>
      <a
        href='#'
        onClick={handleScrollToTop}
        className='sticky top-3/4 right-28 bg-primary rounded-full text-white flex justify-center items-center p-2 mb-4'
      >
        <ArrowBigUpDash size={30} fill='white' />
      </a>
    </div>
  )
}

export default SearchPage
