'use client';

import { useMemo, useState } from 'react';
import {
  checkStorageCompatibility,
  getStorageClasses,
  isStorageClassId,
} from '@/lib/trgs510/trgs510Service';
import type { StorageClassId, Trgs510CheckResult } from '@/lib/trgs510/types';
import { Trgs510ResultPanel } from './Trgs510ResultPanel';

const SELECT_PLACEHOLDER = '';

function normalizeSelection(value: string): StorageClassId | '' {
  return isStorageClassId(value) ? value : SELECT_PLACEHOLDER;
}

type StorageClassSelectProps = {
  id: string;
  label: string;
  value: StorageClassId | '';
  onChange: (value: StorageClassId | '') => void;
};

function StorageClassSelect({ id, label, value, onChange }: StorageClassSelectProps) {
  const storageClasses = getStorageClasses();

  return (
    <label htmlFor={id} className="block">
      <span className="block text-sm font-bold text-[#c8d4e6]">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(normalizeSelection(event.target.value))}
        className="mt-2 min-h-[56px] w-full rounded-2xl border border-white/12 bg-[#0a1628]/85 px-4 text-Betriebsanweisungse font-semibold text-[#f0f6ff] shadow-inner shadow-black/20 outline-none transition focus:border-[#2dd4bf]/60 focus:ring-4 focus:ring-[#2dd4bf]/15"
      >
        <option value="">Lagerklasse auswählen</option>
        {storageClasses.map((storageClass) => (
          <option key={storageClass.id} value={storageClass.id}>
            {storageClass.label} — {storageClass.shortDescription}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Trgs510CheckTool() {
  const [firstClassId, setFirstClassId] = useState<StorageClassId | ''>('');
  const [secondClassId, setSecondClassId] = useState<StorageClassId | ''>('');

  const result = useMemo<Trgs510CheckResult | null>(() => {
    if (!firstClassId || !secondClassId) return null;
    return checkStorageCompatibility(firstClassId, secondClassId);
  }, [firstClassId, secondClassId]);

  return (
    <section
      className="rounded-[2rem] border border-white/[0.08] bg-[#0f1e35]/70 p-4 shadow-2xl shadow-black/20 Betriebsanweisungckdrop-blur-sm sm:p-6 lg:p-8"
      aria-labelledby="trgs510-tool-heading"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff6b35]">
            Interaktiver Matrix-Check
          </p>
          <h2 id="trgs510-tool-heading" className="mt-2 text-2xl font-black text-[#f0f6ff]">
            Lagerklassen prüfen
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-[#8fa4c0]">
          Wähle zwei LGK aus. Die Prüfung läuft sofort im Browser und nutzt die hinterlegte
          TRGS-510-Zusammenlagerungstabelle.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <StorageClassSelect
          id="storage-class-one"
          label="Lagerklasse (LGK) Stoff 1"
          value={firstClassId}
          onChange={setFirstClassId}
        />
        <StorageClassSelect
          id="storage-class-two"
          label="Lagerklasse (LGK) Stoff 2"
          value={secondClassId}
          onChange={setSecondClassId}
        />
      </div>

      <div className="mt-8">
        {result ? (
          <Trgs510ResultPanel result={result} />
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-center sm:p-8">
            <p className="text-lg font-bold text-[#f0f6ff]">
              Wähle zwei Lagerklassen aus, um die Zusammenlagerung zu prüfen.
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#8fa4c0]">
              Das Ergebnis zeigt dir, ob Gefahrstoffe zusammenlagern dürfen, getrennt
              oder separat gelagert werden müssen und welche TRGS-510-Regel zu beachten ist.
            </p>
          </div>
        )}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[#8fa4c0]">
        Hinweis: Das Tool ersetzt keine Gefährdungsbeurteilung. Produktangaben aus dem
        Sicherheitsdatenblatt, Lagermengen, Betriebsanweisunguliche Bedingungen und behördliche Vorgaben
        sind zusätzlich zu prüfen.
      </p>
    </section>
  );
}
