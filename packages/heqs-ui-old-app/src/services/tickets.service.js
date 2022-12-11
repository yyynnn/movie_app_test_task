import httpService from './http.service'

const ticketsService = {
  fetch: async () => {
    const { data } = await httpService.get('readTicketsList', {
      params: {
        _page: 1,
        _limit: 10
      }
    })
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.post('tickets', payload)
    return data
  },
  fetchTicket: async (id) => {
    const { data } = await httpService.get(`tickets/${id}`)
    return data
  }
}

export default ticketsService
