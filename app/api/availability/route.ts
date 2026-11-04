import { NextResponse } from "next/server";
import { isValidStay } from "@/lib/booking/dates";
import { getAvailability } from "@/lib/booking/store";

export const dynamic = "force-dynamic";

export const GET = (request: Request) => {
  const { searchParams } = new URL(request.url);
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";

  if (!isValidStay(checkIn, checkOut)) {
    return NextResponse.json({ error: "Invalid checkIn/checkOut" }, { status: 400 });
  }

  return NextResponse.json(getAvailability(checkIn, checkOut));
};
