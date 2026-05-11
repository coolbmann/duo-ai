const BookingSystem = {
  VOYAGER: "voyager",
  PLAYTOMIC: "playtomic",
  PLAYBYPOINT: "playbypoint",
} as const;

export type BookingSystemValue =
  (typeof BookingSystem)[keyof typeof BookingSystem];

const BookingSystemVenueMap = {
  willoughby: {
    venueName: "willis-park-pickleball",
    bookingSystem: BookingSystem.VOYAGER,
  },
  seaforth: {
    venueName: "seaforth-pickleball",
    bookingSystem: BookingSystem.VOYAGER,
  },
};

export { BookingSystem, BookingSystemVenueMap };
