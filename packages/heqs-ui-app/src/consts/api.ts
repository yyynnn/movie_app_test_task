// http://heqs.trydev.ru/api/readEmployees
// http://heqs.trydev.ru/api/readWorkCenters
//  http://heqs.trydev.ru/api/readTicketsList
// http://heqs.trydev.ru/api/tickets

export const API_PATH_PREFIX = 'https://dev.heqsapp.com/api'

export const API = {
  GET: {
    EMPLOYEES: `${API_PATH_PREFIX}/readEmployees`,
    WORK_CENTERS: `${API_PATH_PREFIX}/readWorkCenters`,
    TICKETS_LIST: `${API_PATH_PREFIX}/readTicketsList`,
    TICKET: (id: string) => `${API_PATH_PREFIX}/tickets/${id}`,
    LOGOUT: '/logout'
  },
  MUTATE: {
    ADD_TICKET: `${API_PATH_PREFIX}/tickets`,
    LOGIN: '/login',
    REGISTER: '/login'
  }
}
