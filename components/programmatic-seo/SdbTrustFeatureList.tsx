import { SDB_DROPZONE_TRUST_FEATURES } from '@/config/programmatic-seo/defaults';

type SdbTrustFeatureListProps = {
  className?: string;
  items?: readonly string[];
};

/** Teal-Häkchen unter der SDB-Dropzone. */
export function SdbTrustFeatureList({
  className = 'mt-4',
  items = SDB_DROPZONE_TRUST_FEATURES,
}: SdbTrustFeatureListProps) {
  return (
    <div className={`flex flex-col gap-1.5 text-xs text-[#8fa4c0] ${className}`.trim()} role="group" aria-label="Vertrauensmerkmale">
      {items.map((label) => (
        <span key={label} className="flex items-center gap-1.5">
          <span className="shrink-0 font-bold text-teal-300" aria-hidden="true">
            ✓
          </span>
          {label}
        </span>
      ))}
    </div>
  );
}
