import axios from "axios";

axios.defaults.baseURL = "http://heqs.trydev.ru/api/";

// http://heqs.trydev.ru/api/readEmployees
// http://heqs.trydev.ru/api/readWorkCenters
//  http://heqs.trydev.ru/api/readTicketsList
// http://heqs.trydev.ru/api/tickets

const httpService = {
    get: axios.get,
    post: axios.post,
    patch: axios.patch
};

export default httpService;
