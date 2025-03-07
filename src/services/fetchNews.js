import axios from 'axios';

export const fetchNewsData = async () => {
  const response = await axios.get('https://bookingtravel-44jm.onrender.com/News/GetAllNews',{ withCredentials: true});
  return response.data.News;
};
