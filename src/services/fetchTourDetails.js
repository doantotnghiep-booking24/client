import axios from 'axios';

export const fetchTourDetails = async (id) => {

    const response = await axios.get(`https://bookingtravel-44jm.onrender.com/V1/Tours/DetailTour/${id}`, { withCredentials: true});
    return response.data.detailTour[0];
};
