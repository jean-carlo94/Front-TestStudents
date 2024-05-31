import axios from "axios";

const ApiTestV2 = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export default ApiTestV2;