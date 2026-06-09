import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function WhySection() {
  return (
    <section id="why" className="bg-[#07111F] px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-400/15 text-rose-200">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Most homeowners think about flood insurance too late.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-cyan-200/20 bg-linear-to-br from-cyan-100 via-white to-blue-100 p-8 text-slate-950 shadow-2xl md:p-10"
        >
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/40 blur-3xl" />

          <p className="relative text-xl font-black leading-tight md:text-2xl">
            Flood risk is easier to understand when people can see it on their
            actual home.
          </p>

          <p className="relative mt-5 text-base leading-8 text-slate-700 md:text-lg">
            Instead of only showing a map or risk score, FloodLens turns
            elevation and flood data into a direct visual preview.
          </p>

          <Link
            to="/upload"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-black text-white shadow-xl transition hover:scale-[1.03]"
          >
            Check my home
            <ArrowRight className="h-5 w-5 text-cyan-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
