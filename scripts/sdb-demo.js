import {
  DEMO_SUBSTANCE,
  SDB_EXTRACTION_FIELDS,
  formatFieldValue,
  getEmergencyPath,
} from "./hazard-demo-data.js";
import { createGhsPictogramCard } from "./ghs-pictograms.js";

const PROCESSING_DELAY_MS = 2000;
const QR_CODE_SIZE = 220;
const COMPACT_FIELD_KEYS = new Set([
  "productName",
  "signalWord",
  "pictograms",
  "ufiCode",
  "storageClass",
]);

function getRequiredElement(root, selector) {
  const element = root.querySelector(selector);

  if (!element) {
    throw new Error(`SDB demo element missing: ${selector}`);
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
  grid.className = "sdb-pictogram-grid";

  pictograms.forEach((pictogram) => {
    grid.append(createGhsPictogramCard(pictogram, "sdb-pictogram"));
  });

  return grid;
}

function createDataField(field) {
  const fieldElement = document.createElement("article");
  fieldElement.className = "sdb-data-field";

  if (field.key === "pictograms") {
    fieldElement.classList.add("sdb-data-field--pictograms");
  }

  if (field.variant === "danger") {
    fieldElement.classList.add("sdb-data-field--danger");
  }

  const labelElement = document.createElement("span");
  labelElement.className = "sdb-data-field__label";
  labelElement.textContent = field.label;

  const valueElement = field.key === "pictograms"
    ? createPictogramGrid(DEMO_SUBSTANCE.pictograms)
    : document.createElement("strong");

  if (field.key !== "pictograms") {
    valueElement.className = "sdb-data-field__value";
    valueElement.textContent = formatFieldValue(DEMO_SUBSTANCE[field.key]);
  }

  fieldElement.append(labelElement, valueElement);
  return fieldElement;
}

function getExtractionFields(root) {
  if (root.dataset.sdbVariant !== "compact") {
    return SDB_EXTRACTION_FIELDS;
  }

  return SDB_EXTRACTION_FIELDS.filter((field) => COMPACT_FIELD_KEYS.has(field.key));
}

function renderExtractedData(dataGrid, fields) {
  const fragment = document.createDocumentFragment();
  fields.forEach((field) => fragment.append(createDataField(field)));
  dataGrid.replaceChildren(fragment);
}

function setVisibility(element, isVisible) {
  element.hidden = !isVisible;
  element.setAttribute("aria-hidden", String(!isVisible));
}

function initializeSdbDemo(root) {
  const fileCard = getRequiredElement(root, "[data-sdb-file]");
  const dropzone = getRequiredElement(root, "[data-sdb-dropzone]");
  const output = getRequiredElement(root, "[data-sdb-output]");
  const processing = getRequiredElement(root, "[data-sdb-processing]");
  const result = getRequiredElement(root, "[data-sdb-result]");
  const dataGrid = getRequiredElement(root, "[data-sdb-data-grid]");
  const productName = getRequiredElement(root, "[data-sdb-product-name]");
  const qrCode = getRequiredElement(root, "[data-sdb-qr-code]");
  const emergencyLink = getRequiredElement(root, "[data-sdb-emergency-link]");
  const extractionFields = getExtractionFields(root);

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
    renderExtractedData(dataGrid, extractionFields);
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

document.querySelectorAll("[data-sdb-demo]").forEach(initializeSdbDemo);
