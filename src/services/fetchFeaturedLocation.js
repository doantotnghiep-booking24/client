import axios from 'axios';

export const fetchFeaturedLocationData = async () => {
  const response = await axios.get('https://bookingtravel-44jm.onrender.com/V2/Featured_Location/GetFeatured_Location',{ withCredentials: true});
  return response.data.Featured_Location; 
};
