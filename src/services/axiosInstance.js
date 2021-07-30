import axios from "axios";

const HTTP = axios.create({
    baseURL: "http://jsonplaceholder.typicode.com/",
});

HTTP.interceptors.request.use(function (config) {
    // Do something before request is sent
    //config.headers.common['testInterceptor'] = 'Interceptor Header';
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
HTTP.interceptors.response.use(function (response) {
    // Do something with response data
    //response.data = { test: 'test' }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default HTTP;