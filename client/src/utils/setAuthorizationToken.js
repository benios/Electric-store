import axios from 'axios';

export default function setAuthorizationToken(token){
  if(axios) {
    axios.defaults.headers.common['authorization'] = `bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
}