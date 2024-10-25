import axios from 'axios';

export const fetchFeaturedLocationData = async () => {
  const response = await axios.get('http://localhost:3001/V2/Featured_Location/GetFeatured_Location');
  return response.data.Featured_Location; 
};
