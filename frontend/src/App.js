import React, { useState } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState("");
  const [sugar, setSugar] = useState("");
  const [risk, setRisk] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    if (!age || !sugar) {
      alert("Please enter all fields");
      return;
    }

    if (sugar <= 0) {
      alert("Sugar must be greater than 0");
      return;
    }

    try {
      setLoading(true);

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
      setAdvice(data.advice);

      setHistory([...history, { age, sugar, risk: data.risk }]);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAge("");
    setSugar("");
    setRisk("");
    setAdvice("");
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Healthcare Risk Prediction</h1>

        <div className="input-group">
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
        </div>

        <button onClick={handleSubmit}>
          {loading ? "Analyzing..." : "Predict Risk"}
        </button>

        <button className="reset" onClick={resetForm}>
          Reset
        </button>

        {risk && (
          <div className={`result ${getClass(risk)}`}>
            <h3>{risk}</h3>
            <p>{advice}</p>
          </div>
        )}

        {risk && <div className={`risk-bar ${getClass(risk)}`}></div>}

        {/* 📜 History */}
        {history.length > 0 && (
          <div className="history">
            <h3>Prediction History</h3>
            <ul>
              {history.map((item, index) => (
                <li key={index}>
                  Age: {item.age}, Sugar: {item.sugar} → {item.risk}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function getClass(risk) {
  if (risk === "Low Risk") return "low";
  if (risk === "Medium Risk") return "medium";
  if (risk === "High Risk") return "high";
  return "";
}

export default App;