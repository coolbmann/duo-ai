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
import { CourtAvailabilityService } from "../../services/booking-system/CourtAvailabilityService";
import { summariseAvailabilities } from "../tasks/summariseAvailabilities";
import { BookingSystemVenueMap } from "../../utils/enums";

const checkpointer = new MemorySaver();

export const clearAgentMemory = (threadId: string) => {
  console.log("before:", Object.keys(checkpointer.storage));
  delete checkpointer.storage[threadId];
  console.log("after:", Object.keys(checkpointer.storage));
};

const courtAvailabilityService = new CourtAvailabilityService();

export const courtAvailabilityAgent = entrypoint(
  { name: "courtAvailability", checkpointer },
  async (message: BaseMessage[], config: LangGraphRunnableConfig) => {
    // Step 0: GET current agent run_count and increment it. No need to await this.
    courtAvailabilityService.incrementAgentRunCount();

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

    console.log(
      "isLocationAndDateIntentFound: ",
      isLocationAndDateIntentFound(response),
    );

    // Step 2: Call API and normalise data
    if (isLocationAndDateIntentFound(response)) {
      const availabilities =
        await courtAvailabilityService.getCourtAvailabilities(response.slots);

      const availabilitiesResponse = await summariseAvailabilities(
        messages,
        availabilities.minimised,
      );

      // Step 3: Generate booking details
      if (availabilitiesResponse.selectedCourtTimeslotId) {
        const bookingDetails =
          await courtAvailabilityService.generateBookingDetails(
            availabilitiesResponse.selectedCourtTimeslotId,
            availabilities.raw,
          );

        // @ts-ignore
        const response = `The timeslot for ${bookingDetails?.court} at ${bookingDetails?.time} is available. \n\nHere is your booking URL: [${BookingSystemVenueMap[bookingDetails.venue]?.venueName} (${bookingDetails?.court})](${bookingDetails?.bookingUrl})`;

        return entrypoint.final({
          value: {
            aiResponse: response,
          },
          save: addMessages(messages, [new AIMessage(response)]),
        });
      }

      return entrypoint.final({
        value: availabilitiesResponse,
        save: addMessages(messages, [
          new AIMessage(availabilitiesResponse.aiResponse),
        ]),
      });
    }

    return entrypoint.final({
      value: response,
      save: addMessages(messages, [new AIMessage(response.aiResponse)]),
    });
  },
);

const isLocationAndDateIntentFound = (intent: {
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
