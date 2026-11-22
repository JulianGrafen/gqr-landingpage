import { buildRoiViewModel } from '@/lib/roi-calculator/buildRoiViewModel';
import {
  ROI_CLIENT_SLIDER,
  ROI_SUBSTANCE_SLIDER,
  type RoiCalculatorMode,
} from '@/lib/roi-calculator/computeTimeSavings';
import { ROI_COPY } from '@/lib/roi-calculator/roi-copy';

function parseMode(value: string | null): RoiCalculatorMode {
  return value === 'sifa' ? 'sifa' : 'kmu';
}

function setText(el: Element | null, value: string): void {
  if (el) el.textContent = value;
}

function syncModeThumb(modeRoot: HTMLElement): void {
  const thumb = modeRoot.querySelector<HTMLElement>('[data-roi-mode-thumb]');
  const active = modeRoot.querySelector<HTMLElement>('.roi-mode__btn.is-active');
  if (!thumb || !active) return;

  const rootRect = modeRoot.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  thumb.style.width = `${activeRect.width}px`;
  thumb.style.transform = `translate3d(${activeRect.left - rootRect.left}px, 0, 0)`;
}

function initCard(card: HTMLElement): void {
  const modeRoot = card.querySelector<HTMLElement>('.roi-mode');
  const modeButtons = card.querySelectorAll<HTMLElement>('[data-roi-mode]');
  const substanceSlider = card.querySelector<HTMLInputElement>('[data-roi-substance-slider]');
  const clientSlider = card.querySelector<HTMLInputElement>('[data-roi-client-slider]');
  const clientsWrap = card.querySelector<HTMLElement>('[data-roi-clients-wrap]');
  const substanceLabel = card.querySelector('[data-roi-substance-label]');
  const substanceValue = card.querySelector('[data-roi-substance-value]');
  const clientValue = card.querySelector('[data-roi-client-value]');
  const totalEl = card.querySelector('[data-roi-total]');
  const traditionalValueEl = card.querySelector('[data-roi-traditional-value]');
  const traditionalUnitEl = card.querySelector('[data-roi-traditional-unit]');
  const digitalValueEl = card.querySelector('[data-roi-digital-value]');
  const digitalUnitEl = card.querySelector('[data-roi-digital-unit]');
  const savedValueEl = card.querySelector('[data-roi-saved-value]');
  const savedUnitEl = card.querySelector('[data-roi-saved-unit]');
  const costLabelEl = card.querySelector('[data-roi-cost-label]');
  const costValueEl = card.querySelector('[data-roi-cost-value]');
  const costHintEl = card.querySelector('[data-roi-cost-hint]');
  const roiLineEl = card.querySelector<HTMLElement>('[data-roi-roi-line]');
  const ctaHoursEls = card.querySelectorAll('[data-roi-cta-hours]');

  if (!substanceSlider) return;
  const substancesInput = substanceSlider;

  let mode: RoiCalculatorMode = 'kmu';
  let kmuSubstances: number = ROI_SUBSTANCE_SLIDER.kmuDefault;
  let sifaSubstances: number = ROI_SUBSTANCE_SLIDER.sifaDefault;
  let clientCount: number = ROI_CLIENT_SLIDER.default;

  function currentSubstances(): number {
    return mode === 'sifa' ? sifaSubstances : kmuSubstances;
  }

  function render(): void {
    const view = buildRoiViewModel({
      mode,
      substancesPerScope: currentSubstances(),
      clientCount,
    });

    setText(substanceValue, String(currentSubstances()));
    setText(clientValue, String(clientCount));
    setText(totalEl, view.totalSubstancesText);
    setText(traditionalValueEl, view.traditional.value);
    setText(traditionalUnitEl, view.traditional.unit);
    setText(digitalValueEl, view.digital.value);
    setText(digitalUnitEl, view.digital.unit);
    setText(savedValueEl, view.saved.value);
    setText(savedUnitEl, view.saved.unit);
    setText(costLabelEl, view.costLabel);
    setText(costValueEl, view.costEurFormatted);
    setText(costHintEl, ` ${view.costHint}`);
    ctaHoursEls.forEach((el) => {
      el.textContent = `\u00a0${view.savedHoursLabel}\u00a0`;
    });

    if (roiLineEl) {
      if (view.roiLine) {
        roiLineEl.hidden = false;
        roiLineEl.textContent = view.roiLine;
      } else {
        roiLineEl.hidden = true;
        roiLineEl.textContent = '';
      }
    }
  }

  function setMode(nextMode: RoiCalculatorMode): void {
    mode = nextMode;
    modeButtons.forEach((btn) => {
      const active = parseMode(btn.getAttribute('data-roi-mode')) === mode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    setText(substanceLabel, mode === 'sifa' ? ROI_COPY.sifaSubstanceLabel : ROI_COPY.kmuSubstanceLabel);
    if (clientsWrap) clientsWrap.hidden = mode !== 'sifa';

    substancesInput.value = String(currentSubstances());
    if (clientSlider) clientSlider.value = String(clientCount);

    if (modeRoot) {
      requestAnimationFrame(() => {
        syncModeThumb(modeRoot);
      });
    }
    render();
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setMode(parseMode(btn.getAttribute('data-roi-mode')));
    });
  });

  substancesInput.addEventListener('input', () => {
    const next = Number.parseInt(substancesInput.value, 10);
    if (mode === 'sifa') sifaSubstances = next;
    else kmuSubstances = next;
    render();
  });

  if (clientSlider) {
    clientSlider.addEventListener('input', () => {
      clientCount = Number.parseInt(clientSlider.value, 10);
      render();
    });
  }

  if (modeRoot) {
    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        syncModeThumb(modeRoot);
      }, 100);
    });
  }

  setMode('kmu');
}

document.querySelectorAll<HTMLElement>('[data-roi-calculator]').forEach(initCard);
