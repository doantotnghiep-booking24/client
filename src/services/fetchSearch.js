import axios from 'axios';

export const fetchTours = async () => {
    const response = await axios.get('/V1/Tours/GetTours');
    return response.data.Tours.datas;
};

export const searchTours = async (name, price) => {
    const response = await axios.get('/V1/Tours/SearchTour', {
        params: {
            NameSearch: name,
            PriceSearch: price
        }
    });
    return response.data.search.datas;
};
