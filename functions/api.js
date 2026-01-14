import fetch from "node-fetch";
import { saveLog } from "./logs.js";

export async function handler(event) {
  const startTime = Date.now();
  const id = event.queryStringParameters?.id || "unknown";

  let externalData;
  let finalResponse;

  try {
    // 🔁 ANDAR WALI (THIRD-PARTY) API
    const url =
      "https://proapi.sumittools.shop/emote" +
      "?key=ShadowProTCP" +
      "&region=ind" +
      "&tc=9807987" +
      `&uid1=${id}` +
      `&uid2=${id}` +
      "&uid3=13074814377" +
      `&uid4=${id}` +
      "&emote_id=909052007";

    const res = await fetch(url, { timeout: 5000 });
    externalData = await res.json();

    // ✅ DECISION RULE
    if (externalData.status === "success") {
      finalResponse = { status: "success" };
    } else {
      finalResponse = externalData;
    }

  } catch (err) {
    externalData = { error: err.message };
    finalResponse = { status: "failed", reason: "system_error" };
  }

  // 📝 LOG SAVE
  saveLog({
    time: new Date().toISOString(),
    incoming_id: id,
    external_response: externalData,
    returned_response: finalResponse,
    duration_ms: Date.now() - startTime
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finalResponse)
  };
}
