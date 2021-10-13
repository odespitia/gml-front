import axios from "axios";
// import store from '@/store/admin'

export default axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    "Content-type": "application/json",
    // Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
  }
});