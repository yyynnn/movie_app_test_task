import httpService from './http.service'

const employeeEndPoint = 'readEmployees'

const employeeService = {
  fetch: async () => {
    const { data } = await httpService.get(employeeEndPoint)

    return data
  }
}

export default employeeService
