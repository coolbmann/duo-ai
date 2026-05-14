import { Get, JsonController, Param, QueryParam } from "routing-controllers";
import { CourtAvailabilityService } from "../services/booking-system/CourtAvailabilityService";

@JsonController("/agent")
export class AgentController {
  private courtAvailabilityService: CourtAvailabilityService;

  constructor() {
    this.courtAvailabilityService = new CourtAvailabilityService();
  }

  @Get("/:agentName")
  public async getAgentDataByName(@Param("agentName") agentName: string) {
    return await this.courtAvailabilityService.getAgentDataByName(agentName);
  }
}
