import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

/**
 * Generates a PDF from a DOM element and opens it in a new tab
 * @param element - The HTML element to convert to PDF
 * @returns Promise that resolves when PDF is generated and opened
 */
export const generatePDF = async (element: HTMLElement): Promise<void> =>
{
  // Store original styles to restore later
  const originalStyles = {
    width: element.style.width,
    maxWidth: element.style.maxWidth,
    minWidth: element.style.minWidth,
    position: element.style.position,
    left: element.style.left,
    top: element.style.top,
  };

  // Store gradient text modifications
  const gradientTextModifications: Array<{
    element: HTMLElement;
    originalColor: string;
    originalBackground: string;
    originalWebkitBackgroundClip: string;
    originalBackgroundClip: string;
  }> = [];

  // Store grid layout modifications
  const gridModifications: Array<{
    element: HTMLElement;
    originalGridTemplateColumns: string;
    originalDisplay: string;
  }> = [];

  // Store text spacing modifications
  const textSpacingModifications: Array<{
    element: HTMLElement;
    originalWhiteSpace: string;
    originalWordSpacing: string;
    originalLetterSpacing: string;
  }> = [];

  // Elements that should be hidden during PDF capture (must be defined for restore path)
  let noPdfElements: NodeListOf<Element> = element.querySelectorAll(".no-pdf");

  const restoreElementStyles = () =>
  {
    element.style.width = originalStyles.width;
    element.style.maxWidth = originalStyles.maxWidth;
    element.style.minWidth = originalStyles.minWidth;
    element.style.position = originalStyles.position;
    element.style.left = originalStyles.left;
    element.style.top = originalStyles.top;

    gradientTextModifications.forEach(
      ({
        element: el,
        originalColor,
        originalBackground,
        originalWebkitBackgroundClip,
        originalBackgroundClip,
      }) =>
      {
        el.style.color = originalColor;
        el.style.background = originalBackground;
        el.style.webkitBackgroundClip = originalWebkitBackgroundClip;
        el.style.backgroundClip = originalBackgroundClip;
      }
    );

    gridModifications.forEach(
      ({ element: el, originalGridTemplateColumns, originalDisplay }) =>
      {
        el.style.gridTemplateColumns = originalGridTemplateColumns;
        el.style.display = originalDisplay;
      }
    );

    textSpacingModifications.forEach(
      ({ element: el, originalWhiteSpace, originalWordSpacing, originalLetterSpacing }) =>
      {
        el.style.whiteSpace = originalWhiteSpace;
        el.style.wordSpacing = originalWordSpacing;
        el.style.letterSpacing = originalLetterSpacing;
      }
    );

    noPdfElements.forEach((el) =>
    {
      (el as HTMLElement).style.display = "";
    });
  };

  try
  {
    // Hide elements that shouldn't be in PDF
    noPdfElements = element.querySelectorAll(".no-pdf");
    noPdfElements.forEach((el) =>
    {
      (el as HTMLElement).style.display = "none";
    });

    // Temporarily set optimal width for PDF capture (1280px = max-w-7xl)
    element.style.width = "1280px";
    element.style.maxWidth = "1280px";
    element.style.minWidth = "1280px";
    element.style.position = "relative";
    element.style.left = "0";
    element.style.top = "0";

    // Fix gradient text - replace with solid color #3c3c99
    const gradientTextElements = element.querySelectorAll(
      ".gradient-text, .bg-clip-text, .text-transparent"
    );
    gradientTextElements.forEach((el) =>
    {
      const htmlEl = el as HTMLElement;
      gradientTextModifications.push({
        element: htmlEl,
        originalColor: htmlEl.style.color,
        originalBackground: htmlEl.style.background,
        originalWebkitBackgroundClip: htmlEl.style.webkitBackgroundClip,
        originalBackgroundClip: htmlEl.style.backgroundClip,
      });

      // Replace gradient with solid color
      htmlEl.style.color = "#000000";
      htmlEl.style.background = "none";
      htmlEl.style.webkitBackgroundClip = "unset";
      htmlEl.style.backgroundClip = "unset";
    });

    // Fix text spacing in multi-line text blocks (preserve spaces during PDF rendering)
    // Only apply to elements that are likely to have line breaks
    const textBlocks = element.querySelectorAll("p, li, .text-left, .space-y-1 > p");
    textBlocks.forEach((el) =>
    {
      const htmlEl = el as HTMLElement;
      
      // Only modify if it's a paragraph with actual content (not a label)
      if (htmlEl.textContent && htmlEl.textContent.length > 20) {
        textSpacingModifications.push({
          element: htmlEl,
          originalWhiteSpace: htmlEl.style.whiteSpace,
          originalWordSpacing: htmlEl.style.wordSpacing,
          originalLetterSpacing: htmlEl.style.letterSpacing,
        });

        htmlEl.style.whiteSpace = "normal";
        htmlEl.style.wordSpacing = "normal";
        htmlEl.style.letterSpacing = "normal";
      }
    });

    // Force 3-column grid for schedule boxes (md:grid-cols-3)
    const scheduleGrids = element.querySelectorAll(
      "section.grid.md\\:grid-cols-3, section.grid.grid-cols-1.md\\:grid-cols-3"
    );
    scheduleGrids.forEach((el) =>
    {
      const htmlEl = el as HTMLElement;
      gridModifications.push({
        element: htmlEl,
        originalGridTemplateColumns: htmlEl.style.gridTemplateColumns,
        originalDisplay: htmlEl.style.display,
      });

      // Force 3 columns with display grid
      htmlEl.style.display = "grid";
      htmlEl.style.gridTemplateColumns = "repeat(3, 1fr)";
    });

    // Force 2-column grid (5fr 3fr) for donut chart inner layout
    const donutChartGrids = element.querySelectorAll(
      ".grid.md\\:grid-cols-\\[5fr_3fr\\], .grid.grid-cols-1.md\\:grid-cols-\\[5fr_3fr\\]"
    );
    donutChartGrids.forEach((el) =>
    {
      const htmlEl = el as HTMLElement;
      gridModifications.push({
        element: htmlEl,
        originalGridTemplateColumns: htmlEl.style.gridTemplateColumns,
        originalDisplay: htmlEl.style.display,
      });

      // Force 5fr 3fr layout
      htmlEl.style.display = "grid";
      htmlEl.style.gridTemplateColumns = "5fr 3fr";
    });

    // Force 2-column grid (2fr 3fr) for donut chart and KPI section
    const donutKpiGrids = element.querySelectorAll(
      "section.grid.lg\\:grid-cols-\\[2fr_3fr\\], section.grid.grid-cols-1.lg\\:grid-cols-\\[2fr_3fr\\]"
    );
    donutKpiGrids.forEach((el) =>
    {
      const htmlEl = el as HTMLElement;
      gridModifications.push({
        element: htmlEl,
        originalGridTemplateColumns: htmlEl.style.gridTemplateColumns,
        originalDisplay: htmlEl.style.display,
      });

      // Force 2fr 3fr layout
      htmlEl.style.display = "grid";
      htmlEl.style.gridTemplateColumns = "2fr 3fr";
    });

    // Wait for layout reflow and charts to render
    await new Promise((resolve) => setTimeout(resolve, 300));

    const blocksContainer =
      (element.querySelector(".space-y-8") as HTMLElement | null) ?? element;

    const scale = getCanvasScale();

    // A4 page dimensions in mm (symmetric margins for predictable print layout)
    const pdfWidth = 210;
    const pdfHeight = 297;
    const pageMarginX = 14;
    const pageMarginY = 14;
    const contentWidth = pdfWidth - pageMarginX * 2;
    const contentHeight = pdfHeight - pageMarginY * 2;

    // Create PDF document
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const renderBlockCanvas = async (target: HTMLElement) =>
    {
      return html2canvas(target, {
        scale,
        width: Math.ceil(target.getBoundingClientRect().width),
        windowWidth: 1280,
        allowTaint: true,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -window.scrollY,
        x: 0,
        y: 0,
      });
    };

    const addCanvasSliceToPdf = (
      sourceCanvas: HTMLCanvasElement,
      srcY: number,
      srcHeight: number,
      isFirstPage: boolean
    ) =>
    {
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = sourceCanvas.width;
      sliceCanvas.height = srcHeight;
      const sliceCtx = sliceCanvas.getContext("2d");

      if (!sliceCtx)
      {
        throw new Error("Failed to get canvas context");
      }

      sliceCtx.drawImage(
        sourceCanvas,
        0,
        srcY,
        sourceCanvas.width,
        srcHeight,
        0,
        0,
        sourceCanvas.width,
        srcHeight
      );

      const sliceImgData = sliceCanvas.toDataURL("image/png");
      const pxToMm = contentWidth / sourceCanvas.width;
      const sliceHeightMM = srcHeight * pxToMm;

      if (!isFirstPage)
      {
        pdf.addPage();
      }

      pdf.addImage(
        sliceImgData,
        "PNG",
        pageMarginX,
        pageMarginY,
        contentWidth,
        sliceHeightMM
      );
    };

    const addBlockCanvasToPdf = (
      blockCanvas: HTMLCanvasElement,
      cursorY: number,
      pageIndex: number
    ) =>
    {
      const pxToMm = contentWidth / blockCanvas.width;
      const blockHeightMm = blockCanvas.height * pxToMm;

      if (
        blockHeightMm <= contentHeight &&
        cursorY + blockHeightMm <= contentHeight
      )
      {
        const blockImgData = blockCanvas.toDataURL("image/png");
        if (pageIndex > 0 && cursorY === 0)
        {
          pdf.addPage();
        }
        pdf.addImage(
          blockImgData,
          "PNG",
          pageMarginX,
          pageMarginY + cursorY,
          contentWidth,
          blockHeightMm
        );

        return {
          cursorY: cursorY + blockHeightMm,
          pageIndex: pageIndex + (cursorY === 0 ? 1 : 0),
        };
      }

      const pageHeightPx = Math.floor(contentHeight / pxToMm);
      let srcY = 0;
      let isFirstSliceOnPage = cursorY > 0;
      let nextCursorY = cursorY;
      let nextPageIndex = pageIndex;

      if (cursorY > 0)
      {
        nextCursorY = 0;
        isFirstSliceOnPage = false;
      }

      while (srcY < blockCanvas.height)
      {
        const remainingHeight = blockCanvas.height - srcY;
        const sliceHeight = Math.min(pageHeightPx, remainingHeight);

        addCanvasSliceToPdf(
          blockCanvas,
          srcY,
          sliceHeight,
          nextPageIndex === 0 && !isFirstSliceOnPage
        );

        srcY += sliceHeight;
        nextPageIndex++;
        nextCursorY = 0;
        isFirstSliceOnPage = false;
      }

      return {
        cursorY: nextCursorY,
        pageIndex: nextPageIndex,
      };
    };

    type SequenceItem =
      | { type: "break" }
      | { type: "block"; element: HTMLElement; gapBeforePx: number };

    const sequence: SequenceItem[] = [];
    const cssPxToMm = contentWidth / 1280;
    let previousBottom = 0;

    Array.from(blocksContainer.children).forEach((child) =>
    {
      const htmlEl = child as HTMLElement;
      if (!htmlEl?.getBoundingClientRect) return;

      if (htmlEl.classList?.contains("pdf-page-break"))
      {
        sequence.push({ type: "break" });
        previousBottom = 0;
        return;
      }
      if (htmlEl.tagName === "BR") return;
      if (htmlEl.classList?.contains("no-pdf")) return;

      const rect = htmlEl.getBoundingClientRect();
      const gapBeforePx =
        previousBottom > 0 ? Math.max(0, rect.top - previousBottom) : 0;

      sequence.push({
        type: "block",
        element: htmlEl,
        gapBeforePx,
      });
      previousBottom = rect.bottom;
    });

    let cursorY = 0;
    let pageIndex = 0;

    for (const item of sequence)
    {
      await new Promise((resolve) => setTimeout(resolve, 0));

      if (item.type === "break")
      {
        if (pageIndex > 0 || cursorY > 0)
        {
          cursorY = 0;
        }
        continue;
      }

      const gapBeforeMm = item.gapBeforePx * cssPxToMm;
      const blockCanvas = await renderBlockCanvas(item.element);
      const pxToMmBlock = contentWidth / blockCanvas.width;
      const blockHeightMm = blockCanvas.height * pxToMmBlock;

      if (cursorY > 0 && cursorY + gapBeforeMm + blockHeightMm <= contentHeight)
      {
        cursorY += gapBeforeMm;
      } else if (cursorY > 0 && cursorY + blockHeightMm > contentHeight)
      {
        cursorY = 0;
      }

      const result = addBlockCanvasToPdf(blockCanvas, cursorY, pageIndex);
      cursorY = result.cursorY;
      pageIndex = result.pageIndex;
    }

    // Trigger a direct download instead of opening a preview tab
    const filename = generatePDFFilename();
    restoreElementStyles();
    pdf.save(filename);

  } catch (error)
  {
    restoreElementStyles();
    console.error("Error generating PDF:", error);
    throw new Error(
      `Failed to generate PDF: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const generatePDFFilename = (
  prefix: string = "SkillSnapshot",
  suffix?: string
): string =>
{
  const date = new Date();
  const dateStr = date.toISOString().split("T")[0];

  if (suffix)
  {
    const cleanSuffix = suffix.replace(/[^a-zA-Z0-9]/g, "_");
    return `${prefix}_${cleanSuffix}_${dateStr}.pdf`;
  }

  return `${prefix}_${dateStr}.pdf`;
};

const getCanvasScale = () =>
{
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;

  // Base scale tuned for 1280px capture
  let baseScale = 2;

  if (width < 768) baseScale = 2.8; // small laptops
  else if (width < 1440) baseScale = 2.6; // typical laptops
  else baseScale = 1.85; // large / external monitors

  // Normalize by DPR
  return baseScale / dpr;
};
