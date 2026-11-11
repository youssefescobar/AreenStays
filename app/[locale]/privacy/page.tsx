import type { Metadata } from "next";
import { resolve, type LocaleParams } from "@/lib/page";
import { hotel } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

// Plain-language summary of what the website and the Reen chat actually do with personal data.
// Have it reviewed against Saudi PDPL requirements by your legal advisor before relying on it.
const content = {
  en: {
    title: "Privacy policy",
    updated: "Last updated: November 2026",
    sections: [
      ["What we collect", "Messages you send to Reen, our chat assistant. If you request a booking: your name, phone/WhatsApp number, stay dates, number of guests and any notes. The booking form records your dates, room choice and guest count."],
      ["Why we use it", "To answer your questions and to handle reservation requests: our team uses your name and number only to contact you about your booking. We do not sell your data or use it for advertising."],
      ["Who processes it", "Chat messages are processed by Google's Gemini AI service to generate Reen's replies. Data is stored securely with our cloud database provider. Hotel staff can read chats to help guests and improve answers."],
      ["How long we keep it", "Chats that did not lead to a booking are deleted automatically 90 days after the last message. Booking requests are kept as long as needed to manage your stay and meet legal obligations."],
      ["Your rights", "You can ask us to show, correct or delete your personal data at any time by contacting us below."],
      ["Contact", "Reach us on WhatsApp or by phone using the details at the bottom of this page."],
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    updated: "آخر تحديث: نوفمبر 2026",
    sections: [
      ["ما الذي نجمعه", "الرسائل التي ترسلها إلى رين، مساعدتنا في الدردشة. وعند طلب حجز: اسمك ورقم جوالك/واتساب وتواريخ الإقامة وعدد الضيوف وأي ملاحظات. ويسجّل نموذج الحجز التواريخ ونوع الغرفة وعدد الضيوف."],
      ["لماذا نستخدمه", "للإجابة على استفساراتك ومعالجة طلبات الحجز؛ يستخدم فريقنا اسمك ورقمك فقط للتواصل معك بخصوص حجزك. لا نبيع بياناتك ولا نستخدمها للإعلانات."],
      ["من يعالج البيانات", "تتم معالجة رسائل الدردشة عبر خدمة Gemini للذكاء الاصطناعي من Google لإنشاء ردود رين. وتُحفظ البيانات بشكل آمن لدى مزوّد قاعدة البيانات السحابية. ويمكن لموظفي الفندق قراءة المحادثات لمساعدة الضيوف وتحسين الإجابات."],
      ["مدة الاحتفاظ", "تُحذف تلقائياً المحادثات التي لم ينتج عنها حجز بعد 90 يوماً من آخر رسالة. ونحتفظ بطلبات الحجز للمدة اللازمة لإدارة إقامتك والوفاء بالمتطلبات النظامية."],
      ["حقوقك", "يمكنك في أي وقت طلب الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها بالتواصل معنا."],
      ["التواصل", "تواصل معنا عبر واتساب أو الهاتف من خلال البيانات أسفل هذه الصفحة."],
    ],
  },
} as const;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await resolve(params);
  return pageMetadata(locale, "/privacy", content[locale].title, content[locale].sections[1][1]);
}

export default async function PrivacyPage({ params }: LocaleParams) {
  const { locale } = await resolve(params);
  const c = content[locale];
  return (
    <section className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-gold">{hotel.name[locale]}</p>
        <h1 className="mt-3 text-4xl font-light text-navy">{c.title}</h1>
        <p className="mt-2 text-sm text-ink/50">{c.updated}</p>
        <div className="mt-10 space-y-8">
          {c.sections.map(([heading, body]) => (
            <div key={heading}>
              <h2 className="text-lg font-medium text-navy">{heading}</h2>
              <p className="mt-2 leading-relaxed text-ink/75">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
