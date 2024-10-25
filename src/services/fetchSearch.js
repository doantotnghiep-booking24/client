import axios from "axios";
export const fetchTourSearch = async (filters) => {
    const {  price, type, name } = filters;
    const response = await axios.get('http://localhost:3001/V1/Tours/SearchTour', {
      params: {
        PriceSearch: price,
        Type: type,
        NameSearch: name,
      },
    });
    // console.log(response.data.search.datas)
    return response.data.search.datas;
  };
  