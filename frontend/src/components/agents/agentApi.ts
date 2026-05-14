import { baseApi } from "../../store/baseApi";

export interface AgentStat {
  id: number;
  name: string;
  run_count: number;
  last_queried: string;
}

export const agentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAgentStats: build.query<AgentStat, string>({
      query: (agentName) => `/agent/${agentName}`,
      providesTags: ["Agent"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetAgentStatsQuery } = agentApi;
