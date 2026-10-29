import type { T } from "@/lib/i18n";
import { stock } from "./stock";

/** Copy for the inner pages. Each page reads its block from here. */
export const pages = {
  rooms: {
    image: stock.room2,
    eyebrow: { en: "Stay", ar: "الإقامة" },
    title: { en: "Rooms & Suites", ar: "الغرف والأجنحة" },
    intro: {
      en: "Every room comes with fast Wi-Fi, a prayer mat and Qibla direction, and 24-hour room service.",
      ar: "تتضمن كل غرفة إنترنت سريعاً وسجادة صلاة واتجاه القبلة وخدمة غرف على مدار الساعة.",
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
      { en: "Deluxe Room", ar: "غرفة ديلوكس", image: stock.room1 },
      { en: "Executive Suite", ar: "الجناح التنفيذي", image: stock.room2 },
      { en: "Al Basateen Restaurant", ar: "مطعم البساتين", image: stock.restaurant },
      { en: "Crystal Lounge", ar: "صالة كريستال", image: stock.coffee },
      { en: "Family Suite", ar: "الجناح العائلي", image: stock.room3 },
      { en: "Meeting room", ar: "قاعة الاجتماعات", image: stock.meeting },
      { en: "Building at night", ar: "المبنى ليلاً", image: stock.exteriorNight },
      { en: "Royal Suite majlis", ar: "مجلس الجناح الملكي", image: stock.room7 },
    ] as (T & { image?: string })[],
  },
  location: {
    image: stock.exterior,
    eyebrow: { en: "Location & contact", ar: "الموقع والتواصل" },
    title: { en: "Find us in Al Basateen", ar: "تجدنا في حي البساتين" },
    intro: {
      en: "A quiet district in north Jeddah, close to the airport and the road to Makkah.",
      ar: "حي هادئ شمال جدة، قريب من المطار وطريق مكة المكرمة.",
    },
    distances: [
      { place: { en: "King Abdulaziz International Airport", ar: "مطار الملك عبدالعزيز الدولي" }, time: { en: "15 min", ar: "١٥ دقيقة" } },
      { place: { en: "Al Haramain Railway, Jeddah station", ar: "قطار الحرمين، محطة جدة" }, time: { en: "20 min", ar: "٢٠ دقيقة" } },
      { place: { en: "Makkah, Masjid Al Haram", ar: "مكة المكرمة، المسجد الحرام" }, time: { en: "60 min", ar: "٦٠ دقيقة" } },
      { place: { en: "Al Balad (historic Jeddah)", ar: "البلد (جدة التاريخية)" }, time: { en: "25 min", ar: "٢٥ دقيقة" } },
      { place: { en: "Jeddah Corniche", ar: "كورنيش جدة" }, time: { en: "20 min", ar: "٢٠ دقيقة" } },
    ],
    note: { en: "Drive times are estimates. TODO: confirm with the hotel.", ar: "الأوقات تقديرية." },
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
  corporate: {
    image: stock.meeting,
    eyebrow: { en: "Business & events", ar: "الأعمال والمناسبات" },
    title: { en: "Meet, host and stay", ar: "اجتمع واستضف وأقِم" },
    intro: {
      en: "Meeting rooms, corporate rates and private dining for teams and families celebrating in Jeddah.",
      ar: "قاعات اجتماعات وأسعار للشركات وولائم خاصة للفرق والعائلات المحتفلة في جدة.",
    },
    features: [
      { title: { en: "Meeting rooms", ar: "قاعات الاجتماعات" }, text: { en: "Up to 40 guests, with screen, sound and coffee breaks.", ar: "حتى ٤٠ ضيفاً، مع شاشة وصوت واستراحات قهوة." }, image: stock.meeting },
      { title: { en: "Corporate rates", ar: "أسعار الشركات" }, text: { en: "Negotiated rates and monthly invoicing for companies.", ar: "أسعار تفاوضية وفوترة شهرية للشركات." }, image: stock.office },
      { title: { en: "Private dining", ar: "ولائم خاصة" }, text: { en: "Family gatherings, engagements and business dinners.", ar: "تجمعات عائلية وخطوبة وعشاء أعمال." }, image: stock.restaurant },
      { title: { en: "Long stays", ar: "إقامة طويلة" }, text: { en: "Weekly and monthly rates for project teams.", ar: "أسعار أسبوعية وشهرية لفرق المشاريع." }, image: stock.room5 },
    ],
    cta: { en: "Ask for a proposal", ar: "اطلب عرض سعر" },
  },
};
