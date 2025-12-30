import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shorten = async () => {
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const res = await fetch("http://localhost:8000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Intern-Challenge": "KESHU",
        },
        body: JSON.stringify({ longUrl: url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Quick-Link URL Shortener</h2>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter long URL"
        style={{ width: "350px", padding: "8px" }}
      />

      <br /><br />

      <button onClick={shorten} disabled={loading}>
        {loading ? "Loading..." : "Shorten"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {shortUrl && (
        <p>
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
