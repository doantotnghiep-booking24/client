import axios from 'axios';

export const fetchNewDetails = async (id) => {
    const response = await axios.get(`http://localhost:3001/News/DetailNew/${id}`, {withCredentials: true});
    console.log(response.data.detailNew[0]);
    
    return response.data.detailNew[0]; 
  };
