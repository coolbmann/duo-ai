import { entrypoint } from "@langchain/langgraph";

export const courtAvailabilityAgent = entrypoint(
  "courtAvailability",
  async () => {
    // Step 1: Classify Intent
    // Determine which court availability agent to call, based on location and time
    // If there is not enough information, repeat step while chaining prompt context
    // Step 2: Call API and normalise data
    // Clean and strip unnecessary data before passing to AI
    // Step 3: Pass prompt to AI and ask for summary of availabilities
    // Return object shape for top 4 results
    // Also return summary of other availabilities or lack thereof
  },
);
