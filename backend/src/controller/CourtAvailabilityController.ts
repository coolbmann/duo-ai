import { CourtAvailabilityService } from "../services/booking-system/CourtAvailabilityService";
import { JsonController } from "routing-controllers";
import { Get, Body, Post } from "routing-controllers";
import { AvailabilityAPIParams } from "../services/booking-system/CourtAvailabilityService";

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
}
