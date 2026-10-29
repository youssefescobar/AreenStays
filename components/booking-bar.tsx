import { CalendarDays, Users } from "lucide-react";
import { Button } from "./button";

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-1 flex-col gap-1 border-b border-navy/10 px-5 py-4 md:border-r md:border-b-0">
      <span className="eyebrow flex items-center gap-2 text-crystal">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls = "w-full bg-transparent text-sm font-medium text-navy outline-none";

export function BookingBar() {
  return (
    <section id="booking" className="relative z-20 -mt-20 px-4 sm:px-6 lg:px-8">
      <form
        className="mx-auto flex max-w-5xl flex-col bg-white shadow-2xl shadow-navy/20 md:flex-row"
        action="#"
      >
        <Field label="Check in" icon={<CalendarDays size={14} />}>
          <input type="date" className={inputCls} />
        </Field>
        <Field label="Check out" icon={<CalendarDays size={14} />}>
          <input type="date" className={inputCls} />
        </Field>
        <Field label="Guests" icon={<Users size={14} />}>
          <select className={inputCls} defaultValue="2">
            <option value="1">1 Adult</option>
            <option value="2">2 Adults</option>
            <option value="3">2 Adults, 1 Child</option>
            <option value="4">Family (4)</option>
          </select>
        </Field>
        <Button type="submit" className="h-auto min-h-16 md:px-10">
          Check availability
        </Button>
      </form>
    </section>
  );
}
