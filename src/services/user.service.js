import axios from 'axios';


const API_URL = 'https://localhost:7160/api/user/';

class UserService {

  delete(id) {
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);
    const headers = {
      'Authorization': "bearer " + userData.accessToken,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    axios.defaults.headers.common = { 'Authorization': `bearer ${userData.accessToken}` }
    const bodyParameters = {
      key: "value"
    };
    return axios.delete(API_URL + 'delete/' + id, headers, bodyParameters);
  }

  update(user){
    return axios.put(API_URL + 'edit/' , user);
  }

  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
}

export default new UserService();
