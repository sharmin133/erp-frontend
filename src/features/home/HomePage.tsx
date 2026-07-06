import { Link } from "react-router";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Users,
  ShoppingCart,
  Truck,
  FileBarChart,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Boxes,
    title: "Inventory Management",
    desc: "Real-time stock tracking, low-stock alerts, and multi-warehouse support.",
  },
  {
    icon: ShoppingCart,
    title: "Sales & Orders",
    desc: "Create invoices, track orders, and manage your entire sales pipeline.",
  },
  {
    icon: Truck,
    title: "Purchase & Suppliers",
    desc: "Manage purchase orders and supplier relationships effortlessly.",
  },
  {
    icon: Users,
    title: "Customer Management",
    desc: "Keep customer history, contacts, and communication in one place.",
  },
  {
    icon: FileBarChart,
    title: "Smart Reports",
    desc: "Actionable insights with real-time dashboards and export options.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    desc: "Secure, permission-based access for every team member.",
  },
];

const stats = [
  { value: "10K+", label: "Products Managed" },
  { value: "500+", label: "Businesses" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

const HomePage = () => {
  return (
    <div className="bg-gray-950">
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
        {/* Background glow effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute top-40 right-0 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm font-medium text-sky-400">
            <Zap size={14} />
            Welcome to ERP System
          </span>

          <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-gray-50 sm:text-5xl md:text-6xl">
            Manage Your Business
            <span className="block bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Smarter, Not Harder
            </span>
          </h1>

          <p className="mb-10 max-w-2xl text-base text-gray-400 sm:text-lg">
            A modern ERP solution to manage products, inventory, customers,
            suppliers, sales, purchases, and reports — all from one powerful
            dashboard.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/register"
              className="group flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-7 py-3.5 font-medium text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-600"
            >
              Get Started
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-gray-700 bg-gray-900/50 px-7 py-3.5 font-medium text-gray-200 transition hover:border-sky-500/50 hover:text-sky-400"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-6 border-t border-gray-800 pt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-sky-400 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-gray-800 bg-gray-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-50 sm:text-4xl">
              Everything you need, <span className="text-sky-400">in one place</span>
            </h2>
            <p className="text-gray-400">
              Built for growing businesses that need speed, clarity, and full
              control over daily operations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition hover:border-sky-500/40 hover:bg-gray-900"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 transition group-hover:bg-sky-500 group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-100">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 bg-gray-950 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-gray-900 to-gray-900/50 px-8 py-14">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />

            <div className="relative">
              <BarChart3 className="mx-auto mb-4 text-sky-400" size={36} />
              <h2 className="mb-3 text-2xl font-bold text-gray-50 sm:text-3xl">
                Ready to streamline your business?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-gray-400">
                Join hundreds of businesses already managing their operations
                smarter with our ERP platform.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-7 py-3.5 font-medium text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-600"
              >
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;