import fetch from "node-fetch";

export async function handler() {
  try {
    const url =
      "https://proapi.sumittools.shop/emote" +
      "?key=ShadowProTCP" +
      "&region=ind" +
      "&tc=9807987" +
      "&uid1=111" +
      "&uid2=222" +
      "&uid3=13074814377" +
      "&uid4=444" +
      "&emote_id=909052007";

    const response = await fetch(url, {
      method: "GET",
      timeout: 5000
    });

    const data = await response.json();

    // ✅ SUCCESS
    if (data && data.status === "success") {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          { status: "success" },
          null,
          2
        )
      };
    }

    // ❌ FAILED
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        { status: "failed" },
        null,
        2
      )
    };

  } catch (error) {
    // 💥 ERROR / TIMEOUT
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        { status: "failed" },
        null,
        2
      )
    };
  }
}
