import { VoyagerAPIService } from "./VoyagerAPIService";
import {
  BookingSystem,
  BookingSystemValue,
  BookingSystemVenueMap,
} from "../../utils/enums";
import { pick } from "lodash";

export class CourtAvailabilityService {
  private voyagerAPIService: VoyagerAPIService;
  constructor() {
    this.voyagerAPIService = new VoyagerAPIService(
      "https://www.tennisvenues.com.au",
    );
  }

  public async getCourtAvailabilities(
    availabilityAPIParams: AvailabilityAPIParams[],
  ): Promise<
    Pick<CourtAvailabilitySlot, "date" | "time" | "venue" | "court">[] | []
  > {
    const result = await Promise.all(
      availabilityAPIParams.map(async (param) => {
        console.log("param: ", param);
        switch (BookingSystemVenueMap[param.venueName].bookingSystem) {
          case BookingSystem.VOYAGER:
            return this.voyagerAPIService.getCourtAvailabilities({
              venueName: param.venueName,
              date: param.date,
            });
          default:
            return [];
        }
      }),
    );

    return this.minimiseCourtAvailabilityResultForAI(result.flat());
  }

  private minimiseCourtAvailabilityResultForAI(
    availabilitySlots: CourtAvailabilitySlot[],
  ): Pick<CourtAvailabilitySlot, "date" | "time" | "venue" | "court">[] {
    return availabilitySlots.map((slot) => {
      return pick(slot, ["date", "time", "venue", "court", "bookingSystem"]);
    });
  }
}

export type CourtAvailabilitySlot = {
  date: string;
  time: string;
  venue: string;
  court: string;
  bookingSystem: BookingSystemValue;
  available?: boolean;
  booking_url?: string;
};

export interface AvailabilityAPIParams {
  venueName: keyof typeof BookingSystemVenueMap;
  date: string;
}
