import axios from 'axios';

export const fetchFeaturedLocationDetail = async (id) => {
  const response = await axios.get(`https://frontend-booking-ovf1.onrender.com/V2/Featured_Location/DetailLocation/${id}`, { withCredentials: true});
  console.log(response.data.detailLocation[0]);
  return response.data.detailLocation[0]; 
};
