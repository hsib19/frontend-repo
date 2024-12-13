import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.API_URL, // Set base URL from environment variable
  timeout: 10000, // Timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authentication token to headers if available
    const token = localStorage.getItem("token");

    if (token) {
      config.headers['X-TOKEN'] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error responses (e.g., 401 unauthorized)
    if (error.response?.status === 401) {
      console.error('Unauthorized access - redirecting to login');
      // Optional: redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;