import { VoyagerAPIService } from "./VoyagerAPIService";
import {
  BookingSystem,
  BookingSystemValue,
  BookingSystemVenueMap,
} from "../../utils/enums";

export class CourtAvailabilityService {
  private voyagerAPIService: VoyagerAPIService;
  constructor() {
    this.voyagerAPIService = new VoyagerAPIService(
      "https://www.tennisvenues.com.au",
    );
  }

  public async getCourtAvailabilities(
    availabilityAPIParams: AvailabilityAPIParams[],
  ): Promise<MinimisedAvailabilityGroup[]> {
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
  ): MinimisedAvailabilityGroup[] {
    const groupMap = new Map<string, MinimisedAvailabilityGroup>();
    let idCounter = 1;

    for (const slot of availabilitySlots) {
      const key = `${slot.date}|${slot.venue}|${slot.bookingSystem}`;
      if (!groupMap.has(key)) {
        groupMap.set(key, {
          date: slot.date,
          venue: slot.venue,
          bookingSystem: slot.bookingSystem,
          slots: [],
        });
      }
      groupMap.get(key)!.slots.push({ id: idCounter++, time: slot.time, court: slot.court });
    }

    return Array.from(groupMap.values());
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

export type MinimisedAvailabilityGroup = {
  date: string;
  venue: string;
  bookingSystem: BookingSystemValue;
  slots: { id: number; time: string; court: string }[];
};

export interface AvailabilityAPIParams {
  venueName: keyof typeof BookingSystemVenueMap;
  date: string;
}
