import axios from "axios";

const API_URL = 'https://localhost:7160/api/user/';
//const offsetQuery = 'offset='

export const getUsersQuery = async () => {
  const result = await axios.get(API_URL + "all");
  return result;
};
