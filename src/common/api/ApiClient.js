import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL: 'http://34.123.156.208'
    }
);