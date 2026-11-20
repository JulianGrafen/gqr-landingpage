'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface SupplierMasterDataField {
  label: string;
  value: string;
}

type SupplierMasterDataBoxProps = {
  title: string;
  description: string;
  copyAllLabel: string;
  fields: readonly SupplierMasterDataField[];
};

/** Kennung des zuletzt kopierten Eintrags (Feldlabel oder „alle“) für die Bestätigung. */
type CopiedKey = string | null;

const COPY_ALL_KEY = '__all__';
const CONFIRMATION_MS = 2000;

function formatAllFields(fields: readonly SupplierMasterDataField[]): string {
  return fields.map((field) => `${field.label}: ${field.value}`).join('\n');
}

/** Stammdaten mit 1-Klick-Kopieren (einzeln oder gesammelt) für die Anlage im Kreditorenstamm. */
export function SupplierMasterDataBox({ title, description, copyAllLabel, fields }: SupplierMasterDataBoxProps) {
  const [copiedKey, setCopiedKey] = useState<CopiedKey>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const copy = useCallback(async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopiedKey(null), CONFIRMATION_MS);
    } catch {
      // Clipboard nicht verfügbar (z. B. unsicherer Kontext): Werte bleiben markierbar.
      setCopiedKey(null);
    }
  }, []);

  return (
    <section className="gqr-content-panel" aria-labelledby="supplier-master-data-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 id="supplier-master-data-title" className="text-lg font-bold text-gqr-text">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gqr-muted">{description}</p>
        </div>
        <button
          type="button"
          className="gqr-btn-secondary shrink-0"
          onClick={() => copy(COPY_ALL_KEY, formatAllFields(fields))}
        >
          {copiedKey === COPY_ALL_KEY ? 'Kopiert' : copyAllLabel}
        </button>
      </div>

      <dl className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {fields.map((field) => (
          <div key={field.label} className="grid gap-1 py-3 sm:grid-cols-[14rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4">
            <dt className="text-xs font-bold uppercase tracking-wider text-gqr-muted">{field.label}</dt>
            <dd className="m-0 select-all break-words font-semibold text-gqr-text">{field.value}</dd>
            <dd className="m-0">
              <button
                type="button"
                className="text-sm font-semibold text-gqr-trust hover:underline"
                onClick={() => copy(field.label, field.value)}
                aria-label={`${field.label} kopieren`}
              >
                {copiedKey === field.label ? 'Kopiert' : 'Kopieren'}
              </button>
            </dd>
          </div>
        ))}
      </dl>

      <p className="sr-only" aria-live="polite">
        {copiedKey ? 'In die Zwischenablage kopiert.' : ''}
      </p>
    </section>
  );
}
