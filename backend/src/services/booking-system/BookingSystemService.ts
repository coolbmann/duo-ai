import type { CourtAvailabilitySlot } from "./CourtAvailabilityService";
import type { BookingSystemVenueMap } from "../../utils/enums";

export interface AvailabilitySearchParams {
  venueName: keyof typeof BookingSystemVenueMap;
  date: string;
  apiVersion?: string;
}

export abstract class BookingSystemService {
  abstract getCourtAvailabilities(
    params: AvailabilitySearchParams,
  ): Promise<CourtAvailabilitySlot[]>;

  abstract generateBookingUrl(timeslot: CourtAvailabilitySlot): string;
}
