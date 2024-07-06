import { useGetCompanies } from '@/apis/companyAPI';
import { useGetCitySearchForm, useGetTripSearchForm } from '@/apis/tripAPI';
import Loading from '@/components/global/molecules/Loading';
import CardTrip from '@/components/global/organisms/CardTrip';
import { SearchForm } from '@/components/local/Search/SearchForm';
import Arrange from '@/components/local/filter/Arrange';
import BadgeList from '@/components/local/filter/BadgeListFilter';
import BusFilter from '@/components/local/filter/BusFilter';
import TypeFilter from '@/components/local/filter/TypeFilter';
import { SearchData, useSearch } from '@/contexts/SearchContext';
import { findCityNameByID } from '@/lib/utils';
import { ArrowBigUpDash, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import noTripFound from"@/assets/error-page-unscreen.gif"
const staticItems = [
  { id: 'HÀNG ĐẦU', label: 'Hàng đầu' },
  { id: 'HÀNG GIỮA', label: 'Hàng giữa' },
  { id: 'HÀNG SAU', label: 'Hàng cuối' },
  { label: 'Giờ sớm nhất', id: 'THỜI GIAN ĐI SỚM NHẤT' },
  { label: 'Giờ muộn nhất', id: 'THỜI GIAN ĐI MUỘN NHẤT' },
  { label: 'Đánh giá tăng dần', id: 'TỔNG SỐ ĐÁNH GIÁ TĂNG DẦN' },
  { label: 'Đánh giá giảm dần', id: 'TỔNG SỐ ĐÁNH GIÁ GIẢM DẦN' },
  { label: 'Giá tăng dần', id: 'GIÁ TĂNG DẦN' },
  { label: 'Giá giảm dần', id: 'GIÁ GIẢM DẦN' }
] as const;

function SearchPage() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { data: companies } = useGetCompanies();
  const companyItems = companies
    ? companies.map((company) => ({
        id: company.CompanyID,
        label: company.Name
      }))
    : [];

  const filterItems: readonly { id: string; label: string }[] = [...staticItems, ...companyItems];
  const { searchData } = useSearch();
  const initialState = {
    sortOption: 'DEFAULT',
    sortCompany: [] as string[],
    seatAvailability: [] as string[]
  };
  const [filterState, setFilterState] = useState(initialState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isFetching, refetch } = useGetTripSearchForm(searchData, filterState, currentPage);
  const { data: dataCityFromTo } = useGetCitySearchForm();

  const handleSortOptionChange = (value: string) => {
    setFilterState((prevState) => ({
      ...prevState,
      sortOption: value
    }));
    setCurrentPage(1); // Reset current page to 1
  };

  const handleSortCompanyChange = (items: string[]) => {
    setFilterState((prevState) => ({
      ...prevState,
      sortCompany: items
    }));
    setCurrentPage(1); // Reset current page to 1
  };

  const handleSeatAvailabilityChange = (items: string[]) => {
    setFilterState((prevState) => ({
      ...prevState,
      seatAvailability: items
    }));
    setCurrentPage(1); // Reset current page to 1
  };

  const handleClearFilters = () => {
    setFilterState(initialState);
    setCurrentPage(1); // Reset current page to 1
  };

  const handleSearchSubmit = (values: SearchData) => {
    setFilterState(initialState);
    setCurrentPage(1);
    refetch();
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Only refetch data if filterState has changed
    refetch();
  }, [filterState, refetch]);

  const renderPagination = () => {
    if (!data || data.TotalCount === 0) {
      return null;
    }

    const totalPages = data.TotalCount; // Assuming TotalCount represents the total number of pages

    // Create an array of page numbers
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className='flex justify-center my-4 space-x-2'>
        {pages.map((page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded ${
              currentPage === page ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className='w-screen flex justify-center items-center bg-secondary pb-12'>
      <div className='flex flex-col justify-center items-center w-2/3'>
        <div className='w-full flex justify-center absolute top-[100px]'>
          <SearchForm onsubmitSearch={handleSearchSubmit} />
        </div>
        <h1 className='mt-56 mb-8 text-3xl font-bold text-center'>
          {findCityNameByID(searchData.startLocation, dataCityFromTo?.FromCities || [])} -{' '}
          {findCityNameByID(searchData.endLocation, dataCityFromTo?.ToCities || [])}
        </h1>
        <div className='flex w-full gap-5 main' id='result'>
          <div className='sticky top-24 slidebar flex flex-col shadow-md border rounded-lg bg-white w-2/5 h-fit'>
            <div className='flex justify-between items-center gap-5 py-2 text-md font-bold pr-2'>
              <p className='ml-4'>Bộ lọc tìm kiếm</p>
              <p
                className='flex text-red-500 cursor-pointer justify-center items-center gap-2 px-2 py-1 rounded-md hover:bg-secondary'
                onClick={handleClearFilters}
              >
                Bỏ lọc <Trash2 />
              </p>
            </div>
            <Arrange selectedValue={filterState.sortOption} onValueChange={handleSortOptionChange} />
            <BusFilter selectedItems={filterState.sortCompany} onItemsChange={handleSortCompanyChange} />
            <TypeFilter selectedItems={filterState.seatAvailability} onItemsChange={handleSeatAvailabilityChange} />
          </div>

          <div className='w-full flex flex-col'>
            <div className='flex'>
              <BadgeList items={filterItems} selectedItems={filterState.sortCompany} onItemsChange={handleSortCompanyChange} />
              <BadgeList items={filterItems} selectedItems={filterState.seatAvailability} onItemsChange={handleSeatAvailabilityChange} />
            </div>
            {isFetching ? (
              <div className='mt-40'>
                <Loading />
                <p className='mt-3 animate-pulse'>Đang tìm kiếm chuyến xe, bạn vui lòng đợi chút xíu...</p>
              </div>
            ) : (
              <>
                {data && data.Items.length > 0 ? (
                  data.Items.map((item, index) => <CardTrip key={index} data={item} />)
                ) : (
                  <div className='flex flex-col items-center'>
                    <img src={noTripFound} alt='No trips found' className='w-96 mb-4' />
                    <h1 className='font-semibold text-center text-lg'>
                      Không tìm thấy chuyến xe. Xin bạn vui lòng thay đổi tuyến đường tìm kiếm hoặc bỏ lọc!
                    </h1>
                  </div>
                )}
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      </div>

      {showScrollButton && (
        <div className='fixed bottom-0 mr-20 w-full md:bottom-6 md:right-12 md:w-auto z-50 animate-bounce'>
          <a
            href='#result'
            onClick={handleScrollToTop}
            className='sticky top-3/4 ml-10 bg-primary rounded-full text-white flex justify-center items-center p-2 mb-4 transition duration-300'
          >
            <ArrowBigUpDash size={30} fill='white' />
          </a>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
