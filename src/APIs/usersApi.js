import axios from "axios";

export const createUser = async (userData) => {
  const response = await axios.post(
    "https://medicamp-server-jth3.onrender.com/users",
    userData
  ); // change URL accordingly
  return response.data;
};
