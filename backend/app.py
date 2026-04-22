from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()

# Load model & scaler
model = joblib.load("model/burnout_model.pkl")
scaler = joblib.load("model/scaler.pkl")

# Root route (test)
@app.get("/")
def home():
    return {"message": "Burnout API running 🚀"}

# Prediction route
@app.post("/predict")
def predict(data: dict):
    try:
        # ✅ Expecting: { "features": [ ... ] }
        features = data.get("features")

        # Validation
        if features is None:
            return {"error": "Missing 'features' in request"}

        if not isinstance(features, list):
            return {"error": "'features' must be a list"}

        if len(features) != 7:
            return {"error": f"Expected 7 features, got {len(features)}"}

        # Convert to numpy
        features = np.array(features).reshape(1, -1)

        # Scale
        features_scaled = scaler.transform(features)

        # Predict
        prediction = model.predict(features_scaled)[0]

        return {
            "prediction": int(prediction)
        }

    except Exception as e:
        return {"error": str(e)}