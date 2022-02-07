import axios from 'axios';
const axiosInstance = axios.create();

const requestInterceptor = async request => {
  // we can add logic to it later
  return request;
};
const successInterceptor = response => {
  return response;
};

const errorInterceptor = error => {
  // Handle response error
  const customError = {statusCode: 'None', errorMessage: ''};
  if (error?.response) {
    // Request made and server responded
    customError.statusCode = error?.response?.status ?? 'None';
    customError.errorMessage =
      customError.statusCode === 500
        ? 'Server error occurred. Try again after sometime'
        : JSON.stringify(error?.response?.data?.message) ?? '';

  } else if (error?.request) {
    // The request was made but no response was received
    customError.errorMessage = 'Could not receive response. Please try again';
    
  } else {
    // Something happened in setting up the request that triggered an Error
    customError.errorMessage =
      error?.message ?? 'Unknown error occurred on request';
  }
};
class HTTPClient {
  constructor() {
    axiosInstance.defaults.baseURL = util.BASE_URL;
    axiosInstance.interceptors.request.use(requestInterceptor);
    axiosInstance.interceptors.response.use(
      response => {
        return successInterceptor(response);
      },
      error => {
        return Promise.reject(errorInterceptor(error));
      },
    );
  }

  async get(url) {
    try {
      const response = await axiosInstance.get(url);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post(url, data) {
    try {
      const response = await axiosInstance.post(url, data);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put(url, data = {}) {
    try {
      const response = await axiosInstance.put(url, data);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(url) {
    try {
      const response = await axiosInstance.delete(url);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new HTTPClient();
