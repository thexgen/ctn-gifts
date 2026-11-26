import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { heroSlides } from '../../data/products.js';

/** Auto-playing hero banner with arrows, dots and hover-to-pause. */
export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const goTo = (next) => setIndex((next + heroSlides.length) % heroSlides.length);

  return (
    <section
      id="top"
      aria-label="Featured collections"
      className="section-shell pt-6 sm:pt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[380px] overflow-hidden rounded-xl shadow-soft sm:h-[440px] lg:h-[520px]">
        {heroSlides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            aria-hidden={slideIndex !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              slideIndex === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt=""
              width="1600"
              height="720"
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream/55 via-cream/20 to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-2xl px-6 sm:px-12 lg:px-16">
                <div className="w-full max-w-[30rem] rounded-2xl border border-gold/35 bg-cream/75 p-5 shadow-soft backdrop-blur-sm sm:p-7">
                  <p className="eyebrow animate-fade-in">{slide.eyebrow}</p>
                  <h1 className="mt-3 whitespace-pre-line font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-[4rem]">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">{slide.text}</p>
                  {slide.href.startsWith('/') ? (
                    <Link to={slide.href} className="btn-primary mt-7">
                      {slide.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <a href={slide.href} className="btn-primary mt-7">
                      {slide.cta} <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous hero slide"
          className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-cream/80 text-ink shadow-soft transition hover:bg-night hover:text-cream sm:left-4 sm:h-11 sm:w-11"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.6} />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next hero slide"
          className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-cream/80 text-ink shadow-soft transition hover:bg-night hover:text-cream sm:right-4 sm:h-11 sm:w-11"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={1.6} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2" role="tablist" aria-label="Hero slides">
          {heroSlides.map((slide, dotIndex) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`Go to slide ${dotIndex + 1}`}
              onClick={() => goTo(dotIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIndex === index ? 'w-8 bg-ink' : 'w-2 bg-ink/30 hover:bg-ink/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
