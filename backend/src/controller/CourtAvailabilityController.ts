import {
  CourtAvailabilityService,
  AvailabilityAPIParams,
} from "../services/booking-system/CourtAvailabilityService";
import { JsonController, Body, Post } from "routing-controllers";
import { courtAvailabilityAgent } from "../langgraph/entrypoints/courtAvailabilityAgent";
import { BaseMessage, HumanMessage } from "@langchain/core/messages";

@JsonController("/court-availability")
export class CourtAvailabilityController {
  private courtAvailabilityService: CourtAvailabilityService;

  constructor() {
    this.courtAvailabilityService = new CourtAvailabilityService();
  }

  @Post("/")
  public async getCourtAvailabilities(
    @Body() availabilityAPIParams: AvailabilityAPIParams[],
  ): Promise<any> {
    return await this.courtAvailabilityService.getCourtAvailabilities(
      availabilityAPIParams,
    );
  }

  @Post("/langgraph")
  public async getCourtAvailabilitiesLanggraph(
    @Body() body: { message: string },
  ): Promise<any> {
    const config = { configurable: { thread_id: "7" } };
    const baseMessage = new HumanMessage(body.message);

    return await courtAvailabilityAgent.invoke([baseMessage], config);
  }
}
