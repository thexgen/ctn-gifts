import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Instagram, Mail, Phone, Youtube, Check } from 'lucide-react';
import { brand } from '../../config/brand.js';
import Reveal from '../ui/Reveal.jsx';

const linkColumns = [
  {
    title: 'Explore',
    links: [
      { label: 'About Us', href: '/#know-more' },
      { label: 'FAQs', href: '/#faq' },
      { label: 'Blogs', href: '/#know-more' },
    ],
  },
  {
    title: 'Your Orders',
    links: [
      { label: 'Track Your Order', href: '/#footer' },
      { label: 'Corporate Gifting', href: '/categories/corporate-gifts' },
      { label: 'Wedding Gifting', href: '/categories/anniversary' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Terms & Conditions', href: '/#faq' },
      { label: 'Privacy Policy', href: '/#faq' },
      { label: 'Refund Policy', href: '/#faq' },
      { label: 'Shipping Policy', href: '/#faq' },
    ],
  },
];

/** Newsletter band + dark footer with contact, links and socials. */
export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer id="footer">
      {/* Newsletter */}
      <Reveal className="bg-blush/50">
        <div className="section-shell grid items-center gap-8 py-12 md:grid-cols-2 md:py-16">
          <div>
            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              Sign up for our<br className="hidden sm:block" /> newsletter
            </h2>
            <p className="mt-3 text-sm text-ink/60">
              Get {brand.newsletterDiscount} off your first purchase plus early access to new collections.
            </p>
          </div>
          <div className="w-full max-w-xl md:justify-self-end">
            {subscribed ? (
              <p className="flex items-center gap-2 rounded-xl border border-gold/40 bg-cream px-5 py-4 text-sm text-ink" role="status">
                <Check className="h-4 w-4 text-gold" /> Thank you! Your {brand.newsletterDiscount} code is on its way.
              </p>
            ) : (
              <form onSubmit={submit} className="flex items-center gap-2 rounded-full border border-ink/10 bg-cream p-1.5 shadow-soft">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm placeholder:text-ink/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-night text-cream transition hover:bg-gold hover:text-night"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>

      {/* Footer body */}
      <div className="bg-night text-cream/70">
        <div className="section-shell py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr_1fr]">
            {/* Brand + contact */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3" aria-label={`${brand.name} home`}>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/70 font-serif text-xl text-gold">
                  {brand.shortName}
                </span>
                <span>
                  <span className="block font-serif text-lg font-semibold uppercase tracking-[0.14em] text-cream">{brand.name}</span>
                  <span className="block text-[9px] tracking-[0.28em] text-gold">CURATED GIFTING</span>
                </span>
              </Link>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/55">
                Thoughtful gifts, beautifully wrapped and delivered with love — for every connection worth celebrating.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/15"><Phone className="h-3.5 w-3.5 text-gold" /></span>
                  <a href={`tel:${brand.phone}`} className="hover:text-gold">{brand.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/15"><Mail className="h-3.5 w-3.5 text-gold" /></span>
                  <a href={`mailto:${brand.email}`} className="hover:text-gold">{brand.email}</a>
                </li>
              </ul>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {linkColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-cream">{column.title}</h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.href} className="text-sm text-cream/55 transition hover:text-gold">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-cream">Follow us on</h3>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, label: 'Facebook', href: brand.social.facebook },
                  { Icon: Instagram, label: 'Instagram', href: brand.social.instagram },
                  { Icon: Youtube, label: 'YouTube', href: brand.social.youtube },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold transition hover:bg-gold hover:text-night"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <p className="mt-6 text-sm text-cream/55">
                Made for moments that matter, from {brand.location}.
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
            © {brand.year}, {brand.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
