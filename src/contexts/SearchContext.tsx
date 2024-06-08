// src/context/SearchContext.tsx
import { useGetCitySearchForm } from '@/apis/tripAPI';
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface SearchData {
  startLocation: string;
  endLocation: string;
  startDate: Date;
}

interface SearchContextProps {
  searchData: SearchData;
  setSearchData: React.Dispatch<React.SetStateAction<SearchData>>;
}

const defaultSearchData: SearchData = {
  startLocation: "",
  endLocation: "",
  startDate: new Date(),
};

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<SearchData>(defaultSearchData);

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
