import axios from 'axios';

export const fetchTourDetails = async (id) => {
    const response = await axios.get(`http://localhost:3001/V1/Tours/DetailTour/${id}`);
    return response.data.detailTour[0];
};
