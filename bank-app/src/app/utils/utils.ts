export function downloadPdfFromBase64(base64: string, fileName: string = 'reporte.pdf'): void {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.style.display = 'none';

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}

export function openPdfInNewTab(base64: string): void {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  window.open(url, '_blank');

  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export function buildReportFileName(prefix: string = 'reporte', clienteId?: number): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const clientSuffix = clienteId ? `_cliente${clienteId}` : '';
  return `${prefix}${clientSuffix}_${date}.pdf`;
}
