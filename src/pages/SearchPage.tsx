import { useGetCitySearchForm, useGetTripSearchForm } from '@/apis/tripAPI'
import Loading from '@/components/global/molecules/Loading'
import CardTrip from '@/components/global/organisms/CardTrip'
import { SearchForm } from '@/components/local/Search/SearchForm'
import Arrange from '@/components/local/filter/Arrange'
import BadgeList from '@/components/local/filter/BadgeListFilter'
import BusFilter from '@/components/local/filter/BusFilter'
import TypeFilter from '@/components/local/filter/TypeFilter'
import { useSearch } from '@/contexts/SearchContext'
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
  const { searchData } = useSearch()
  const { data, isPending } = useGetTripSearchForm(searchData)
  console.log(data)
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

  if (isPending) return <Loading />

  return (
    <div className='w-screen flex justify-center items-center bg-secondary pb-12'>
      <div className='flex flex-col justify-center items-center w-fit '>
        <div className='w-full flex justify-center absolute top-[100px]'>
          <SearchForm onsubmitSearch={() => {}} />
        </div>
        {/* <h1 className='mt-52 mb-4 text-4xl font-bold'>{searchData.startLocation} - {searchData.endLocation}</h1> */}
        {data ? (
          <>
            <h1 className='mt-56 mb-8 text-4xl font-bold '>
              {/* {searchData.startLocation} - {searchData.endLocation} */}
              {data?.data[0].startLocation} -  {data?.data[0].endLocation}
            </h1>
            <div className='flex gap-10 main '>
              <div className='sticky top-24 slidebar flex flex-col shadow-md border rounded-lg bg-white w-2/5 h-fit'>
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

              <div className='w-full flex flex-col'>
                {data?.data.map((item, index) => <CardTrip data={item} />)}

                <BadgeList items={items} selectedItems={filterState.selectedItems} onItemsChange={handleItemsChange} />
              </div>
            </div>
          </>
        ) : (
          <h1 className='mt-52 font-semibold text-center'>
            Xin lỗi bạn vì sự bất tiện này. TheBusJourney sẽ cập nhật ngay khi có thông tin xe hoạt động trên tuyến đường này.
            <p className='text-center'>Xin bạn vui lòng thay đổi tuyến đường tìm kiếm!</p>
          </h1>
        )}
      </div>
      {data && (
        <a
          href='#'
          onClick={handleScrollToTop}
          className='sticky top-3/4 right-28 bg-primary rounded-full text-white flex justify-center items-center p-2 mb-4'
        >
          <ArrowBigUpDash size={30} fill='white' />
        </a>
      )}
    </div>
  )
}

export default SearchPage
