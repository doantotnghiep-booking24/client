import axios from 'axios';

export const fetchNewsData = async () => {
  const response = await axios.get('http://localhost:3001/News/GetAllNews');
  return response.data.Featured_Location;
};
