import { DEMO_SUBSTANCE, formatFieldValue } from "./hazard-demo-data.js";
import { createGhsPictogramCard } from "./ghs-pictograms.js";

function getRequiredElement(root, selector) {
  const element = root.querySelector(selector);

  if (!element) {
    throw new Error(`Emergency view element missing: ${selector}`);
  }

  return element;
}

function renderPictograms(container, pictograms) {
  const fragment = document.createDocumentFragment();
  pictograms.forEach((pictogram) => {
    fragment.append(createGhsPictogramCard(pictogram, "qr-pictogram"));
  });
  container.replaceChildren(fragment);
}

function initializeEmergencyView(root) {
  getRequiredElement(root, "[data-emergency-product-name]").textContent =
    DEMO_SUBSTANCE.productName;
  getRequiredElement(root, "[data-emergency-signal-word]").textContent =
    DEMO_SUBSTANCE.signalWord.toUpperCase();
  getRequiredElement(root, "[data-emergency-supplier]").textContent =
    DEMO_SUBSTANCE.supplier;
  getRequiredElement(root, "[data-emergency-ufi]").textContent =
    DEMO_SUBSTANCE.ufiCode;
  getRequiredElement(root, "[data-emergency-wgk]").textContent =
    DEMO_SUBSTANCE.waterHazardClass;
  getRequiredElement(root, "[data-emergency-hazard-statements]").textContent =
    formatFieldValue(DEMO_SUBSTANCE.hazardStatements);
  getRequiredElement(root, "[data-emergency-precautionary-statements]").textContent =
    formatFieldValue(DEMO_SUBSTANCE.precautionaryStatements);
  getRequiredElement(root, "[data-emergency-first-aid]").textContent =
    DEMO_SUBSTANCE.firstAid;
  renderPictograms(
    getRequiredElement(root, "[data-emergency-pictograms]"),
    DEMO_SUBSTANCE.pictograms,
  );
}

document.querySelectorAll("[data-emergency-view]").forEach(initializeEmergencyView);
