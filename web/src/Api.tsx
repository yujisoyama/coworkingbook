import axios from "axios";

export const api = axios.create({
    baseURL: 'http://15.228.154.83:3001',
});

// baseURL: 'http://localhost:3000'
// baseURL: 'http://15.228.128.96:3000/',
