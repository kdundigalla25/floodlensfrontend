import { ArrowRight, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import type { AddressInput } from "./uploadTypes";

type Props = {
  addressInput: AddressInput;
  setAddressInput: (value: AddressInput) => void;
  addressIsComplete: boolean;
  checkingAddress: boolean;
  onCheckAddress: () => void;
};

export function AddressLookupCard({
  addressInput,
  setAddressInput,
  addressIsComplete,
  checkingAddress,
  onCheckAddress,
}: Props) {
  function updateAddressField(field: keyof AddressInput, value: string) {
    setAddressInput({
      ...addressInput,
      [field]: field === "state" ? value.toUpperCase() : value,
    });
  }

  return (
    <motion.section
      layout
      className="overflow-hidden rounded-4xl border border-white/10 bg-[#0d1a2b] p-6 shadow-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
            boxShadow: "0 0 16px rgba(34,211,238,0.28)",
          }}
        >
          <MapPin className="h-[18px] w-[18px] text-white" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">Enter the home address</h2>
          <p className="text-sm text-slate-400">
            We'll try Street View first, then fall back to a photo upload.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <Field
          label="Street address"
          value={addressInput.address}
          onChange={(value) => updateAddressField("address", value)}
          placeholder="311 W University Dr"
        />

        <div className="grid gap-4 md:grid-cols-[1fr_160px]">
          <Field
            label="City"
            value={addressInput.city}
            onChange={(value) => updateAddressField("city", value)}
            placeholder="Chapel Hill"
          />

          <Field
            label="State"
            value={addressInput.state}
            onChange={(value) => updateAddressField("state", value)}
            placeholder="NC"
            maxLength={2}
            uppercase
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onCheckAddress}
        disabled={!addressIsComplete || checkingAddress}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
        style={{
          background: "linear-gradient(90deg, #22d3ee, #3b82f6)",
          boxShadow: "0 4px 20px rgba(34,211,238,0.2)",
        }}
      >
        {checkingAddress ? (
          "Checking Street View…"
        ) : (
          <>
            <Search className="h-4 w-4" />
            Check for Street View
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </motion.section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  uppercase,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength?: number;
  uppercase?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-300">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={[
          "mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.07]",
          uppercase ? "uppercase" : "",
        ].join(" ")}
      />
    </div>
  );
}
