import axios from 'axios'
import { toast } from 'react-toastify'
const http = axios.create({ baseURL: 'http://heqs.trydev.ru/api/' })
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
// axios.defaults.baseURL = "http://heqs.trydev.ru/api/";

// http://heqs.trydev.ru/api/readEmployees
// http://heqs.trydev.ru/api/readWorkCenters
//  http://heqs.trydev.ru/api/readTicketsList
// http://heqs.trydev.ru/api/tickets

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.response.status < 500
    if (!expectedErrors) {
      console.log(error)
      toast.error('Something went wrong. ')
    }
    if (error.response.status === 422) {
      toast.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  patch: http.patch
}

export default httpService
