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
        features = np.array([[
            data["stress_level"],
            data["sleep_hours"],
            data["study_hours_per_day"],
            data["screen_time"],
            data["exam_pressure"],
            data["physical_activity"],
            data["family_expectation"]
        ]])

        # Scale
        features = scaler.transform(features)

        # Predict
        prediction = model.predict(features)[0]

        return {"prediction": int(prediction)}

    except Exception as e:
        return {"error": str(e)}