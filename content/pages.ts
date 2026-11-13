import type { T } from "@/lib/i18n";
import { stock } from "./stock";

/** Copy for the inner pages. Each page reads its block from here. */
export const pages = {
  rooms: {
    image: stock.room2,
    eyebrow: { en: "Stay", ar: "الإقامة" },
    title: { en: "Rooms", ar: "الغرف" },
    intro: {
      en: "Every room comes with fast Wi-Fi, a prayer mat and Qibla direction, and 24-hour room service.",
      ar: "تتضمن كل غرفة إنترنت سريعاً وسجادة صلاة واتجاه القبلة وخدمة غرف على مدار الساعة.",
    },
    floors: {
      eyebrow: { en: "Layout", ar: "التوزيع" },
      title: { en: "Rooms by floor", ar: "الغرف حسب الطابق" },
      intro: {
        en: "Every room number by floor and room type. Exact room numbers are confirmed when we reply on WhatsApp.",
        ar: "أرقام الغرف حسب الطابق ونوع الغرفة. يتم تأكيد رقم الغرفة عند ردنا على واتساب.",
      },
    },
  },
  dining: {
    image: stock.restaurant2,
    eyebrow: { en: "Dining", ar: "المطاعم" },
    title: { en: "Dining at Areen", ar: "المطاعم في أرين" },
    intro: {
      en: "Saudi breakfast, all-day dining, Arabic coffee and in-room dining around the clock.",
      ar: "فطور سعودي، ومطعم طوال اليوم، وقهوة عربية، وطعام في الغرفة على مدار الساعة.",
    },
  },
  offers: {
    image: stock.pool,
    eyebrow: { en: "Offers", ar: "العروض" },
    title: { en: "Special offers", ar: "العروض الخاصة" },
    intro: { en: "Book directly with us for the best rate.", ar: "احجز مباشرة معنا لتحصل على أفضل سعر." },
  },
  gallery: {
    image: stock.lobby2,
    eyebrow: { en: "Gallery", ar: "معرض الصور" },
    title: { en: "A look inside Areen", ar: "نظرة داخل أرين" },
    intro: { en: "Photos of the hotel are coming soon.", ar: "صور الفندق قريباً." },
    items: [
      { en: "Lobby", ar: "الردهة", image: stock.lobby },
      { en: "King Room", ar: "غرفة بسرير كبير", image: stock.room1 },
      { en: "Twin Room", ar: "غرفة بسريرين", image: stock.room6 },
      { en: "Al Basateen Restaurant", ar: "مطعم البساتين", image: stock.restaurant },
      { en: "Crystal Lounge", ar: "صالة كريستال", image: stock.coffee },
      { en: "Guest bathroom", ar: "حمام الضيوف", image: stock.bath },
      { en: "Building at night", ar: "المبنى ليلاً", image: stock.exteriorNight },
      { en: "Bedroom detail", ar: "تفاصيل غرفة النوم", image: stock.bedroom },
    ] as (T & { image?: string })[],
  },
  location: {
    image: stock.exterior,
    eyebrow: { en: "Location & contact", ar: "الموقع والتواصل" },
    title: { en: "Find us in Al Basateen", ar: "تجدنا في حي البساتين" },
    intro: {
      en: "In Al Basateen, north Jeddah: minutes from the Obhur beaches and the North Corniche, and about 20 minutes from the airport.",
      ar: "في حي البساتين شمال جدة: دقائق من شواطئ أبحر والكورنيش الشمالي، وحوالي ٢٠ دقيقة من المطار.",
    },
    // Driving distance and time without traffic (OpenStreetMap routing from the hotel pin, Nov 2026).
    distances: [
      { place: { en: "Supermarket, pharmacy, ATM & McDonald's", ar: "سوبرماركت وصيدلية وصراف آلي وماكدونالدز" }, time: { en: "On foot", ar: "سيراً" }, km: 0.3 },
      { place: { en: "Dr. Soliman Fakeeh Hospital", ar: "مستشفى الدكتور سليمان فقيه" }, time: { en: "5 min", ar: "٥ دقائق" }, km: 3.6 },
      { place: { en: "Obhur beaches & North Corniche", ar: "شواطئ أبحر والكورنيش الشمالي" }, time: { en: "7 min", ar: "٧ دقائق" }, km: 7.6 },
      { place: { en: "Red Sea Mall", ar: "رد سي مول" }, time: { en: "9 min", ar: "٩ دقائق" }, km: 9.5 },
      { place: { en: "Haramain train, Airport station", ar: "قطار الحرمين، محطة المطار" }, time: { en: "16 min", ar: "١٦ دقيقة" }, km: 16.7 },
      { place: { en: "King Abdulaziz International Airport", ar: "مطار الملك عبدالعزيز الدولي" }, time: { en: "23 min", ar: "٢٣ دقيقة" }, km: 17.5 },
      { place: { en: "Al Balad (historic Jeddah)", ar: "البلد (جدة التاريخية)" }, time: { en: "22 min", ar: "٢٢ دقيقة" }, km: 25.6 },
      { place: { en: "Makkah, Masjid Al Haram", ar: "مكة المكرمة، المسجد الحرام" }, time: { en: "70 min", ar: "٧٠ دقيقة" }, km: 100 },
    ],
    note: { en: "Driving times without traffic. Allow extra time at rush hour.", ar: "أوقات القيادة دون ازدحام. يُرجى إضافة وقت في أوقات الذروة." },
  },
  umrah: {
    image: stock.lobby,
    eyebrow: { en: "Umrah stays", ar: "إقامة العمرة" },
    title: { en: "Rest well between your visits", ar: "راحة تامة بين زياراتك" },
    intro: {
      en: "Areen is an easy base for pilgrims arriving in Jeddah: close to the airport and the Haramain train, with a calm room waiting whenever you land.",
      ar: "أرين محطة مريحة للمعتمرين القادمين إلى جدة: قريب من المطار وقطار الحرمين، وغرفة هادئة بانتظارك متى وصلت.",
    },
    features: [
      { title: { en: "Flexible check-in", ar: "وصول مرن" }, text: { en: "Early arrival and late departure around your flights.", ar: "وصول مبكر ومغادرة متأخرة حسب مواعيد رحلتك." }, image: stock.lobby2 },
      { title: { en: "Transfers to Makkah", ar: "تنقلات إلى مكة" }, text: { en: "Private cars to Masjid Al Haram and back, on request.", ar: "سيارات خاصة إلى المسجد الحرام والعودة عند الطلب." }, image: stock.room4 },
      { title: { en: "Ihram-ready rooms", ar: "غرف مهيأة للإحرام" }, text: { en: "Unscented amenities, prayer mats and Qibla direction.", ar: "مستلزمات بلا عطور وسجاد صلاة واتجاه القبلة." }, image: stock.bedroom },
      { title: { en: "Suhoor & iftar", ar: "سحور وإفطار" }, text: { en: "Ramadan menus and in-room dining at any hour.", ar: "قوائم رمضانية وطعام في الغرفة في أي وقت." }, image: stock.restaurant3 },
      { title: { en: "Luggage storage", ar: "حفظ الأمتعة" }, text: { en: "Leave bags with us while you travel to Makkah or Madinah.", ar: "اترك أمتعتك لدينا أثناء سفرك إلى مكة أو المدينة." }, image: stock.lobby },
      { title: { en: "Group bookings", ar: "حجوزات المجموعات" }, text: { en: "Blocks of rooms for families and Umrah groups.", ar: "مجموعات غرف للعائلات ومجموعات العمرة." }, image: stock.exterior },
    ],
  },
};
