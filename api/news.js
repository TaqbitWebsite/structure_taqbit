export default async function handler(req, res) {
  try {
    const query = "quantum security OR quantum computing OR cryptography";

    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      query
    )}&lang=en&max=6&token=${process.env.GNEWS_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: "GNews API error",
        details: text
      });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      error: "Server error",
      message: error.message
    });
  }
}
