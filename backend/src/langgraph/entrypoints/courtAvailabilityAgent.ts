import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import {
  addMessages,
  entrypoint,
  getPreviousState,
  LangGraphRunnableConfig,
  MemorySaver,
} from "@langchain/langgraph";
import { classify } from "../tasks/classify";

const checkpointer = new MemorySaver();

// export const courtAvailabilityAgent = entrypoint(
//   { name: "courtAvailability", checkpointer },
//   async (message: BaseMessage[], config: LangGraphRunnableConfig) => {
//     const previous =
//       (await courtAvailabilityAgent.getState(config))?.values?.messages ?? [];

//     console.log("previous: ", previous);

//     const messages = [...previous, ...message];

//     console.log("messages: ", messages);
//     // Step 1: Classify Intent
//     // Determine which court availability agent to call, based on location and time
//     const availabilityParams = await classify(messages);

//     console.log(
//       "final: ",
//       entrypoint.final({
//         value: availabilityParams, // what gets returned to the caller
//         save: {
//           messages: [...messages, new AIMessage(availabilityParams.aiResponse)],
//         },
//       }),
//     );

//     return entrypoint.final({
//       value: availabilityParams, // what gets returned to the caller
//       save: {
//         messages: [...messages, new AIMessage(availabilityParams.aiResponse)],
//       },
//     });
//     // console.log("availabilityParams: ", availabilityParams);
//     // If there is not enough information, repeat step while chaining prompt context
//     // Step 2: Call API and normalise data
//     // Clean and strip unnecessary data before passing to AI
//     // Step 3: Pass prompt to AI and ask for summary of availabilities
//     // Return object shape for top 4 results
//     // Also return summary of other availabilities or lack thereof
//     return availabilityParams;
//   },
// );

export const courtAvailabilityAgent = entrypoint(
  { name: "courtAvailability", checkpointer },
  async (message: BaseMessage[], config: LangGraphRunnableConfig) => {
    // Step 1: Classify Intent
    // Determine which court availability agent to call, based on location and time
    const previous = (getPreviousState<any[]>() ?? []).map(toBaseMessage);
    const incoming = message.map(toBaseMessage);

    const messages = addMessages(previous, incoming);

    console.log(
      "history:",
      previous.map((m: any) => ({
        type: m._getType?.() ?? m.type,
        content: m.content,
      })),
    );

    const response = await classify(messages);

    console.log("response:", JSON.stringify(response, null, 2));

    console.log("isComplete: ", isComplete(response));

    return entrypoint.final({
      value: response,
      save: isComplete(response)
        ? []
        : addMessages(messages, [new AIMessage(response.aiResponse)]),
    });
  },
);

const isComplete = (intent: {
  slots: { location?: string; date?: string }[];
}): boolean => {
  return (
    intent?.slots?.length > 0 &&
    intent?.slots?.every((s) => s.location && s.date)
  );
};

function toBaseMessage(m: any): BaseMessage {
  switch (m.type ?? m._getType?.()) {
    case "ai":
      return new AIMessage(m.content);
    case "system":
      return new SystemMessage(m.content);
    default:
      return new HumanMessage(m.content);
  }
}
