import axios from 'axios';

export const createUser = async (userData) => {
  const response = await axios.post('https://medicamp-server-jade.vercel.app/users', userData); // change URL accordingly
  return response.data;
};
