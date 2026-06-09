export function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1726] p-4 shadow-lg">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-base font-black text-white">{value}</p>
    </div>
  );
}
