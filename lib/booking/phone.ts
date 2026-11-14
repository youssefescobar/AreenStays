/**
 * Country dial codes for the booking bar's phone field.
 * Saudi Arabia first (default), then the Gulf, the Arab world, then the countries most guests come from.
 * Names are hardcoded (not Intl.DisplayNames) so server and browser render identical text.
 */
export type Country = { iso: string; dial: string; en: string; ar: string };

export const countries: Country[] = [
  { iso: "SA", dial: "966", en: "Saudi Arabia", ar: "السعودية" },
  { iso: "AE", dial: "971", en: "United Arab Emirates", ar: "الإمارات" },
  { iso: "KW", dial: "965", en: "Kuwait", ar: "الكويت" },
  { iso: "QA", dial: "974", en: "Qatar", ar: "قطر" },
  { iso: "BH", dial: "973", en: "Bahrain", ar: "البحرين" },
  { iso: "OM", dial: "968", en: "Oman", ar: "عُمان" },
  { iso: "EG", dial: "20", en: "Egypt", ar: "مصر" },
  { iso: "JO", dial: "962", en: "Jordan", ar: "الأردن" },
  { iso: "LB", dial: "961", en: "Lebanon", ar: "لبنان" },
  { iso: "SY", dial: "963", en: "Syria", ar: "سوريا" },
  { iso: "IQ", dial: "964", en: "Iraq", ar: "العراق" },
  { iso: "YE", dial: "967", en: "Yemen", ar: "اليمن" },
  { iso: "PS", dial: "970", en: "Palestine", ar: "فلسطين" },
  { iso: "SD", dial: "249", en: "Sudan", ar: "السودان" },
  { iso: "LY", dial: "218", en: "Libya", ar: "ليبيا" },
  { iso: "TN", dial: "216", en: "Tunisia", ar: "تونس" },
  { iso: "DZ", dial: "213", en: "Algeria", ar: "الجزائر" },
  { iso: "MA", dial: "212", en: "Morocco", ar: "المغرب" },
  { iso: "PK", dial: "92", en: "Pakistan", ar: "باكستان" },
  { iso: "IN", dial: "91", en: "India", ar: "الهند" },
  { iso: "BD", dial: "880", en: "Bangladesh", ar: "بنغلاديش" },
  { iso: "ID", dial: "62", en: "Indonesia", ar: "إندونيسيا" },
  { iso: "MY", dial: "60", en: "Malaysia", ar: "ماليزيا" },
  { iso: "TR", dial: "90", en: "Türkiye", ar: "تركيا" },
  { iso: "IR", dial: "98", en: "Iran", ar: "إيران" },
  { iso: "AF", dial: "93", en: "Afghanistan", ar: "أفغانستان" },
  { iso: "UZ", dial: "998", en: "Uzbekistan", ar: "أوزبكستان" },
  { iso: "KZ", dial: "7", en: "Kazakhstan", ar: "كازاخستان" },
  { iso: "PH", dial: "63", en: "Philippines", ar: "الفلبين" },
  { iso: "LK", dial: "94", en: "Sri Lanka", ar: "سريلانكا" },
  { iso: "NP", dial: "977", en: "Nepal", ar: "نيبال" },
  { iso: "NG", dial: "234", en: "Nigeria", ar: "نيجيريا" },
  { iso: "ET", dial: "251", en: "Ethiopia", ar: "إثيوبيا" },
  { iso: "SO", dial: "252", en: "Somalia", ar: "الصومال" },
  { iso: "KE", dial: "254", en: "Kenya", ar: "كينيا" },
  { iso: "SN", dial: "221", en: "Senegal", ar: "السنغال" },
  { iso: "ZA", dial: "27", en: "South Africa", ar: "جنوب أفريقيا" },
  { iso: "GB", dial: "44", en: "United Kingdom", ar: "المملكة المتحدة" },
  { iso: "US", dial: "1", en: "United States", ar: "الولايات المتحدة" },
  { iso: "CA", dial: "1", en: "Canada", ar: "كندا" },
  { iso: "FR", dial: "33", en: "France", ar: "فرنسا" },
  { iso: "DE", dial: "49", en: "Germany", ar: "ألمانيا" },
  { iso: "IT", dial: "39", en: "Italy", ar: "إيطاليا" },
  { iso: "ES", dial: "34", en: "Spain", ar: "إسبانيا" },
  { iso: "NL", dial: "31", en: "Netherlands", ar: "هولندا" },
  { iso: "RU", dial: "7", en: "Russia", ar: "روسيا" },
  { iso: "CN", dial: "86", en: "China", ar: "الصين" },
  { iso: "AU", dial: "61", en: "Australia", ar: "أستراليا" },
];

export const DEFAULT_COUNTRY = "SA";

export const flag = (iso: string) =>
  String.fromCodePoint(...[...iso.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

/** Arabic/Persian digits → ASCII, then keep digits only. */
export const digitsOnly = (value: string) =>
  value
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/\D/g, "");

/**
 * Local number + country → E.164 ("+966512345678"), or null when it can't be a real number.
 * Drops the trunk "0" people type out of habit (0512… → 512…). Saudi numbers must be 9 digits.
 */
export const toE164 = (iso: string, local: string): string | null => {
  const country = countries.find((c) => c.iso === iso);
  if (!country) return null;
  let national = digitsOnly(local).replace(/^0+/, "");
  // Pasted with the country code already ("966 5…" or "+966 5…").
  if (national.startsWith(country.dial) && national.length > country.dial.length + 6) {
    national = national.slice(country.dial.length);
  }
  if (iso === "SA" && national.length !== 9) return null;
  if (national.length < 6 || country.dial.length + national.length > 15) return null;
  return `+${country.dial}${national}`;
};
