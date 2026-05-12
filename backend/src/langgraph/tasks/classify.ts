import { task } from "@langchain/langgraph";
import { openAIService } from "../../lib/openAI";
import { BookingSystemVenueMap } from "../../utils/enums";
import { BaseMessage, SystemMessage } from "@langchain/core/messages";
import dayjs from "dayjs";

const intentModel = openAIService.withStructuredOutput(
  {
    type: "object",
    additionalProperties: false,
    properties: {
      slots: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            location: {
              type: ["string", "null"],
              enum: [...Object.keys(BookingSystemVenueMap), null],
            },
            date: {
              type: ["string", "null"],
              description: "Date in YYYYMMDD format, e.g. 20260511",
            },
          },
          required: ["location", "date"],
        },
      },
      aiResponse: {
        type: "string",
        description: "Response from the AI",
      },
    },
    required: ["slots", "aiResponse"],
  },
  { name: "intent", strict: true },
);

export const classify = task("classify", async (messages: BaseMessage[]) => {
  const labels = [
    "today",
    "tomorrow",
    "in 2 days",
    "in 3 days",
    "in 4 days",
    "in 5 days",
    "in 6 days",
  ];

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = dayjs().add(i, "day");
    return `${labels[i]} (${date.format("dddd")}) is ${date.format("YYYY-MM-DD")}`;
  });

  const datePreamble = next7Days.join(", ");
  // "today (Tuesday) is 2026-05-12, tomorrow (Wednesday) is 2026-05-13..."

  const venues = [
    {
      venueName: "willoughby",
      suburb: "Willoughby",
      lat: -33.78706933480015,
      lng: 151.20180976550753,
    },
    {
      venueName: "seaforth",
      suburb: "Seaforth",
      lat: -33.78107628593834,
      lng: 151.24451321254804,
    },
  ];

  const venueList = venues
    .map((v) => `- ${v.venueName} (${v.suburb}, lat: ${v.lat}, lng: ${v.lng})`)
    .join("\n");

  const systemPrompt = `Today's date is ${datePreamble}. For all date requests, convert to AEST or AEDT timezone.

    Your objective is to extract the booking intent from the user's message and return a JSON array of location/date pairs.

    Available venues:
    ${venueList}

    When the user mentions a suburb or area, pick the closest venue(s) by coordinates.

    Rules:
    - Return between 1 and 3 results, ordered by relevance/proximity
    - Never return more than 3 results, the less the better
    - The date should be in YYYYMMDD format
    - The location should be the venueName from the venue list above

    CRITICAL - MISSING INFORMATION RULES:
    - If location is missing: you MUST ask the user for their preferred location. Do NOT proceed.
    - If date is missing: you MUST ask the user for their preferred date. Do NOT proceed.
    - Only when BOTH location AND date are present for every slot should you confirm and proceed.
    - If any slot has a null location or null date, the aiResponse MUST ask for the missing information.

    aiResponse rules:
    - If any information is missing: ask ONLY for the missing field(s). Do not confirm anything.
    - If all information is present: confirm the location(s) and date(s) and say you will proceed to find availability.
    - Never say you will find courts if any slot has a null field.
    `;

  const result = await intentModel.invoke([
    new SystemMessage(systemPrompt),
    ...messages,
  ]);

  return {
    slots: result.slots ?? [],
    aiResponse: result.aiResponse ?? "",
  };
});
