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
  ): Promise<{
    raw: CourtAvailabilitySlot[];
    minimised: MinimisedAvailabilityGroup[];
  }> {
    const result = await Promise.all(
      availabilityAPIParams.map(async (param) => {
        console.log("param: ", param);
        switch (BookingSystemVenueMap[param.location].bookingSystem) {
          case BookingSystem.VOYAGER:
            return this.voyagerAPIService.getCourtAvailabilities({
              venueName: param.location,
              date: param.date,
            });
          default:
            return [];
        }
      }),
    );

    let id = 0;
    const flattened = result.flatMap((group) =>
      group.map((item) => ({ ...item, id: id++ })),
    );

    return {
      raw: flattened,
      minimised: this.minimiseCourtAvailabilityResultForAI(flattened),
    };
  }

  public async generateBookingDetails(
    selectedCourtTimeslotId: number,
    rawCourtAvailabilitySlots: CourtAvailabilitySlot[],
  ): Promise<{
    bookingUrl: string;
    date: string;
    time: string;
    court: string;
  }> {
    const selectedCourtAvailabilitySlot = rawCourtAvailabilitySlots.find(
      (slot) => slot.id === selectedCourtTimeslotId,
    );

    if (!selectedCourtAvailabilitySlot) {
      return null;
    }

    const { bookingSystem } = selectedCourtAvailabilitySlot;

    switch (bookingSystem) {
      case BookingSystem.VOYAGER:
        return {
          bookingUrl: this.voyagerAPIService.generateBookingUrl(
            selectedCourtAvailabilitySlot,
          ),
          date: selectedCourtAvailabilitySlot.date,
          time: selectedCourtAvailabilitySlot.time,
          court: selectedCourtAvailabilitySlot.court,
        };
      default:
        return null;
    }
  }

  private minimiseCourtAvailabilityResultForAI(
    availabilitySlots: CourtAvailabilitySlot[],
  ): MinimisedAvailabilityGroup[] {
    const groupMap = new Map<string, MinimisedAvailabilityGroup>();

    for (const slot of availabilitySlots) {
      const key = `${slot.date}|${slot.venue}|${slot.bookingSystem}`;
      if (!groupMap.has(key)) {
        groupMap.set(key, {
          id: BookingSystemVenueMap[slot.venue].id,
          venueName: BookingSystemVenueMap[slot.venue].venueName,
          suburb: BookingSystemVenueMap[slot.venue].suburb,
          lat: BookingSystemVenueMap[slot.venue].lat,
          lng: BookingSystemVenueMap[slot.venue].lng,
          date: slot.date,
          bookingSystem: BookingSystemVenueMap[slot.venue].bookingSystem,
          slots: [],
        });
      }
      groupMap
        .get(key)!
        .slots.push({ id: slot.id, time: slot.time, court: slot.court });
    }

    return Array.from(groupMap.values());
  }
}

export type CourtAvailabilitySlot = {
  id: number | null;
  rawDate: string;
  rawTime: string;
  date: string;
  time: string;
  venue: string;
  court: string;
  courtId: string;
  bookingSystem: BookingSystemValue;
  booking_url?: string;
};

export type MinimisedAvailabilityGroup = {
  id: number;
  venueName: string;
  bookingSystem: BookingSystemValue;
  suburb: string;
  lat: number;
  lng: number;
  date: string;
  slots: { id: number; time: string; court: string }[];
};

export interface AvailabilityAPIParams {
  location: keyof typeof BookingSystemVenueMap;
  date: string;
}
