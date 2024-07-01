import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

export interface SearchData {
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
  const [searchData, setSearchData] = useState<SearchData>(() => {
    const savedData = localStorage.getItem('searchData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return {
        ...parsedData,
        startDate: new Date(parsedData.startDate), // Convert startDate back to Date object
      };
    }
    return defaultSearchData;
  });

  useEffect(() => {
    localStorage.setItem('searchData', JSON.stringify(searchData));
  }, [searchData]);

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
