import { parseWbCommissionsText } from "./parseWbCommissions";

const PDF_URL =
  "https://static-basket-02.wbbasket.ru/vol20/education/instruction/Koeffitsient_voznagrazhdeniia_Wildberries.pdf";

export interface WbCommissionsData {
  updatedAt: string;
  source: string;
  rows: WbCommissionRow[];
}

export async function fetchWbCommissions(): Promise<WbCommissionsData> {
  const pdfParse = (await import("pdf-parse")).default;

  const res = await fetch(PDF_URL, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; UnitEconomicsBot/1.0)",
    },
  });

  if (!res.ok) {
    throw new Error(`WB PDF fetch failed: ${res.status} ${res.statusText}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const { text } = await pdfParse(buffer);
  const rows = parseWbCommissionsText(text);

  if (rows.length < 50) {
    throw new Error(
      `Suspiciously few rows parsed: ${rows.length}. PDF structure may have changed.`,
    );
  }

  return {
    updatedAt: new Date().toISOString(),
    source: PDF_URL,
    rows,
  };
}
