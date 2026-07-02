import { ArrowRight, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import type { AddressInput } from "./uploadTypes";

type Props = {
  addressInput: AddressInput;
  setAddressInput: (value: AddressInput) => void;
  addressIsComplete: boolean;
  checkingAddress: boolean;
  onCheckAddress: () => void;
  // "check" shows the Street View lookup button; "entry" is a plain address
  // form for the photo path, where the address is only saved for elevation.
  variant?: "check" | "entry";
};

export function AddressLookupCard({
  addressInput,
  setAddressInput,
  addressIsComplete,
  checkingAddress,
  onCheckAddress,
  variant = "check",
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
      className="relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-cyan-300/15 via-blue-500/10 to-[#0d1a2b] p-6 shadow-2xl"
    >
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute -bottom-24 left-12 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-xl">
            <MapPin className="h-7 w-7 text-blue-600" />
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-wide text-cyan-100/70">
              {variant === "check" ? "Street View" : "For elevation"}
            </p>
            <h2 className="mt-1 text-2xl font-black text-white">
              Enter the home address
            </h2>
            <p className="mt-2 max-w-2xl leading-7 text-slate-300">
              {variant === "check"
                ? "We’ll first try to use a Google Street View image. If it fails, the address still stays saved for road altitude and elevation."
                : "We keep this address to look up road altitude and elevation for your uploaded photo."}
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

        {variant === "check" && (
          <button
            type="button"
            onClick={onCheckAddress}
            disabled={!addressIsComplete || checkingAddress}
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-slate-950 shadow-xl transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
          >
            {checkingAddress ? (
              "Checking Street View..."
            ) : (
              <>
                <Search className="h-5 w-5 text-blue-600" />
                Check for Street View
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </>
            )}
          </button>
        )}
      </div>
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
      <label className="text-sm font-black text-cyan-100">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={[
          "mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-4 font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:bg-slate-950/80",
          uppercase ? "uppercase" : "",
        ].join(" ")}
      />
    </div>
  );
}
