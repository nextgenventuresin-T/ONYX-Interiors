// Sends a WhatsApp message to the owner via CallMeBot (free) when a new
// enquiry arrives. Configure with env vars:
//   CALLMEBOT_APIKEY  — the key CallMeBot gives the owner after activation
//   CALLMEBOT_PHONE   — owner's number in international format (default below)
// If CALLMEBOT_APIKEY isn't set, this no-ops (so the form still works).

const PHONE = () => process.env.CALLMEBOT_PHONE || "918207538009";

export async function notifyWhatsApp({ name, email, message }) {
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!apikey) {
    console.log("WhatsApp notify skipped (set CALLMEBOT_APIKEY to enable).");
    return;
  }
  const text =
    `New ONYX Interior enquiry\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Message: ${message}`;

  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(PHONE())}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(apikey)}`;

  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      console.error("CallMeBot responded", res.status, await res.text());
    } else {
      console.log("WhatsApp notification sent to owner.");
    }
  } catch (err) {
    console.error("WhatsApp notify failed:", err.message);
  }
}
