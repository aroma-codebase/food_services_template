export const downloadPdfFromHtml = async (html, filename) => {
  if (typeof document === 'undefined') {
    throw new Error('PDF download requires a browser environment.');
  }

  console.debug('[PDF] start', { filename, htmlLength: html.length });

  const html2pdfModule = await import('html2pdf.js');
  const html2pdf = html2pdfModule.default ?? html2pdfModule;
  const iframe = document.createElement('iframe');

  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.position = 'fixed';
  iframe.style.left = '-10000px';
  iframe.style.top = '0';
  iframe.style.width = '794px';
  iframe.style.height = '1123px';
  iframe.style.border = '0';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';

  document.body.appendChild(iframe);

  try {
    const iframeDocument = iframe.contentDocument;

    if (!iframeDocument) {
      throw new Error('Unable to create PDF render document.');
    }

    iframeDocument.open();
    iframeDocument.write(html);
    iframeDocument.close();

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    if (iframeDocument.fonts?.ready) {
      await iframeDocument.fonts.ready;
    }

    const contentNode = iframeDocument.body?.firstElementChild;

    console.debug('[PDF] render check', {
      childCount: iframeDocument.body?.children.length ?? 0,
      textLength: iframeDocument.body?.textContent?.trim().length ?? 0,
      hasContentNode: Boolean(contentNode),
    });

    if (!contentNode) {
      throw new Error('PDF content failed to render into the iframe.');
    }

    await html2pdf()
      .set({
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: {
          unit: 'pt',
          format: 'a4',
          orientation: 'portrait',
        },
      })
      .from(contentNode)
      .save();

    console.debug('[PDF] complete', { filename });
  } finally {
    iframe.remove();
  }
};