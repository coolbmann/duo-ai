import { baseApi } from "../../store/baseApi";

export interface AgentStat {
  id: number;
  name: string;
  run_count: number;
  last_queried: string;
}

export type BookingSystemDTOType = {
  id: number;
  name: string;
  last_accessed: string;
};

export const agentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAgentStats: build.query<AgentStat, string>({
      query: (agentName) => `/agent/${agentName}`,
      providesTags: ["Agent"],
    }),
    getCourtAvailabilityBookingSystems: build.query<
      BookingSystemDTOType[],
      string
    >({
      query: (agentName) => `/agent/${agentName}/booking-systems`,
      providesTags: ["Agent"],
    }),
  }),
});

export const {
  useGetAgentStatsQuery,
  useGetCourtAvailabilityBookingSystemsQuery,
} = agentApi;
