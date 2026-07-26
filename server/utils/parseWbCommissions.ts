export interface WbCommissionRow {
  parentCategory: string;
  subject: string;
  fbw: number | null; // «Склад WB» (Fulfillment by WB)
  fbs: number | null; // «Маркетплейс» (Fulfillment by Seller)
  dbs: number | null; // «Витрина»/«Курьер WB»/«Доставка в ПВЗ»
  edbs: number | null; // «Витрина экспресс»
  cnc: number | null; // Самовывоз из магазина продавца (Click & Collect)
  booking: number | null; // Бронирование
}

// "26,5" -> 26.5, "-" -> null
function toNum(raw: string): number | null {
  if (!raw || raw === "-" || raw.trim() === "") return null;
  const cleaned = raw.replace(",", ".").trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

// Разлепляет "253" -> ["25", "3"], "153" -> ["15", "3"] и т.п.
// WB часто склеивает целые числа с EDBS=3%
function splitGluedEdbs(token: string): [string, string] {
  // Паттерн: 2-3 цифры + "3" в конце (например, "253", "153", "353")
  if (/^\d{2,3}3$/.test(token) && token.length > 1) {
    const head = token.slice(0, -1);
    return [head, "3"];
  }
  return [token, ""];
}

export function parseWbCommissionsText(rawText: string): WbCommissionRow[] {
  const lines = rawText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .filter((l) => !/^Таблица со значениями/.test(l))
    .filter((l) => !/^Вступает в силу/.test(l))
    .filter((l) => !/^Название родителя/.test(l))
    .filter((l) => !/^Категория/.test(l));

  const numToken = /^-?\d+(?:,\d+)?$|^-$/;

  const rows: WbCommissionRow[] = [];
  let textBuffer: string[] = [];

  const flushRow = (nums: string[]) => {
    if (textBuffer.length === 0) return;
    const label = textBuffer.join(" ").replace(/\s+/g, " ").trim();
    textBuffer = [];

    rows.push({
      parentCategory: label,
      subject: "",
      fbw: toNum(nums[0]),
      fbs: toNum(nums[1]),
      dbs: toNum(nums[2]),
      edbs: toNum(nums[3]),
      cnc: toNum(nums[4]),
      booking: toNum(nums[5]),
    });
  };

  for (const line of lines) {
    const parts = line.split(/\s+/);
    let i = parts.length - 1;
    let collected: string[] = [];

    while (i >= 0 && collected.length < 6) {
      const [head, glued] = splitGluedEdbs(parts[i]);
      if (glued) {
        collected.unshift(glued); // EDBS
        collected.unshift(head); // DBS
        i--;
        continue;
      }
      if (numToken.test(parts[i])) {
        collected.unshift(parts[i]);
        i--;
      } else {
        break;
      }
    }

    if (collected.length >= 6) {
      const nums = collected.slice(-6);
      const labelPart = parts.slice(0, i + 1).join(" ");
      if (labelPart) textBuffer.push(labelPart);
      flushRow(nums);
    } else {
      textBuffer.push(line);
    }
  }

  return rows;
}
