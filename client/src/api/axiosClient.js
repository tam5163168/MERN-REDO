import axios from "axios";
import queryString from "query-string";
// import firebase from "firebase";
import { apiUrl } from "context/constants"

const axiosClient = axios.create({
    baseURL: `http://localhost:5000/api`,
    timeout: 10000,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

// axiosClient.interceptors.request.use(async (config) => {
//     // Handle token here ...
//     if (currentUser) {
//         const token = await currentUser.getIdToken();
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

// axiosClient.interceptors.response.use(
//     (response) => {
//         if (response && response.data) {
//             return response.data;
//         }
//         return response;
//     },
//     (error) => {
//         throw error;
//     }
// );

export default axiosClient;
