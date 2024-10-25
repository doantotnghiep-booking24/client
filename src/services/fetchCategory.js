import axios from 'axios';

export const fetchCategories = async () => {
  const response = await axios.get('http://localhost:3001/V2/Category/getCategories');
  console.log(response.data.Categories);
  return response.data.Categories;
};

