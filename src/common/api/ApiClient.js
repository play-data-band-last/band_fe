import axios from "axios";

// 104.197.46.54
export const apiClient = axios.create(
    {
        baseURL : 'http://192.168.0.229:9090'
    }
);