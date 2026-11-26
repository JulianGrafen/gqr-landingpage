/** Startet im Browser den Download generierter Bytes (z. B. clientseitig erzeugtes PDF). */
export function downloadBytes(bytes: Uint8Array, fileName: string, mimeType: string): void {
  const blob = new Blob([bytes as Uint8Array<ArrayBuffer>], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Revoke verzögert, damit Safari den Download sicher startet.
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
