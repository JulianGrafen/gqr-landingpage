import Link from 'next/link';
import type { ReactNode } from 'react';
import type { SeoSiloPageConfig } from '@/config/seo-silo/types';
import { buildLandingSchemaBundle } from '@/lib/seo/build-landing-schema';
import { LandingCtaBetriebsanweisungnd } from '@/components/seo-silo/LandingCtaBetriebsanweisungnd';
import { LandingFaqSection } from '@/components/seo-silo/LandingFaqSection';
import { LandingFeatureGrid } from '@/components/seo-silo/LandingFeatureGrid';
import { LandingHeroSection } from '@/components/seo-silo/LandingHeroSection';
import { LandingSeoJsonLd } from '@/components/seo-silo/LandingSeoJsonLd';

type LandingPageWrapperProps = {
  config: SeoSiloPageConfig;
  /** Ersetzt Standard-Hero (z. B. Lead-Magnet mit Download-Formular) */
  heroSlot?: ReactNode;
  /** Zusätzliche Sektionen zwischen Features und FAQ (z. B. Vergleichstabelle, Download-Form) */
  children?: ReactNode;
  /** Optionale Schema-Ergänzung für SoftwareApplication */
  softwareSchemaOverrides?: Parameters<typeof buildLandingSchemaBundle>[1];
};

/**
 * Zentrale Layout-Hülle für alle 4 SEO-Silo-Landingpages.
 * Copy und page-spezifische Blöcke kommen über `config` bzw. `children`.
 */
export function LandingPageWrapper({
  config,
  heroSlot,
  children,
  softwareSchemaOverrides,
}: LandingPageWrapperProps) {
  const schema = buildLandingSchemaBundle(config.faq, {
    pageUrl: config.seo.canonicalPath,
    pageDescription: config.seo.description,
    ...softwareSchemaOverrides,
  });

  return (
    <main className="pb-8">
      <LandingSeoJsonLd schema={schema} />

      {config.breadcrumb.length > 1 ? (
        <nav
          className="gqr-container pt-6"
          aria-label="Brotkrumen-Navigation"
        >
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gqr-muted">
            {config.breadcrumb.map((item, index) => {
              const isLast = index === config.breadcrumb.length - 1;
              return (
                <li key={item.href} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-gqr-muted/60">
                      /
                    </span>
                  ) : null}
                  {isLast ? (
                    <span className="font-semibold text-gqr-soft">{item.label}</span>
                  ) : (
                    <Link
                      href={item.href}
                      className="font-semibold text-gqr-trust no-underline hover:underline"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}

      {heroSlot ?? <LandingHeroSection {...config.hero} />}

      {config.features ? (
        <LandingFeatureGrid
          sectionTitle={config.features.sectionTitle}
          sectionSubline={config.features.sectionSubline}
          items={config.features.items}
        />
      ) : null}

      {children}

      <LandingFaqSection faq={config.faq} />

      <LandingCtaBetriebsanweisungnd {...config.closingCta} />
    </main>
  );
}
