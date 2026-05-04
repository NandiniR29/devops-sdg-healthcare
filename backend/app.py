from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# 🔍 Risk Logic
def predict_risk(age, sugar):
    if sugar <= 0:
        return "Invalid"
    if age > 50 and sugar >= 140:
        return "High Risk"
    elif age > 30 or sugar > 120:
        return "Medium Risk"
    else:
        return "Low Risk"

# 💡 Recommendation
def get_recommendation(risk):
    if risk == "High Risk":
        return "Consult a doctor immediately and monitor sugar daily."
    elif risk == "Medium Risk":
        return "Maintain proper diet and exercise regularly."
    elif risk == "Low Risk":
        return "Keep a healthy lifestyle."
    else:
        return "Please enter valid inputs."

@app.route('/')
def home():
    return "Healthcare Backend Running 🚀"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    age = int(data.get("age", 0))
    sugar = int(data.get("sugar", 0))

    risk = predict_risk(age, sugar)
    advice = get_recommendation(risk)

    return jsonify({
        "risk": risk,
        "advice": advice
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)