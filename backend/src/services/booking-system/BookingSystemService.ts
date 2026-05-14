import type { CourtAvailabilitySlot } from "./CourtAvailabilityService";
import type {
  BookingSystemValue,
  BookingSystemVenueMap,
} from "../../utils/enums";
import { supabase } from "../../lib/supabase";

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

  public async updateBookingSystemLastAccessed(
    bookingSystemName: BookingSystemValue,
  ) {
    try {
      await supabase
        .from("booking_system")
        .update({ last_accessed: new Date().toISOString() })
        .eq("name", bookingSystemName);
    } catch (error) {
      console.error(
        `Error patching ${bookingSystemName} data: ${JSON.stringify(error)}`,
      );
    }
  }
}
