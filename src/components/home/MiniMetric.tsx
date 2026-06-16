export function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-[#0a1828] px-3 py-2.5 shadow-md">
      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
        {label}
      </p>
      <p className="mt-1 text-[13px] font-black text-white">{value}</p>
    </div>
  );
}
