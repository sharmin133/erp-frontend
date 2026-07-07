
import { Landmark, Users, Boxes, TrendingUp, BarChart3 } from "lucide-react";


type Tone = "indigo" | "emerald";

const features: {
  icon: typeof Landmark;
  label: string;
  title: string;
  desc: string;
  tone: Tone;
}[] = [
  {
    icon: Landmark,
    label: "Finance",
    title: "Books that close themselves",
    desc: "Every invoice, payment, and journal entry lands in one ledger the moment it happens — no month-end scramble.",
    tone: "indigo",
  },
  {
    icon: Users,
    label: "People",
    title: "One employee record",
    desc: "Payroll, time off, and headcount all read from the same profile, so HR and Finance never disagree on a number.",
    tone: "emerald",
  },
  {
    icon: Boxes,
    label: "Inventory",
    title: "Stock you can trust",
    desc: "Warehouse counts update live across every location, so sales never promises what's not actually on the shelf.",
    tone: "indigo",
  },
  {
    icon: TrendingUp,
    label: "Sales",
    title: "Pipeline tied to fulfillment",
    desc: "Deals convert straight into orders, so nothing gets re-typed and nothing gets lost between teams.",
    tone: "emerald",
  },
];

const toneStyles: Record<
  Tone,
  { iconBg: string; iconColor: string; hoverBorder: string; bar: string }
> = {
  indigo: {
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    hoverBorder: "hover:border-indigo-200",
    bar: "bg-indigo-500",
  },
  emerald: {
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-700",
    hoverBorder: "hover:border-emerald-200",
    bar: "bg-emerald-700",
  },
};

export default function FeaturesSection() {
  return (
    <section className="bg-green-50/95 px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-gray-500">
            <BarChart3 className="h-3.5 w-3.5 text-indigo-500" />
            How it fits together
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            Four modules, wired into
            <br />
            <span className="text-emerald-700">one system</span>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-gray-500">
            Nothing here runs on its own copy of the data. Update one place,
            and every report, dashboard, and teammate sees it instantly.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const t = toneStyles[f.tone];
            return (
              <div
                key={f.label}
                className={`group rounded-lg border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-gray-900/5 ${t.hoverBorder}`}
              >
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${t.iconBg}`}
                >
                  <f.icon className={`h-5 w-5 ${t.iconColor}`} strokeWidth={2} />
                </div>

                <span className="mt-5 block text-[11px] uppercase tracking-[0.16em] text-gray-400">
                  {f.label}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-500">
                  {f.desc}
                </p>

                <div className={`mt-5 h-0.5 w-8 rounded-full ${t.bar}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}