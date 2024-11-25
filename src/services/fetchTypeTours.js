import axios from 'axios';

export const fetchTypeTours = async () => {

  const response = await axios.get('http://localhost:3001/V2/TypeTour/GetAllTypeTour',{ withCredentials: true});

  return response.data.TypeTour;
};

