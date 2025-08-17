const askQuestion = async () => {
  try {
    const res = await fetch("http://localhost:5003/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "Hello backend?" }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  } catch (err) {
    console.error("Error:", err);
  }
};