import axios from 'axios';

export const fetchFeaturedLocationData = async () => {
  const response = await axios.get('http://localhost:3001/V2/Featured_Location/GetFeatured_Location');
  // console.log(response.data);
  // console.log(response.data.Featured_Location[1].Image_Location[0].path);
  return response.data.Featured_Location; 
};
