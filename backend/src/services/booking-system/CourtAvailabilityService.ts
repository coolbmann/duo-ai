import { VoyagerAPIService } from "./VoyagerAPIService";
import { type BookingSystemService } from "./BookingSystemService";
import { BookingSystemValue, BookingSystemVenueMap } from "../../utils/enums";
import { supabase } from "../../lib/supabase";

export class CourtAvailabilityService {
  private services: Record<BookingSystemValue, BookingSystemService | null>;

  constructor() {
    this.services = {
      voyager: new VoyagerAPIService("https://www.tennisvenues.com.au"),
      playtomic: null,
      playbypoint: null,
    };
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
        const { bookingSystem } = BookingSystemVenueMap[param.location];
        const service = this.services[bookingSystem];
        if (!service) return [];
        return service.getCourtAvailabilities({
          venueName: param.location,
          date: param.date,
        });
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
    venue: string;
  } | null> {
    const selectedCourtAvailabilitySlot = rawCourtAvailabilitySlots.find(
      (slot) => slot.id === selectedCourtTimeslotId,
    );

    if (!selectedCourtAvailabilitySlot) {
      return null;
    }

    const { bookingSystem } = selectedCourtAvailabilitySlot;
    const service = this.services[bookingSystem];

    if (!service) return null;

    return {
      bookingUrl: service.generateBookingUrl(selectedCourtAvailabilitySlot),
      date: selectedCourtAvailabilitySlot.date,
      time: selectedCourtAvailabilitySlot.time,
      court: selectedCourtAvailabilitySlot.court,
      venue: selectedCourtAvailabilitySlot.venue,
    };
  }

  private minimiseCourtAvailabilityResultForAI(
    availabilitySlots: CourtAvailabilitySlot[],
  ): MinimisedAvailabilityGroup[] {
    const groupMap = new Map<string, MinimisedAvailabilityGroup>();

    for (const slot of availabilitySlots) {
      const key = `${slot.date}|${slot.venue}|${slot.bookingSystem}`;
      if (!groupMap.has(key)) {
        groupMap.set(key, {
          id: Number(BookingSystemVenueMap[slot.venue].id),
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
        .slots.push({
          id: slot.id ?? null,
          time: slot.time,
          court: slot.court,
        });
    }

    return Array.from(groupMap.values());
  }

  public async incrementAgentRunCount(
    agentName: string = "court-booking-agent",
  ) {
    const data = await this.getAgentDataByName(agentName);

    console.log("data: ", data);

    await this.patchAgentDataByName(agentName, {
      run_count: data.run_count + 1,
    });

    return { run_count: data.run_count + 1 };
  }

  public async getAgentDataByName(agentName: string) {
    try {
      const { data, error } = await supabase
        .from("agent")
        .select("*")
        .eq("name", agentName)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(
        `Error getting ${agentName} run count: ${JSON.stringify(error)}`,
      );
      return 0;
    }
  }

  private async patchAgentDataByName(agentName: string, data: any) {
    try {
      await supabase.from("agent").update(data).eq("name", agentName);
    } catch (error) {
      console.error(
        `Error patching ${agentName} data: ${JSON.stringify(error)}`,
      );
    }
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
  slots: { id: number | null; time: string; court: string }[];
};

export interface AvailabilityAPIParams {
  location: keyof typeof BookingSystemVenueMap;
  date: string;
}
