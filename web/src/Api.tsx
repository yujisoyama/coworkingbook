import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000',
});

// baseURL: 'http://localhost:3000'
// baseURL: 'http://15.228.128.96:3000/',
