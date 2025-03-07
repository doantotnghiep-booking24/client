import axios from 'axios';

const fetchTours = async (page, limit, nameSearch = '', priceSearch = { min: 0, max: 0 }, categoryId = '') => {
  const { data } = await axios.get('https://bookingtravel-44jm.onrender.com/V1/Tours/SearchTour', {
    withCredentials: true,
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

export const searchTours = async (name, price) => {
    const response = await axios.get('https://bookingtravel-44jm.onrender.com/V1/Tours/SearchTour', {
        params: {
            NameSearch: name,
            PriceSearch: price
        }
    }, { withCredentials: true });
    return response.data.search.datas;
};
