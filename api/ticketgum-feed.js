// api/ticketgum-feed.js

export default async function handler(req, res) {
  const page = req.query.page || 0;

  const headers = {
    Accept: "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    Referer: "https://www.ticketgum.com/#a_aid=tradeit",
    "Accept-Language": "en-US,en;q=0.9",
    Connection: "keep-alive",
  };

  try {
    const tgRes = await fetch(`https://www.ticketgum.com/v1/affiliates/feed?page=${page}`, {
      headers,
    });

    if (!tgRes.ok) {
      return res.status(tgRes.status).json({ error: `TicketGum returned ${tgRes.status}` });
    }

    const data = await tgRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Proxy error:", error);
    res.status(500).json({ error: "Proxy failed" });
  }
}
