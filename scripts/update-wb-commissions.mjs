// import { writeFile } from "node:fs/promises";
// import { join, dirname } from "node:path";
// import { fileURLToPath } from "node:url";
// import { createRequire } from "node:module";

// const require = createRequire(import.meta.url);
// const pdfParseModule = require("pdf-parse");
// const pdfParse = pdfParseModule.default || pdfParseModule; // Защита от ESM/CJS конфликтов

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const PDF_URL =
//   "https://static-basket-02.wbbasket.ru/vol20/education/instruction/Koeffitsient_voznagrazhdeniia_Wildberries.pdf";

// function toNum(raw) {
//   if (!raw || raw === "-" || raw.trim() === "") return null;
//   const cleaned = raw.replace(",", ".").trim();
//   const num = parseFloat(cleaned);
//   return isNaN(num) ? null : num;
// }

// function splitGluedEdbs(token) {
//   if (/^\d{2,3}3$/.test(token) && token.length > 1) {
//     return [token.slice(0, -1), "3"];
//   }
//   return [token, ""];
// }

// function parseWbCommissionsText(rawText) {
//   const lines = rawText
//     .split("\n")
//     .map((l) => l.trim())
//     .filter((l) => l.length > 0)
//     .filter((l) => !/^Таблица со значениями/.test(l))
//     .filter((l) => !/^Вступает в силу/.test(l))
//     .filter((l) => !/^Название родителя/.test(l));

//   const numToken = /^-?\d+(?:,\d+)?$|^-$/;
//   const rows = [];
//   let textBuffer = [];

//   const flushRow = (nums) => {
//     if (textBuffer.length === 0) return;
//     const label = textBuffer.join(" ").replace(/\s+/g, " ").trim();
//     textBuffer = [];

//     rows.push({
//       parentCategory: label,
//       subject: "",
//       fbw: toNum(nums[0]),
//       fbs: toNum(nums[1]),
//       dbs: toNum(nums[2]),
//       edbs: toNum(nums[3]),
//       cnc: toNum(nums[4]),
//       booking: toNum(nums[5]),
//     });
//   };

//   for (const line of lines) {
//     const parts = line.split(/\s+/);
//     let i = parts.length - 1;
//     let collected = [];

//     while (i >= 0 && collected.length < 6) {
//       const [head, glued] = splitGluedEdbs(parts[i]);
//       if (glued) {
//         collected.unshift(glued);
//         collected.unshift(head);
//         i--;
//         continue;
//       }
//       if (numToken.test(parts[i])) {
//         collected.unshift(parts[i]);
//         i--;
//       } else {
//         break;
//       }
//     }

//     if (collected.length >= 6) {
//       const nums = collected.slice(-6);
//       const labelPart = parts.slice(0, i + 1).join(" ");
//       if (labelPart) textBuffer.push(labelPart);
//       flushRow(nums);
//     } else {
//       textBuffer.push(line);
//     }
//   }

//   return rows;
// }

// async function main() {
//   try {
//     console.log("📥 Fetching WB commissions PDF...");
//     const res = await fetch(PDF_URL, {
//       headers: {
//         "User-Agent": "Mozilla/5.0 (compatible; UnitEconomicsBot/1.0)",
//       },
//     });
//     if (!res.ok)
//       throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

//     const buffer = Buffer.from(await res.arrayBuffer());

//     console.log("🔍 Parsing PDF text...");
//     const data = await pdfParse(buffer);
//     const rows = parseWbCommissionsText(data.text);

//     if (rows.length < 50) {
//       throw new Error(
//         `Too few rows parsed: ${rows.length}. Check PDF structure.`,
//       );
//     }

//     const result = {
//       updatedAt: new Date().toISOString(),
//       source: PDF_URL,
//       rows,
//     };

//     const outputPath = join(
//       __dirname,
//       "..",
//       "app",
//       "assets",
//       "data",
//       "wb-commissions.json",
//     );
//     await writeFile(outputPath, JSON.stringify(result, null, 2));

//     console.log(`✅ Saved ${rows.length} commission rows to ${outputPath}`);
//     console.log(`📅 Updated at: ${result.updatedAt}`);

//     console.log("\n👀 First 5 rows:");
//     rows.slice(0, 5).forEach((row, i) => {
//       console.log(
//         `${i + 1}. ${row.parentCategory} | FBW: ${row.fbw}% | FBS: ${row.fbs}%`,
//       );
//     });
//   } catch (error) {
//     console.error("❌ Error:", error.message);
//     process.exit(1);
//   }
// }

// main();
