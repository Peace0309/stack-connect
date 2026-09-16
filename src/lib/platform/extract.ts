import mammoth from "mammoth/mammoth.browser";
import * as pdfjsLib from "pdfjs-dist";
// Vite-specific `?url` import: bundles the worker file and gives us its final
// URL, so pdf.js can load it without any manual public/ copy step.
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

/**
 * Browser-side text extraction for uploaded learning material.
 *
 * PDF and DOCX are compressed binary containers — treating their raw bytes
 * as UTF-8 text (as this file previously did) decodes into garbage, and a
 * regex over that garbage matches noise, not real content, which is why
 * generated questions/options could come out as unreadable symbol strings.
 * This now parses each format properly instead of guessing at its bytes.
 */
export async function extractText(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (/\.(txt|md|csv|json)$/.test(name)) {
    return await file.text();
  }

  if (name.endsWith(".pdf")) {
    return extractPdfText(file);
  }

  if (name.endsWith(".docx")) {
    return extractDocxText(file);
  }

  throw new Error(
    `Unsupported file type for "${file.name}". Please upload a PDF, DOCX, TXT, MD or CSV file.`,
  );
}

async function extractPdfText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();

  let text: string;
  try {
    const doc = await pdfjsLib.getDocument({ data: buffer }).promise;
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
      const page = await doc.getPage(pageNumber);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");
      pages.push(pageText);
      await page.cleanup();
    }
    text = pages.join("\n").replace(/[ \t]+/g, " ").trim();
  } catch (error) {
    throw new Error(
      `Could not read "${file.name}" as a PDF: ${error instanceof Error ? error.message : "unknown error"}`,
    );
  }

  if (!text) {
    throw new Error(
      `No extractable text found in "${file.name}". It may be a scanned/image-only PDF, which needs OCR before it can be used here.`,
    );
  }
  return text;
}

async function extractDocxText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();

  let text: string;
  try {
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    text = result.value.trim();
  } catch (error) {
    throw new Error(
      `Could not read "${file.name}" as a DOCX file: ${error instanceof Error ? error.message : "unknown error"}`,
    );
  }

  if (!text) {
    throw new Error(`No extractable text found in "${file.name}".`);
  }
  return text;
}