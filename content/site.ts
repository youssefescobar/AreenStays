/**
 * Hotel contact details and site-wide text. Edit here; every page reads from these files.
 * Values marked TODO are placeholders until the hotel confirms them.
 */
export const hotel = {
  name: { en: "Areen Albasateen Hotel", ar: "فندق أرين البساتين" },
  domain: "https://areenstay.com",
  phone: "+966 12 000 0000", // TODO real number
  whatsapp: "966500000000", // TODO real WhatsApp number, digits only with country code
  email: "stay@areenstay.com",
  address: {
    en: "Al Basateen District, Jeddah, Saudi Arabia",
    ar: "حي البساتين، جدة، المملكة العربية السعودية",
  },
  geo: { lat: 21.6156, lng: 39.1517 }, // TODO exact coordinates of the building
  mapsQuery: "Areen Hotel Al Basateen Jeddah",
  checkIn: "15:00",
  checkOut: "12:00",
  stars: 4, // TODO confirm classification
  social: {
    instagram: "https://instagram.com/", // TODO
    x: "https://x.com/", // TODO
    tiktok: "https://tiktok.com/", // TODO
  },
  // Booking-site listings, shown in the footer
  listings: [
    { name: "Booking.com", url: "https://www.booking.com/" }, // TODO hotel listing URLs
    { name: "Agoda", url: "https://www.agoda.com/" },
    { name: "Google Maps", url: "https://maps.google.com/?q=Areen+Hotel+Al+Basateen+Jeddah" },
  ],
};

export const dict = {
  en: {
    nav: {
      rooms: "Rooms & Suites",
      dining: "Dining",
      offers: "Offers",
      umrah: "Umrah Stays",
      corporate: "Business & Events",
      gallery: "Gallery",
      location: "Location",
    },
    book: "Book",
    bookNow: "Book now",
    switchLang: "عربي",
    tagline: "More than a stay",
    taglineAlt: "إقامة .. بتجربة تتجاوز التوقعات",
    booking: {
      checkIn: "Check in",
      checkOut: "Check out",
      guests: "Guests",
      room: "Room",
      anyRoom: "Any room",
      submit: "Check availability",
      hint: "We confirm your booking on WhatsApp within minutes.",
      guestOptions: ["1 Adult", "2 Adults", "2 Adults, 1 Child", "Family (4)", "Family (5+)"],
      message: "Hello Areen, I would like to book",
    },
    call: "Call",
    whatsapp: "WhatsApp",
    viewAll: "View all",
    learnMore: "Learn more",
    from: "From",
    perNight: "per night",
    sar: "SAR",
    sqm: "m²",
    guests: "guests",
    photo: "Photo coming soon",
    home: {
      welcomeEyebrow: "Welcome to Areen",
      welcomeTitle: "A calm, crystal-clear retreat in the heart of Jeddah.",
      welcomeBody:
        "Thoughtful rooms, warm Saudi hospitality and a quiet address in Al Basateen. Whether you are here for business, family or Umrah, Areen is designed to make every day of your stay feel effortless.",
      facts: ["Al Basateen, Jeddah", "Minutes from King Abdulaziz Airport", "Easy reach to Makkah & Al Balad"],
      roomsEyebrow: "Stay",
      diningEyebrow: "Dining",
      diningTitle: "Flavours worth staying in for",
      diningBody: "From a generous Saudi breakfast to late-night coffee, our kitchens bring Jeddah's hospitality to the table.",
      offersEyebrow: "Offers",
      umrahTitle: "Your calm base for Umrah",
      umrahBody: "Flexible check-in, transfers to Makkah and quiet rooms to rest between visits.",
    },
    footer: {
      newsletter: "Newsletter",
      newsletterTitle: "Offers and news from Areen, now and then.",
      email: "Your email",
      subscribe: "Subscribe",
      findUs: "Find us on",
      rights: "All rights reserved.",
    },
  },
  ar: {
    nav: {
      rooms: "الغرف والأجنحة",
      dining: "المطاعم",
      offers: "العروض",
      umrah: "إقامة العمرة",
      corporate: "الأعمال والمناسبات",
      gallery: "معرض الصور",
      location: "الموقع",
    },
    book: "احجز",
    bookNow: "احجز الآن",
    switchLang: "English",
    tagline: "إقامة .. بتجربة تتجاوز التوقعات",
    taglineAlt: "More than a stay",
    booking: {
      checkIn: "تاريخ الوصول",
      checkOut: "تاريخ المغادرة",
      guests: "الضيوف",
      room: "الغرفة",
      anyRoom: "أي غرفة",
      submit: "تحقق من التوفر",
      hint: "نؤكد حجزك عبر واتساب خلال دقائق.",
      guestOptions: ["بالغ واحد", "بالغان", "بالغان وطفل", "عائلة (٤)", "عائلة (٥+)"],
      message: "مرحباً أرين، أود الحجز",
    },
    call: "اتصال",
    whatsapp: "واتساب",
    viewAll: "عرض الكل",
    learnMore: "اعرف المزيد",
    from: "ابتداءً من",
    perNight: "لليلة",
    sar: "ر.س",
    sqm: "م²",
    guests: "ضيوف",
    photo: "الصورة قريباً",
    home: {
      welcomeEyebrow: "أهلاً بكم في أرين",
      welcomeTitle: "ملاذ هادئ وصافٍ كالكريستال في قلب جدة.",
      welcomeBody:
        "غرف مدروسة بعناية، وضيافة سعودية دافئة، وعنوان هادئ في حي البساتين. سواء كانت زيارتك للعمل أو مع العائلة أو لأداء العمرة، صُمم أرين ليجعل كل يوم من إقامتك سهلاً ومريحاً.",
      facts: ["حي البساتين، جدة", "دقائق من مطار الملك عبدالعزيز", "قريب من مكة المكرمة وجدة التاريخية"],
      roomsEyebrow: "الإقامة",
      diningEyebrow: "المطاعم",
      diningTitle: "نكهات تستحق البقاء من أجلها",
      diningBody: "من فطور سعودي سخي إلى قهوة المساء، تقدم مطابخنا ضيافة جدة على المائدة.",
      offersEyebrow: "العروض",
      umrahTitle: "محطتك الهادئة لأداء العمرة",
      umrahBody: "وصول مرن، وتنقلات إلى مكة المكرمة، وغرف هادئة للراحة بين الزيارات.",
    },
    footer: {
      newsletter: "النشرة البريدية",
      newsletterTitle: "عروض وأخبار أرين، بين الحين والآخر.",
      email: "بريدك الإلكتروني",
      subscribe: "اشترك",
      findUs: "تجدنا على",
      rights: "جميع الحقوق محفوظة.",
    },
  },
};

export type Dict = (typeof dict)["en"];
