import { Card, CardContent } from '@/components/global/atoms/card';
import { Button } from '@/components/global/atoms/button';
import { Search } from 'lucide-react';
import { IPopularTrip } from '@/types/tripInterface';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '@/contexts/SearchContext';
import Popular1 from '@/assets/popular1.jpg';
import Popular2 from '@/assets/popular2.jpg';
import Popular3 from '@/assets/popular3.jpg';
import Popular4 from '@/assets/popular4.jpg';
import Popular5 from '@/assets/popular5.jpg';
import Popular6 from '@/assets/popular6.jpg';
import Popular7 from '@/assets/popular7.jpg';
import Popular8 from '@/assets/popular8.jpg';
import Popular9 from '@/assets/popular9.jpg';
import Popular10 from '@/assets/popular10.jpg';

interface PopularTripProps {
  data: IPopularTrip; // Ensure 'data' prop is of type IPopularTrip
}

const listImage = [
  { ImageUrl: Popular1, Color: '#2f323b' },
  { ImageUrl: Popular2, Color: '#a61e39' },
  { ImageUrl: Popular3, Color: '#b0bac3' },
  { ImageUrl: Popular4, Color: '#090808' },
  { ImageUrl: Popular5, Color: '#14878f' },
  { ImageUrl: Popular6, Color: '#58148f' },
  { ImageUrl: Popular7, Color: '#2824b3' },
  { ImageUrl: Popular8, Color: '#24b39d' },
  { ImageUrl: Popular9, Color: '#249db3' },
  { ImageUrl: Popular10, Color: '#13c4d1' },
];

function PopularTrip({ data }: PopularTripProps) {
  const navigate = useNavigate();
  const { setSearchData } = useSearch();

  // Function to get a random image from the list
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * listImage.length);
    return listImage[randomIndex];
  };

  const randomImage = getRandomImage();

  const handleClickPopular = () => {
    const searchData = {
      startLocation: data.FromCityID,
      endLocation: data.ToCityID,
      startDate: new Date(),
    };
    console.log('Click popular trip');
    setSearchData(searchData);
    console.log('popular trip', searchData);
    navigate('/search');
  };

  return (
    <Card className="shadow-md hover:cursor-pointer" style={{ backgroundColor: randomImage.Color }} onClick={handleClickPopular}>
      <CardContent className="p-0 flex text-md flex-col items-center justify-center">
        <img
          src={randomImage.ImageUrl}
          className="rounded-md h-44 w-full object-cover overflow-hidden"
        />
        <div className="flex flex-col w-full text-white p-6">
          <span>
            Chuyến đi từ <span className="font-bold">"{data.FromCity}"</span>
          </span>
          <span>
            Đến <span className="font-semibold">"{data.ToCity}"</span>
          </span>
          <span>
            Lượt đặt vé <span className="font-semibold">{data.TotalBooking}</span>
          </span>
        </div>
        {/* <div className="flex justify-end w-full p-3">
          <Button onClick={handleClickPopular}>
            <Search className="h-fit mr-1" /> Tra cứu ngay
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
}

export default PopularTrip;
