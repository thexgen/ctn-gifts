import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import { useFeatures } from '../../context/FeaturesContext.jsx';
import { brand } from '../../config/brand.js';

/** Shown only when ALCOHOL_ENABLED is true and a gated item is opened. */
export default function AgeConfirmationModal() {
  const { ageGateOpen, closeAgeGate, confirmAge } = useFeatures();
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const currentYear = new Date().getFullYear();

  const submit = (event) => {
    event.preventDefault();
    const birthYear = Number(year);
    if (!birthYear || birthYear < 1900 || birthYear > currentYear - 21) {
      setError(`You must be 21 or over to shop this collection. (Born ${currentYear - 21} or earlier.)`);
      return;
    }
    setError('');
    setYear('');
    confirmAge();
  };

  return (
    <Modal open={ageGateOpen} onClose={closeAgeGate} title="Are you 21 or over?" size="sm">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blush/70">
          <ShieldCheck className="h-6 w-6 text-gold" strokeWidth={1.5} />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/65">
          Our Beer &amp; Wine Hampers are for adults only. Please confirm your year of birth to continue.
        </p>
        <form onSubmit={submit} className="mt-5">
          <label htmlFor="birth-year" className="mb-1.5 block text-left text-xs font-medium text-ink/70">
            Year of birth
          </label>
          <input
            id="birth-year"
            type="number"
            inputMode="numeric"
            min="1900"
            max={currentYear - 21}
            value={year}
            onChange={(event) => { setYear(event.target.value); setError(''); }}
            placeholder="e.g. 1995"
            aria-invalid={Boolean(error)}
            className="w-full rounded-full border border-gold/30 bg-cream px-5 py-3 text-center text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
          {error && <p className="mt-2 text-xs text-red-700" role="alert">{error}</p>}
          <button type="submit" className="btn-primary mt-4 w-full">Yes, I’m 21 or over</button>
        </form>
        <button type="button" onClick={closeAgeGate} className="mt-4 text-xs text-ink/45 underline underline-offset-4 hover:text-ink">
          Not now — take me back
        </button>
        <p className="mt-5 text-[10px] tracking-widest text-ink/35">{brand.name} · RESPONSIBLE GIFTING</p>
      </div>
    </Modal>
  );
}
