/**
 * Browser-side text extraction for uploaded learning material.
 * TXT/MD/CSV are read directly. PDF and DOCX are binary containers, so a
 * best-effort readable-text pass is used; if that yields too little text the
 * caller falls back to the deterministic generator seeded by the file name.
 */
export async function extractText(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (/\.(txt|md|csv|json)$/.test(name)) {
    return await file.text();
  }

  const buffer = new Uint8Array(await file.arrayBuffer());
  const decoded = new TextDecoder("utf-8", { fatal: false }).decode(buffer);

  if (name.endsWith(".pdf")) {
    const chunks = [...decoded.matchAll(/\(([^()\\]{3,})\)/g)].map((m) => m[1] ?? "");
    const text = chunks.join(" ").replace(/\s+/g, " ").trim();
    return text.length > 200 ? text : "";
  }

  // DOCX and other containers: keep runs of readable characters.
  const readable = decoded
    .replace(/[^\x20-\x7E\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return readable.length > 400 ? readable : "";
}
