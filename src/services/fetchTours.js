import axios from 'axios';

export const fetchToursData = async () => {

  const response = await axios.get('https://bookingtravel-44jm.onrender.com', { withCredentials: true });
  const result = response.data.Tours.datas.filter(t => t.isDeleted === false);
// console.log(result);


  return result;

};

