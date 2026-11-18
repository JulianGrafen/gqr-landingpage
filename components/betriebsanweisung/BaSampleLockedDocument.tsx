import type { ReactNode } from 'react';
import {
  BA_SHEET,
  BaSheetFrame,
  BaSheetHeader,
  BaSheetIdentification,
  BaSheetLockedTail,
  BaSheetRedactedLine,
  BaSheetSection,
  BaSheetSymbolTextRow,
  REDACTED_TEXT,
  REDACTED_VALUE_CLASS,
  formatBaIssueDate,
} from '@/components/betriebsanweisung/ba-document-sheet';
import { PROTECTIVE_EQUIPMENT_SIGNS } from '@/config/betriebsanweisung/ba-document-symbols';
import { LIVE_PREVIEW_COPY as copy } from '@/config/betriebsanweisung/live-preview-copy';

type Props = {
  substanceName: string;
  applicationArea: string;
  /** Upload-Overlay über dem gesperrten Inhalt. */
  overlay: ReactNode;
};

/** Generische Schutzzeichen (keine stoffspezifischen Angaben im Web, siehe `HazardousSubstanceSeoEntry`). */
const SAMPLE_PROTECTION_SIGNS = [PROTECTIVE_EQUIPMENT_SIGNS.eye_protection, PROTECTIVE_EQUIPMENT_SIGNS.hand_protection];

/** Neutrale GHS-Raute als Platzhalter — konkrete Piktogramme erst nach SDB-Extraktion. */
function GhsPlaceholderDiamond() {
  return (
    <span className="flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12" aria-hidden="true">
      <span className="h-7 w-7 rotate-45 border-[2.5px] border-solid border-[#DC2626] bg-white sm:h-8 sm:w-8" />
    </span>
  );
}

/**
 * Muster-BA vor dem SDB-Upload: dasselbe HTML-Blatt wie die Live-Vorschau
 * (`BaLiveExtractedDocument`), Kopf + Stoffname scharf, alle Inhalte geblurrt.
 * Ersetzt die frühere PDF-iframe-Ausschnittslösung (browserabhängig, mobil leer).
 */
export function BaSampleLockedDocument({ substanceName, applicationArea, overlay }: Props) {
  return (
    <BaSheetFrame>
      <BaSheetHeader
        manufacturer={<span className={REDACTED_VALUE_CLASS}>Hersteller GmbH</span>}
        applicationArea={applicationArea}
        issuedOn={formatBaIssueDate()}
      />
      <BaSheetIdentification tradeName={substanceName} />

      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none">
          <BaSheetSection title={copy.sectionTitles.hazards}>
            <div className="flex">
              <div className={`${BA_SHEET.symbolColumn} blur-[3px]`}>
                <GhsPlaceholderDiamond />
                <GhsPlaceholderDiamond />
              </div>
              <div className={BA_SHEET.textColumn}>
                <BaSheetRedactedLine text="Gefahr" />
                <BaSheetRedactedLine text={REDACTED_TEXT.long} />
                <BaSheetRedactedLine text={REDACTED_TEXT.short} />
                <BaSheetRedactedLine text={REDACTED_TEXT.short} />
              </div>
            </div>
          </BaSheetSection>

          <BaSheetSection title={copy.sectionTitles.protection}>
            <BaSheetSymbolTextRow symbols={SAMPLE_PROTECTION_SIGNS}>
              <BaSheetRedactedLine text={REDACTED_TEXT.long} />
              <BaSheetRedactedLine text={REDACTED_TEXT.short} />
              <BaSheetRedactedLine text={REDACTED_TEXT.long} />
            </BaSheetSymbolTextRow>
          </BaSheetSection>

          <BaSheetLockedTail />
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/0 via-white/35 to-white/70">{overlay}</div>
      </div>
    </BaSheetFrame>
  );
}
