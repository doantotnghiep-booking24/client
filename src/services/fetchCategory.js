import axios from 'axios';

export const fetchCategories = async () => {
  const response = await axios.get('https://bookingtravel-44jm.onrender.com/V2/Category/getCategories',{ withCredentials: true});
  const result = response.data.Categories.filter(t => t.isDeleted === false);
  return result;
};

