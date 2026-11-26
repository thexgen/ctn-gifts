import { wallOfFame } from '../../data/products.js';
import { getList } from '../../utils/images.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';
import SmartImage from '../ui/SmartImage.jsx';

/** Seamless auto-scrolling marquee of happy-customer photo placeholders. */
export default function WallOfFame() {
  // Duplicate the list so the -50% CSS translation loops without a visible gap.
  const loop = [...wallOfFame, ...wallOfFame];
  const images = getList('wallOfFame');

  return (
    <section id="wall-of-fame" className="section-shell py-16 sm:py-20">
      <SectionHeader title="Wall Of Fame" subtitle="Real moments, real smiles — the best part of what we do." />
      <Reveal delay={100} className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-cream to-transparent sm:w-20" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-cream to-transparent sm:w-20" aria-hidden="true" />
        <div className="marquee-wrap overflow-hidden py-2">
          <div className="marquee-track gap-4 sm:gap-5">
            {loop.map((item, index) => (
              <SmartImage
                key={`${item.id}-${index}`}
                src={images.length ? images[index % images.length] : undefined}
                alt="Giftora customer moment"
                ratio="aspect-square"
                className="h-36 w-36 shrink-0 rounded-lg sm:h-52 sm:w-52"
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
