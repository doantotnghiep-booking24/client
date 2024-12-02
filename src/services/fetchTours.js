import axios from 'axios';

export const fetchToursData = async () => {

  const response = await axios.get('http://localhost:3001/V1/Tours', { withCredentials: true });
  const result = response.data.Tours.datas.filter(t => t.isDeleted === false);
// console.log(result);


  return result;

};

