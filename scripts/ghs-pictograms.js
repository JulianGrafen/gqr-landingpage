const GHS_PICTOGRAMS = Object.freeze({
  GHS05: {
    label: "Ätzwirkung",
    src: "/images/ghs/ghs05.svg",
  },
  GHS07: {
    label: "Ausrufezeichen",
    src: "/images/ghs/ghs07.svg",
  },
});

export function getGhsCode(pictogram) {
  const match = pictogram.match(/GHS\d{2}/);
  return match ? match[0] : pictogram;
}

export function getGhsLabel(pictogram) {
  const code = getGhsCode(pictogram);
  return GHS_PICTOGRAMS[code]?.label ?? pictogram.replace(/\s*\(.+\)/, "");
}

export function createGhsPictogramCard(pictogram, className = "") {
  const code = getGhsCode(pictogram);
  const card = document.createElement("article");
  card.className = ["ghs-pictogram-card", className].filter(Boolean).join(" ");

  const svgContainer = document.createElement("span");
  svgContainer.className = "ghs-pictogram-card__svg";

  const pictogramAsset = GHS_PICTOGRAMS[code];
  if (pictogramAsset) {
    const image = document.createElement("img");
    image.className = "ghs-pictogram-svg";
    image.src = pictogramAsset.src;
    image.alt = `${code} ${pictogramAsset.label}`;
    image.loading = "lazy";
    image.decoding = "async";
    svgContainer.append(image);
  }

  const label = document.createElement("strong");
  label.className = "ghs-pictogram-card__label";

  const codeElement = document.createElement("span");
  codeElement.className = "ghs-pictogram-card__code";
  codeElement.textContent = code;

  const labelText = document.createElement("span");
  labelText.textContent = getGhsLabel(pictogram);

  label.append(codeElement, labelText);
  card.append(svgContainer, label);
  return card;
}
