import React, { useState } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState("");
  const [sugar, setSugar] = useState("");
  const [risk, setRisk] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        age: Number(age),
        sugar: Number(sugar)
      })
    });

    const data = await res.json();
    setRisk(data.risk);
  };

  return (
    <div className="container">
      <h1>Healthcare Risk Prediction</h1>

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Sugar Level"
        value={sugar}
        onChange={(e) => setSugar(e.target.value)}
      />

      <button onClick={handleSubmit}>Predict</button>

      {risk && <h2 className={getClass(risk)}>Risk: {risk}</h2>}
    </div>
  );
}

function getClass(risk) {
  if (risk === "Low Risk") return "low";
  if (risk === "Medium Risk") return "medium";
  return "high";
}

export default App;