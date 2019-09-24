import axios from 'axios';

const HOST = 'http://192.81.217.200/api';

const ApiService = axios.create({
  baseURL: HOST
});

export default ApiService;