import { fetchWbCommissions } from "../../utils/fetchWbCommissions";

export default defineEventHandler(async (event) => {
  const secret = getHeader(event, "x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  try {
    const data = await fetchWbCommissions();
    // Дальше — запись туда, где вы храните данные:
    // KV/Redis, БД, либо просто вернуть наружу, чтобы CI закоммитил файл
    return {
      ok: true,
      count: data.rows.length,
      updatedAt: data.updatedAt,
      data,
    };
  } catch (e) {
    console.error("WB commissions refresh failed", e);
    throw createError({ statusCode: 500, statusMessage: "Refresh failed" });
  }
});
