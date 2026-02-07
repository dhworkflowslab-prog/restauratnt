export const PLACE_ORDER_URL =
  "https://n8n.srv1302157.hstgr.cloud/webhook/Place-order";

export async function placeOrder(payload: {
  name: string;
  phone: string;
  table: number;
  food: string;
  qty: number;
}) {
  const res = await fetch(PLACE_ORDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Order failed");

  return res.json();
}
