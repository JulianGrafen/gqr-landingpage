import {
  DEMO_SUBSTANCE,
  Sicherheitsdatenblatt_EXTRACTION_FIELDS,
  formatFieldValue,
  getEmergencyPath,
} from "./hazard-demo-data.js";
import { createGhsPictogramCard } from "./ghs-pictograms.js";

const PROCESSING_DELAY_MS = 2000;
const QR_CODE_SIZE = 220;

function getRequiredElement(root, selector) {
  const element = root.querySelector(selector);

  if (!element) {
    throw new Error(`Sicherheitsdatenblatt demo element missing: ${selector}`);
  }

  return element;
}

function buildEmergencyUrl(substanceId) {
  return new URL(getEmergencyPath(substanceId), window.location.origin).href;
}

function buildQrCodeUrl(targetUrl) {
  const encodedTarget = encodeURIComponent(targetUrl);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${QR_CODE_SIZE}x${QR_CODE_SIZE}&margin=12&data=${encodedTarget}`;
}

function createPictogramGrid(pictograms) {
  const grid = document.createElement("div");
  grid.className = "Sicherheitsdatenblatt-pictogram-grid";

  pictograms.forEach((pictogram) => {
    grid.append(createGhsPictogramCard(pictogram, "Sicherheitsdatenblatt-pictogram"));
  });

  return grid;
}

function createDataField(field) {
  const fieldElement = document.createElement("article");
  fieldElement.className = "Sicherheitsdatenblatt-data-field";

  if (field.key === "pictograms") {
    fieldElement.classList.add("Sicherheitsdatenblatt-data-field--pictograms");
  }

  if (field.variant === "danger") {
    fieldElement.classList.add("Sicherheitsdatenblatt-data-field--danger");
  }

  const labelElement = document.createElement("span");
  labelElement.className = "Sicherheitsdatenblatt-data-field__label";
  labelElement.textContent = field.label;

  const valueElement = field.key === "pictograms"
    ? createPictogramGrid(DEMO_SUBSTANCE.pictograms)
    : document.createElement("strong");

  if (field.key !== "pictograms") {
    valueElement.className = "Sicherheitsdatenblatt-data-field__value";
    valueElement.textContent = formatFieldValue(DEMO_SUBSTANCE[field.key]);
  }

  fieldElement.append(labelElement, valueElement);
  return fieldElement;
}

function renderExtractedData(dataGrid) {
  const fragment = document.createDocumentFragment();
  Sicherheitsdatenblatt_EXTRACTION_FIELDS.forEach((field) => fragment.append(createDataField(field)));
  dataGrid.replaceChildren(fragment);
}

function setVisibility(element, isVisible) {
  element.hidden = !isVisible;
  element.setAttribute("aria-hidden", String(!isVisible));
}

function initializeSicherheitsdatenblattDemo(root) {
  const fileCard = getRequiredElement(root, "[data-Sicherheitsdatenblatt-file]");
  const dropzone = getRequiredElement(root, "[data-Sicherheitsdatenblatt-dropzone]");
  const output = getRequiredElement(root, "[data-Sicherheitsdatenblatt-output]");
  const processing = getRequiredElement(root, "[data-Sicherheitsdatenblatt-processing]");
  const result = getRequiredElement(root, "[data-Sicherheitsdatenblatt-result]");
  const dataGrid = getRequiredElement(root, "[data-Sicherheitsdatenblatt-data-grid]");
  const productName = getRequiredElement(root, "[data-Sicherheitsdatenblatt-product-name]");
  const qrCode = getRequiredElement(root, "[data-Sicherheitsdatenblatt-qr-code]");
  const emergencyLink = getRequiredElement(root, "[data-Sicherheitsdatenblatt-emergency-link]");

  let isProcessing = false;
  const emergencyUrl = buildEmergencyUrl(DEMO_SUBSTANCE.id);

  productName.textContent = DEMO_SUBSTANCE.productName;
  emergencyLink.href = emergencyUrl;
  qrCode.src = buildQrCodeUrl(emergencyUrl);

  function showProcessingState() {
    setVisibility(output, true);
    setVisibility(processing, true);
    setVisibility(result, false);
    dropzone.classList.add("is-processing");
    dropzone.classList.remove("is-ready");
  }

  function showSuccessState() {
    renderExtractedData(dataGrid);
    setVisibility(processing, false);
    setVisibility(result, true);
    dropzone.classList.remove("is-processing", "is-drag-over");
    dropzone.classList.add("is-ready");
    isProcessing = false;
  }

  function startScan() {
    if (isProcessing) return;

    isProcessing = true;
    showProcessingState();
    window.setTimeout(showSuccessState, PROCESSING_DELAY_MS);
  }

  fileCard.addEventListener("dragstart", (event) => {
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("text/plain", DEMO_SUBSTANCE.id);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.add("is-drag-over");
      event.dataTransfer.dropEffect = "copy";
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, () => {
      dropzone.classList.remove("is-drag-over");
    });
  });

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    startScan();
  });

  [fileCard, dropzone].forEach((element) => {
    element.addEventListener("click", startScan);
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        startScan();
      }
    });
  });
}

document.querySelectorAll("[data-Sicherheitsdatenblatt-demo]").forEach(initializeSicherheitsdatenblattDemo);
