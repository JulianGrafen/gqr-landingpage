import { SDB_DROPZONE_TRUST_FEATURES } from '@/config/programmatic-seo/defaults';

type SdbTrustFeatureListProps = {
  className?: string;
  items?: readonly string[];
  /** `dark` = Navy-Flächen (Standard), `light` = weiße Dokument-/Card-Flächen. */
  tone?: 'dark' | 'light';
};

const TONE_CLASSES = {
  dark: { text: 'text-[#8fa4c0]', check: 'text-teal-300' },
  light: { text: 'text-slate-600', check: 'text-teal-600' },
} as const;

/** Teal-Häkchen unter der SDB-Dropzone. */
export function SdbTrustFeatureList({
  className = 'mt-4',
  items = SDB_DROPZONE_TRUST_FEATURES,
  tone = 'dark',
}: SdbTrustFeatureListProps) {
  const toneClasses = TONE_CLASSES[tone];
  return (
    <div
      className={`flex flex-col gap-1.5 text-xs ${toneClasses.text} ${className}`.trim()}
      role="group"
      aria-label="Vertrauensmerkmale"
    >
      {items.map((label) => (
        <span key={label} className="flex items-center gap-1.5">
          <span className={`shrink-0 font-bold ${toneClasses.check}`} aria-hidden="true">
            ✓
          </span>
          {label}
        </span>
      ))}
    </div>
  );
}
