import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL : 'http://104.197.46.54'
    }
);