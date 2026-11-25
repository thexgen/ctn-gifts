import { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import { brand } from '../../config/brand.js';

/** First-visit delivery location prompt (shown once per browser session). */
export default function DeliveryPopup() {
  const [open, setOpen] = useState(() => {
    try {
      return !window.sessionStorage.getItem('giftora-location-set');
    } catch {
      return true;
    }
  });
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  const dismiss = () => {
    try {
      window.sessionStorage.setItem('giftora-location-set', '1');
    } catch {
      /* storage unavailable — the popup simply reappears next session */
    }
    setOpen(false);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }
    dismiss();
  };

  return (
    <Modal open={open} onClose={dismiss} title="Where should we deliver your joy?" size="sm">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blush/70">
          <MapPin className="h-6 w-6 text-gold" strokeWidth={1.5} />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/65">
          Pop in your pincode so we can show you the loveliest gifts we can deliver to your door.
        </p>

        <form onSubmit={submit} className="mt-5">
          <label htmlFor="pincode" className="sr-only">Delivery pincode</label>
          <input
            id="pincode"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={pincode}
            onChange={(event) => { setPincode(event.target.value.replace(/\D/g, '')); setError(''); }}
            placeholder="Enter 6-digit pincode"
            aria-invalid={Boolean(error)}
            className="w-full rounded-full border border-gold/30 bg-cream px-5 py-3 text-center text-sm tracking-[0.2em] placeholder:tracking-normal placeholder:text-ink/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
          {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
          <button type="submit" className="btn-primary mt-4 w-full">
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <button type="button" onClick={dismiss} className="mt-4 text-xs text-ink/45 underline underline-offset-4 hover:text-ink">
          Maybe later
        </button>
        <p className="mt-5 text-[10px] tracking-widest text-ink/35">DELIVERING WITH LOVE FROM {brand.location.toUpperCase()}</p>
      </div>
    </Modal>
  );
}
