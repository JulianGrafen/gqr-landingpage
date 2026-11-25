'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  PRICING_DEFAULT_PERSONA,
  type PricingBillingInterval,
  type PricingPersonaId,
  PRICING_DEFAULT_BILLING,
} from '@/lib/pricing-config';

/** Ausdrücklich per URL gewählte Zielgruppe (`?tab=sifa` oder `#preise?tab=sifa`), sonst `null`. */
function readExplicitPersonaFromLocation(): PricingPersonaId | null {
  if (typeof window === 'undefined') return null;

  const search = new URLSearchParams(window.location.search);
  if (search.get('tab') === 'sifa') return 'sifa';

  const hash = window.location.hash;
  const queryInHash = hash.indexOf('?');
  if (queryInHash >= 0) {
    const hashParams = new URLSearchParams(hash.slice(queryInHash + 1));
    if (hashParams.get('tab') === 'sifa') return 'sifa';
  }

  return null;
}

/**
 * `#preise?tab=sifa` ist kein gültiger Element-Anker: Der Browser scrollt nicht von selbst.
 * Scrollt daher zur Sektion vor dem `?` (z. B. Hero-Link „Multi-Mandant ansehen“).
 */
function scrollToHashSectionWithQuery(): void {
  const { hash } = window.location;
  const queryInHash = hash.indexOf('?');
  if (queryInHash <= 1) return;

  document.getElementById(hash.slice(1, queryInHash))?.scrollIntoView({ block: 'start' });
}

function writeTabToUrl(persona: PricingPersonaId): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  const onPricingRoute = url.pathname.replace(/\/$/, '') === '/pricing';

  if (onPricingRoute) {
    if (persona === 'sifa') url.searchParams.set('tab', 'sifa');
    else url.searchParams.delete('tab');
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    return;
  }

  const hashBase = url.hash.split('?')[0] || '#preise';
  if (persona === 'sifa') {
    window.history.replaceState(null, '', `${url.pathname}${url.search}${hashBase}?tab=sifa`);
  } else {
    const cleanedHash = hashBase === '#preise' || hashBase === '' ? '#preise' : hashBase;
    window.history.replaceState(null, '', `${url.pathname}${url.search}${cleanedHash}`);
  }
}

export interface PricingUrlState {
  persona: PricingPersonaId;
  billing: PricingBillingInterval;
  setPersona: (persona: PricingPersonaId) => void;
  setBilling: (billing: PricingBillingInterval) => void;
}

export function usePricingUrlState(initialPersona?: PricingPersonaId): PricingUrlState {
  const [persona, setPersonaState] = useState<PricingPersonaId>(initialPersona ?? PRICING_DEFAULT_PERSONA);
  const [billing, setBillingState] = useState<PricingBillingInterval>(PRICING_DEFAULT_BILLING);

  useEffect(() => {
    setPersonaState(readExplicitPersonaFromLocation() ?? PRICING_DEFAULT_PERSONA);
    scrollToHashSectionWithQuery();

    /** In-Page-Links wie `#preise?tab=sifa` lösen nur `hashchange` aus, keinen erneuten Mount. */
    const syncPersonaFromHashLink = () => {
      const explicitPersona = readExplicitPersonaFromLocation();
      if (!explicitPersona) return;
      setPersonaState(explicitPersona);
      scrollToHashSectionWithQuery();
    };

    window.addEventListener('hashchange', syncPersonaFromHashLink);
    return () => window.removeEventListener('hashchange', syncPersonaFromHashLink);
  }, []);

  const setPersona = useCallback((next: PricingPersonaId) => {
    setPersonaState(next);
    writeTabToUrl(next);
  }, []);

  const setBilling = useCallback((next: PricingBillingInterval) => {
    setBillingState(next);
  }, []);

  return { persona, billing, setPersona, setBilling };
}