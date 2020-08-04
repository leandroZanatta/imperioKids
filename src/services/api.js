import axios from "axios";

const api = axios.create({
  //baseURL: `http://${window.location.hostname}:${window.location.port}`,
  baseURL: `http://${window.location.hostname}:9090`,
  headers: { 'Content-Type': 'application/json' }
});


export default api;