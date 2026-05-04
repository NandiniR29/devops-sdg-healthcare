from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# ✅ THIS LINE MUST EXIST
app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Healthcare Backend Running 🚀"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    age = int(data.get("age", 0))
    sugar = int(data.get("sugar", 0))

    if age > 50 and sugar >= 140:
        risk = "High Risk"
    elif age > 30 or sugar > 120:
        risk = "Medium Risk"
    else:
        risk = "Low Risk"

    return jsonify({"risk": risk})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)