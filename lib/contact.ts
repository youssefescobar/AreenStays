import { hotel } from "@/content/site";

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${hotel.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telUrl = `tel:${hotel.phone.replace(/\s/g, "")}`;
