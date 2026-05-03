from flask import Flask, jsonify
from model import predict_risk

app = Flask(__name__)

@app.route('/')
def home():
    return "Healthcare DevOps Backend Running 🚀"

@app.route('/predict', methods=['GET'])
def predict():
    result = predict_risk()
    return jsonify({"risk": result})

if __name__ == "__main__":
    app.run(debug=True)