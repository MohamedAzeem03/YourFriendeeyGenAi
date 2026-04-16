import { useState } from "react";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!keyword) {
      alert("Enter a keyword");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword }),
      });

      const data = await res.json();

      if (data.output) {
        setResult(data.output);
      } else {
        setResult("Error: " + data.error);
      }
    } catch (error) {
      setResult("Server not connected");
    }

    setLoading(false);
  };

  return (
    <>
      {/* 🫧 Bubble Background */}
      <div className="emojis">
        <span>😊</span>
        <span>😍</span>
        <span>😄</span>
        <span>😁</span>
        <span>🤍</span>
        <span>😎</span>
        <span>😢</span>
        <span>😭</span>
        <span>😡</span>
        <span>😤</span>
        <span>😘</span>
        <span>💛</span>
        <span>💖</span>
        <span>💔</span>
        <span>🔥</span>
        <span>🧡</span>
        <span>✨</span>
        <span>🤓</span>

    
      </div>

      {/* Main UI */}
      <div className="container">
        <div className="card">
          <h1>Your Friendeey 😉</h1>

          <p>What’s on your mind? 👀</p>

          <div className="input-group">
          <input
            type="text"
            placeholder="e.g. failure, angry, sad..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button onClick={generate} disabled={loading}>
            {loading ? "✨ Generating..." : "🚀 Generate"}
          </button>
        </div>

          {/* Output */}
          <div className="output">
            {result && (
             <div className="single-output">
              {result}
             </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;