import axios from "axios";

axios.defaults.baseURL = "http://heqs.trydev.ru/api/";

const httpService = {
    get: axios.get,
    post: axios.post
};

export default httpService;
