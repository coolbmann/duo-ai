import { createSlice } from "@reduxjs/toolkit";
import { agentApi, type AgentStat } from "../../components/agents/agentApi";

interface AgentState {
  agents: AgentStat[];
}

const initialState: AgentState = {
  agents: [],
};

export const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      agentApi.endpoints.getAgentStats.matchFulfilled,
      (state, action) => {
        const incoming = action.payload;
        const index = state.agents.findIndex((a) => a.id === incoming.id);
        if (index === -1) {
          state.agents.push(incoming);
        } else {
          state.agents[index] = incoming;
        }
      },
    );
  },
});
