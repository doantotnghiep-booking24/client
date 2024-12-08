import axios from 'axios';

export const fetchCategories = async () => {
  const response = await axios.get('http://localhost:3001/V2/Category/getCategories',{ withCredentials: true});
  const result = response.data.Categories.filter(t => t.isDeleted === false);
  return result;
};

