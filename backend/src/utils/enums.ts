const BookingSystem = {
  VOYAGER: "voyager",
  PLAYTOMIC: "playtomic",
  PLAYBYPOINT: "playbypoint",
} as const;

export type BookingSystemValue =
  (typeof BookingSystem)[keyof typeof BookingSystem];

const BookingSystemVenueMap = {
  "willis-park-pickleball": {
    id: "willis-park-pickleball",
    venueName: "Voyager Tennis - Willoughby",
    bookingSystem: BookingSystem.VOYAGER,
    suburb: "Willoughby",
    lat: -33.78706933480015,
    lng: 151.20180976550753,
  },
  "seaforth-pickleball": {
    id: "seaforth-pickleball",
    venueName: "Voyager Tennis - Seaforth (Wakehurst)",
    bookingSystem: BookingSystem.VOYAGER,
    suburb: "Seaforth",
    lat: -33.78107628593834,
    lng: 151.24451321254804,
  },
};

export { BookingSystem, BookingSystemVenueMap };
