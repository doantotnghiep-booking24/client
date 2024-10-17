import axios from 'axios';

export const fetchNewsData = async () => {
  // Simulate a 5-second delay
  await new Promise(resolve => setTimeout(resolve, 5000));

  const response = await axios.get('http://localhost:3001/News/GetAllNews');
  // console.log(response.data);
  
  return response.data.News; 
};
