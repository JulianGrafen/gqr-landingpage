import type { SeoSiloFeature } from '@/config/seo-silo/types';

type LandingFeatureGridProps = {
  sectionTitle: string;
  sectionSubline?: string;
  items: SeoSiloFeature[];
  id?: string;
};

export function LandingFeatureGrid({
  sectionTitle,
  sectionSubline,
  items,
  id = 'silo-features',
}: LandingFeatureGridProps) {
  return (
    <section
      className="border-b border-white/[0.07] py-14 lg:py-20"
      aria-labelledby={`${id}-title`}
    >
      <div className="gqr-container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 id={`${id}-title`} className="gqr-section-title">
            {sectionTitle}
          </h2>
          {sectionSubline ? (
            <p className="gqr-section-sub mt-4">{sectionSubline}</p>
          ) : null}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6" role="list">
          {items.map((feature) => (
            <li
              key={feature.id}
              className="gqr-card gqr-card--flat flex flex-col gap-3 p-6 sm:p-7"
            >
              <h3 className="text-lg font-bold text-gqr-text">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gqr-muted">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
