import httpService from "./http.service";

const ticketsEndPoint = "readTicketsList";

const ticketsService = {
    fetch: async () => {
        const { data } = await httpService.get(ticketsEndPoint, {
            params: {
                _page: 1,
                _limit: 10
            }
        });
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post("tickets", payload);
        return data;
    }
};

export default ticketsService;
