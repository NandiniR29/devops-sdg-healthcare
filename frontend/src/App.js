import React, { useState } from "react";

function App() {
  const [risk, setRisk] = useState("");

  const getPrediction = async () => {
    const res = await fetch("http://127.0.0.1:5000/predict");
    const data = await res.json();
    setRisk(data.risk);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Healthcare DevOps Project</h1>
      <button onClick={getPrediction}>Check Risk</button>
      <h2>{risk}</h2>
    </div>
  );
}

export default App;