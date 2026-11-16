import Link from 'next/link';
import {
  SOFTWARE_AEO_ANSWERS,
  SOFTWARE_LONGTAIL_SECTIONS,
  type LongtailSection,
} from '@/config/wissen/software-category-comparison';

function LongtailLink({ link }: { link: NonNullable<LongtailSection['link']> }) {
  const isExternal = link.href.startsWith('http');
  return isExternal ? <a href={link.href}>{link.label} →</a> : <Link href={link.href}>{link.label} →</Link>;
}

/** AEO-Antwortblöcke (H2-Frage + kurze, eigenständige Antwort). */
export function SoftwareAeoAnswers() {
  return (
    <>
      {SOFTWARE_AEO_ANSWERS.map((block) => (
        <section key={block.id} aria-labelledby={`aeo-${block.id}`}>
          <h2 id={`aeo-${block.id}`}>{block.question}</h2>
          <p>{block.answer}</p>
        </section>
      ))}
    </>
  );
}

/** Longtail-Abschnitte (Synonyme und Suchintentionen aus der Search Console). */
export function SoftwareLongtailSections() {
  return (
    <section aria-labelledby="longtail-heading">
      <h2 id="longtail-heading">Kataster, Datenbank oder Service: was Sie konkret brauchen</h2>
      {SOFTWARE_LONGTAIL_SECTIONS.map((section) => (
        <div key={section.id}>
          <h3 id={`longtail-${section.id}`}>{section.heading}</h3>
          <p>
            {section.body} {section.link ? <LongtailLink link={section.link} /> : null}
          </p>
        </div>
      ))}
    </section>
  );
}
