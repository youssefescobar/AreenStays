/** Inclusive start, exclusive end — hotel nights [checkIn, checkOut). */
export const rangesOverlap = (aStart: string, aEnd: string, bStart: string, bEnd: string) =>
  aStart < bEnd && bStart < aEnd;

export const isValidStay = (checkIn: string, checkOut: string) =>
  Boolean(checkIn && checkOut && checkOut > checkIn);

/** Each calendar night of the stay as YYYY-MM-DD (checkOut night not included). */
export const nightsOf = (checkIn: string, checkOut: string): string[] => {
  const nights: string[] = [];
  const cursor = new Date(`${checkIn}T12:00:00Z`);
  const end = new Date(`${checkOut}T12:00:00Z`);
  while (cursor < end) {
    nights.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return nights;
};
