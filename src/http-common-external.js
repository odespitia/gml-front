import axios from "axios";
// import store from '@/store/admin'

export default axios.create({
  baseURL: process.env.VUE_APP_ROOT_PAISES, 
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});