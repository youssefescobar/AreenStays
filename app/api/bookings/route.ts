import { NextResponse } from "next/server";
import { createBooking, pickAnySlug } from "@/lib/booking/store";
import type { CreateBookingRequest } from "@/lib/booking/types";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
  let body: CreateBookingRequest;
  try {
    body = (await request.json()) as CreateBookingRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { checkIn, checkOut, guests, locale } = body;
  let { slug } = body;

  if (!slug) {
    const picked = pickAnySlug(checkIn, checkOut);
    if (!picked) {
      return NextResponse.json({ error: "Fully booked" }, { status: 409 });
    }
    slug = picked;
  }

  try {
    const booking = createBooking({ checkIn, checkOut, slug, guests, locale });
    return NextResponse.json(booking, { status: 201 });
  } catch (e) {
    const err = e as Error & { code?: string };
    if (err.code === "FULL") {
      return NextResponse.json({ error: "Fully booked" }, { status: 409 });
    }
    return NextResponse.json({ error: err.message || "Bad request" }, { status: 400 });
  }
};
