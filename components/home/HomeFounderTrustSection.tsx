import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import {
  HOME_FOUNDER_TRUST,
  HOME_FOUNDER_TRUST_MAX_TESTIMONIALS,
  type SifaTestimonial,
} from '@/config/home-sections/founder-trust';

const HEADLINE_ID = 'founderTrustHeadline';

function TestimonialCard({ testimonial }: { testimonial: SifaTestimonial }) {
  return (
    <li className={`${styles.card} flex h-full flex-col`}>
      {testimonial.logo ? (
        <img
          src={testimonial.logo.src}
          alt={testimonial.logo.alt}
          width={testimonial.logo.width}
          height={testimonial.logo.height}
          className="mb-4 h-8 w-auto self-start"
          loading="lazy"
        />
      ) : null}
      <blockquote className="m-0 flex-1 text-sm leading-relaxed text-[#c5d0e2]">„{testimonial.quote}“</blockquote>
      <p className="mt-4 text-sm font-bold text-[#f0f6ff]">{testimonial.name}</p>
      <p className="text-xs text-[#8fa4c0]">{testimonial.role}</p>
    </li>
  );
}

/** Trust-Fakten, Gründer-Karte, Verzeichnis-Listings und (optional) echte SiFa-Testimonials. */
export function HomeFounderTrustSection() {
  const { founder, facts, listings, testimonials } = HOME_FOUNDER_TRUST;
  const visibleTestimonials = testimonials.slice(0, HOME_FOUNDER_TRUST_MAX_TESTIMONIALS);

  return (
    <section id={HOME_FOUNDER_TRUST.sectionId} className={styles.section} aria-labelledby={HEADLINE_ID}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{HOME_FOUNDER_TRUST.eyebrow}</p>
          <h2 id={HEADLINE_ID} className={styles.headline}>
            {HOME_FOUNDER_TRUST.headline}
          </h2>
        </header>

        <div className="grid gap-6 lg:grid-cols-5 lg:items-stretch">
          <article className={`${styles.card} flex flex-col lg:col-span-2`}>
            <div className="flex items-center gap-4">
              {founder.photo ? (
                <img
                  src={founder.photo.src}
                  alt={founder.photo.alt}
                  width={founder.photo.width}
                  height={founder.photo.height}
                  className="h-14 w-14 shrink-0 rounded-full border border-white/15 object-cover object-[center_20%]"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal-300/30 bg-teal-300/10 text-lg font-black text-teal-300"
                  aria-hidden="true"
                >
                  {founder.initials}
                </span>
              )}
              <div>
                <p className={styles.cardTitle}>{founder.name}</p>
                <p className="text-sm text-[#8fa4c0]">
                  {founder.role} · {founder.location}
                </p>
              </div>
            </div>
            <blockquote className="m-0 mt-2 flex-1 text-sm leading-relaxed text-[#c5d0e2]">
              „{founder.bio}“
            </blockquote>
            <a className={`${styles.secondaryLink} mt-4 self-start text-sm font-semibold`} href={founder.contactHref}>
              {founder.contactLabel} →
            </a>
          </article>

          <ul className="grid list-none gap-4 p-0 lg:col-span-3">
            {facts.map((fact) => (
              <li key={fact.title} className={`${styles.card} flex gap-3`}>
                <span className={styles.checkmark} aria-hidden="true">
                  ✓
                </span>
                <div>
                  <h3 className="m-0 text-base font-bold text-[#f0f6ff]">{fact.title}</h3>
                  <p className="m-0 mt-1 text-sm leading-relaxed text-[#8fa4c0]">{fact.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {listings.length > 0 ? (
          <ul className="mt-8 flex list-none flex-wrap items-center justify-center gap-x-8 gap-y-4 p-0">
            {listings.map((listing) => (
              <li key={listing.href}>
                <a
                  href={listing.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs text-[#8fa4c0] no-underline hover:text-[#f0f6ff]"
                >
                  <span>{listing.label}</span>
                  <img
                    src={listing.logoSrc}
                    alt={listing.logoAlt}
                    width={listing.logoWidth}
                    height={listing.logoHeight}
                    loading="lazy"
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        {visibleTestimonials.length > 0 ? (
          <div className="mt-12">
            <h3 className="mb-6 text-center text-lg font-bold text-[#f0f6ff]">{HOME_FOUNDER_TRUST.testimonialsHeadline}</h3>
            <ul className="grid list-none gap-6 p-0 md:grid-cols-3">
              {visibleTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
