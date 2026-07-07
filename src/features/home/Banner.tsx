const backCards = [
  {
    label: "Finance",
    rotate: "-rotate-6",
    translate: "-translate-x-6 translate-y-3",
    from: "from-indigo-100",
    to: "to-indigo-50",
    dot: "bg-indigo-400",
  },
  {
    label: "People",
    rotate: "-rotate-3",
    translate: "-translate-x-3 translate-y-1.5",
    from: "from-amber-100",
    to: "to-amber-50",
    dot: "bg-amber-400",
  },
  {
    label: "Inventory",
    rotate: "rotate-3",
    translate: "translate-x-3 translate-y-1.5",
    from: "from-rose-100",
    to: "to-rose-50",
    dot: "bg-rose-400",
  },
  {
    label: "Sales",
    rotate: "rotate-6",
    translate: "translate-x-6 translate-y-3",
    from: "from-emerald-100",
    to: "to-emerald-50",
    dot: "bg-emerald-500",
  },
];

const ledgerRows = [
  { label: "Finance", value: "Synced" },
  { label: "People", value: "Synced" },
  { label: "Inventory", value: "Synced" },
  { label: "Sales", value: "Synced" },
];

function UnifiedLedger() {
  return (
    <div className="relative mx-auto flex h-115 w-full max-w-130 items-center justify-center">
      {backCards.map((c) => (
        <div
          key={c.label}
          className={`erp-card-in absolute h-68 w-[320px] rounded-lg border border-gray-200 bg-linear-to-br ${c.from} ${c.to} ${c.rotate} ${c.translate}`}
        >
          <span
            className={`absolute left-4 top-4 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-gray-500`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            {c.label}
          </span>
        </div>
      ))}

     
      <div className="erp-card-in-front group relative h-75 w-85 rounded-lg border border-gray-200 bg-linear-to-br from-white via-indigo-50/40 to-emerald-50/50 p-6 shadow-[0_20px_40px_-12px_rgba(79,70,229,0.18)] transition-transform duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <span className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
            System of Record
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-700" />
        </div>

        <div className="mt-4 flex flex-col gap-3.5">
          {ledgerRows.map((row, i) => (
            <div
              key={row.label}
              className="erp-row-in flex items-center justify-between text-[14px]"
              style={{ animationDelay: `${1.1 + i * 0.12}s` }}
            >
              <span className="flex items-center gap-2 text-gray-500">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${backCards[i].dot}`}
                />
                {row.label}
              </span>
              <span className="font-medium text-gray-800">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-[14px] font-semibold text-gray-900">
            Reporting
          </span>
          <span className="rounded-full bg-linear-to-r from-indigo-500 to-emerald-600 px-3 py-1 text-[12px] font-medium text-white">
            up to date
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-6 lg:px-16 ">
      <style>{`
        @keyframes erp-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes erp-card-in { from { opacity: 0; transform: scale(0.92) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes erp-row-in { from { opacity: 0; transform: translateX(6px); } to { opacity: 1; transform: translateX(0); } }

        .erp-rise { animation: erp-rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

        .erp-card-in {
          animation: erp-card-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .erp-card-in:nth-of-type(1) { animation-delay: 0.15s; }
        .erp-card-in:nth-of-type(2) { animation-delay: 0.25s; }
        .erp-card-in:nth-of-type(3) { animation-delay: 0.35s; }
        .erp-card-in:nth-of-type(4) { animation-delay: 0.45s; }

        .erp-card-in-front {
          animation: erp-card-in 0.7s 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .erp-row-in { animation: erp-row-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .erp-rise, .erp-card-in, .erp-card-in-front, .erp-row-in { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_0.9fr] ">

        <div className="text-left">
          <div
            className="erp-rise mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-gray-500"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
            Enterprise Resource Planning
          </div>

          <h1
            className="erp-rise text-[44px] font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-[56px]"
            style={{ animationDelay: "0.12s" }}
          >
            Every department,
            <br />
            <span className="text-emerald-500">one single truth.</span>
          </h1>

          <p
            className="erp-rise mt-6 max-w-110 text-[17px] leading-relaxed text-gray-500"
            style={{ animationDelay: "0.2s" }}
          >
            Finance, people, inventory, and sales stop keeping their own books.
            Everything lands in one system, so a number means the same thing
            wherever it's read.
          </p>

          <div
            className="erp-rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.28s" }}
          >
            <button className="rounded-md bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/25  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
              Start free trial
            </button>
            <button className="rounded-md border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
              Learn more
            </button>
          </div>
        </div>

        <UnifiedLedger />
      </div>
    </section>
  );
}
