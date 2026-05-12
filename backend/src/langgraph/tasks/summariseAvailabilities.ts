import { task } from "@langchain/langgraph";
import { MinimisedAvailabilityGroup } from "../../services/booking-system/CourtAvailabilityService";
import { openAIService } from "../../lib/openAI";
import { BaseMessage, SystemMessage } from "@langchain/core/messages";

const summariseAvailabilitiesLLMCall = openAIService.withStructuredOutput(
  {
    type: "object",
    additionalProperties: false,
    properties: {
      // slots: {
      //   type: "array",
      //   items: {
      //     type: "object",
      //     additionalProperties: false,
      //     properties: {
      //       location: {
      //         type: ["string", "null"],
      //         enum: [...Object.keys(BookingSystemVenueMap), null],
      //       },
      //       date: {
      //         type: ["string", "null"],
      //         description: "Date in YYYYMMDD format, e.g. 20260511",
      //       },
      //     },
      //     required: ["location", "date"],
      //   },
      // },
      selectedCourtTimeslotId: {
        type: ["number", "null"],
        description: "The id of the court timeslot that the user has selected",
      },
      aiResponse: {
        type: "string",
        description: "Response from the AI",
      },
    },
    required: ["selectedCourtTimeslotId", "aiResponse"],
  },
  { name: "summariseAvailabilites", strict: true },
);

export const summariseAvailabilities = task(
  "summariseAvailabilities",
  async (
    messages: BaseMessage[],
    availabilities: MinimisedAvailabilityGroup[],
  ) => {
    console.log(
      "availabilities passed in:",
      JSON.stringify(availabilities, null, 2),
    );
    console.log(
      "messages passed in:",
      messages.map((m: any) => ({
        type: m._getType?.() ?? m.type,
        content: m.content,
      })),
    );
    const systemPrompt = `You are a court booking assistant. You have been provided with real-time court availability data below. 
      Use ONLY this data to answer the user. Do not invent or reference any other data.
      Do not use any information from previous AI responses in the conversation — those may be stale or incorrect.
      The ONLY source of truth for availability is the data provided below.

      IMPORTANT: All times in the data are in 24-hour format. When the user says "9PM" that is 21:00, "6PM" is 18:00, etc.

      PROXIMITY Rules:
      - There is always a venue near the desired location. We have filtered the availabilities as such.

      CRITICAL:
      - If no timeslots are available, say so and suggest timeslots within 2 hours that are available.
      - If there is more than one court available for the desired timeslot, ask the user to choose a court.
      - You must always check the availabilities in this system prompt before answering the user.
      - If the user asks about another court, return selectedCourtTimeslotId as null. Only return the id of the timeslot if the user has been specific about which court and timeslot they want.
      - You should always mention the venue name(s) for the courts and times you are referring to.

      CRITICAL - Selected Court Timeslot ID:
      - If the user has been specific about which court and timeslot they want, provide the id of the timeslot.
      - DO NOT infer their selection, pass null if no timeslot has been selected.
      - If the selected timeslot is not available, say so and suggest timeslots within 2 hours, that are available.

      Formatting Rules:
      - Always use markdown formatting in the aiResponse. Do not use HTML tags.

      Response Rules:
      - Make sure your response does not contradict itself. For example, don't say there are no courts if you then provide availabilities.
    
      Availabilities:
      ${JSON.stringify(availabilities, null, 2)}`;

    console.log("systemPrompt: ", systemPrompt);

    const result = await summariseAvailabilitiesLLMCall.invoke([
      new SystemMessage(systemPrompt),
      ...messages,
    ]);

    console.log("sumariseTaskResult: ", JSON.stringify(result, null, 2));

    return {
      aiResponse: result.aiResponse ?? "",
      selectedCourtTimeslotId: result.selectedCourtTimeslotId ?? null,
    };
  },
);
