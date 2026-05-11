import * as cheerio from "cheerio";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";
import type { CourtAvailabilitySlot } from "./CourtAvailabilityService";
import { BookingSystem, BookingSystemVenueMap } from "../../utils/enums";

dayjs.extend(customParseFormat);

export class VoyagerAPIService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    //https://www.tennisvenues.com.au
  }

  public async getCourtAvailabilities({
    venueName,
    date,
    apiVersion,
  }: AvailabilitySearchParamsType): Promise<CourtAvailabilitySlot[]> {
    console.log("getCourtAvailabilities: ", venueName);
    console.log("date: ", date);
    console.log("apiVersion: ", apiVersion);
    const availabilityHtml = await this.fetchCourtAvailability(
      venueName,
      date,
      apiVersion,
    );

    return this.normalizeCourtAvailability(availabilityHtml);
  }

  private async fetchCourtAvailability(
    venueName: keyof typeof BookingSystemVenueMap,
    date: string, // YYYYMMDD format,
    apiVersion: string = "v4",
  ): Promise<string> {
    const url = `${this.baseUrl}/booking/${BookingSystemVenueMap[venueName].venueName}/fetch-booking-data?view=${apiVersion}&date=${date}`;

    const response = await axios.get(url);
    return response.data;
  }

  private normalizeCourtAvailability(availabilityHtml: string) {
    const $ = cheerio.load(availabilityHtml);
    const slots: CourtAvailabilitySlot[] = [];

    const courtNames: string[] = [];
    $("#v4_grid thead th.v4-court-col").each((_, th) => {
      courtNames.push($(th).text().trim());
    });

    $("#v4_grid tbody tr").each((_, row) => {
      $(row)
        .find("td.v4-court-col")
        .each((_, cell) => {
          const $cell = $(cell);

          const courtIndex = parseInt($cell.attr("data-court-index") ?? "", 10);
          if (isNaN(courtIndex) || courtIndex >= courtNames.length) return;

          const courtName = courtNames[courtIndex];
          const isAvailable = $cell.hasClass("v4-slot-available");

          if (isAvailable) {
            const href = $cell.find("a").attr("href") ?? "";
            const params = new URLSearchParams(href?.split("?")[1] ?? "");

            const date = dayjs(params.get("d"), "YYYYMMDD").format(
              "YYYY-MM-DD",
            );
            const time = dayjs(params.get("t"), "HHmm").format("HH:mm");
            const venue = params.get("v") ?? "";

            slots.push({
              date,
              time,
              venue,
              court: courtName,
              bookingSystem: BookingSystem.VOYAGER,
              // available: true,
              // booking_url: href,
            });
          }
        });
    });

    return slots;
  }
}

interface AvailabilitySearchParamsType {
  venueName: keyof typeof BookingSystemVenueMap;
  date: string;
  apiVersion?: string;
}
