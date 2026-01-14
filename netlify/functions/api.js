import fetch from "node-fetch";

export async function handler() {
  try {
    // 🔒 Third-party API (fixed)
    const url =
      "https://proapi.sumittools.shop/emot" +
      "?key=ShadowProTCP" +
      "&region=ind" +
      "&tc=9807987" +
      "&uid1=111" +
      "&uid2=222" +
      "&uid3=13074814377" +
      "&uid4=444" +
      "&emote_id=909052007";

    // ⏳ WAIT here until response comes
    const response = await fetch(url, {
      method: "GET",
      timeout: 5000
    });

    // ⏳ WAIT until JSON parsed
    const data = await response.json();

    // ✅ Check response properly
    if (
      data &&
      typeof data === "object" &&
      data.status === "success"
    ) {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: "success" })
      };
    }

    // ❌ Any other case
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "failed" })
    };

  } catch (error) {
    // 💥 Timeout / crash / network error
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "failed" })
    };
  }
}
