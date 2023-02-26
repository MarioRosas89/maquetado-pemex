import axios from 'axios';

const instance = axios.create({
  baseURL: "https://localhost:7160/api/user/",
})
const API_URL = 'https://localhost:7160/api/user/';

class UserService {

  delete(id , token) {
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('Authorization')
        if (token) {
           config.headers.Authorization = 'Bearer '+token
           config.headers["Content-Type"] = "application/json"
        } else {
           // Do something... Usually logout user.
        }
        return config
      }
  )
    const headers = { 
      'Authorization': "bearer " +token,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
  const bodyParameters = {
     key: "value"
  };
    return axios.delete(API_URL + 'delete/' + id, headers, bodyParameters);
  }
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
}

export default new UserService();
