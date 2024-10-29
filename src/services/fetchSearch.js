import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTours = async (page, limit, nameSearch = '', priceSearch = { min: 0, max: 0 }, categoryId = '') => {
  const { data } = await axios.get('http://localhost:3001/V1/Tours/SearchTour', {
    params: {
      page,
      limit,
      NameSearch: nameSearch,
      PriceMin: priceSearch.min,
      PriceMax: priceSearch.max,
      CategoryId: categoryId
    },
  });
  return data.search;
};

export const useTours = (page, limit, nameSearch, priceSearch, categoryId) => {
  return useQuery({
    queryKey: ['tours', page, nameSearch, priceSearch, categoryId],
    queryFn: () => fetchTours(page, limit, nameSearch, priceSearch, categoryId),
  });
};
