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
        features = data.get("features")

        if len(features) != 7:
            return {"error": "Expected 7 features"}

        import numpy as np
        features = np.array(features).reshape(1, -1)

        # Scale
        features_scaled = scaler.transform(features)

        # Model prediction
        prediction = model.predict(features_scaled)[0]

        # 🔥 NEW: RULE-BASED CORRECTION
        stress, sleep, study, screen, exam, physical, family = features[0]

        high_score = 0

        if stress >= 8: high_score += 1
        if sleep <= 3: high_score += 1
        if screen >= 8: high_score += 1
        if exam >= 8: high_score += 1
        if family >= 8: high_score += 1
        if physical <= 3: high_score += 1

        # 🔥 Override logic
        if high_score >= 4:
            prediction = 2

        elif high_score >= 2 and prediction == 0:
            prediction = 1

        return {
            "prediction": int(prediction)
        }

    except Exception as e:
        return {"error": str(e)}