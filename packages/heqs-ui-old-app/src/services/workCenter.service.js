import httpService from './http.service'

const workCenterEndPoint = 'readWorkCenters'

const workCenterService = {
  fetch: async () => {
    const { data } = await httpService.get(workCenterEndPoint)

    return data
  }
}

export default workCenterService
