import { useEffect, useState } from "react";

interface Quote {
  id: number;
  text: string;
  author: string;
}

const QuoteComponent = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  const getQuote = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/quotes/random");
      const data = await res.json();
      setQuote(data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Random Quote</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.quoteBox}>
          <p style={styles.text}>{quote?.text}</p>
          <p style={styles.author}>— {quote?.author}</p>
        </div>
      )}

      <button style={styles.button} onClick={getQuote}>
        Get New Quote
      </button>
    </div>
  );
};

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    gap: "20px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },
  quoteBox: {
    width: "400px",
    padding: "20px",
    background: "#f3f3f3",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  text: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  author: {
    fontSize: "16px",
    fontStyle: "italic",
    color: "#555",
  },
  button: {
    padding: "10px 20px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default QuoteComponent;
