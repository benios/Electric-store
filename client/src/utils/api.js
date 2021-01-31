
import axios from 'axios';



const API = {
  signup: async (userName, password, firstName, lastName, address, age) => {
    try {
      const response = await  axios.post('/user',{userName, password, firstName, lastName, address, age});
      console.log(response);
    }catch (error) {
      console.error(error);
    }
  },
  login: async (userName, password) => {
    try {
      const response = await  axios.post('/user/login',{userName, password});
      console.log(response)
    }catch (error) {
      console.error(error);
    }
  },
};

export default API;
