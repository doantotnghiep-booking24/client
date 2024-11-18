import axios from 'axios';

export const fetchToursData = async () => {
  const response = await axios.get('http://localhost:3001/V1/Tours', { withCredentials: true});
  return response.data.Tours.datas;
};

