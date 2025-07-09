import axios from 'axios';

export const createUser = async (userData) => {
  const response = await axios.post('http://localhost:5000/users', userData); // change URL accordingly
  return response.data;
};
