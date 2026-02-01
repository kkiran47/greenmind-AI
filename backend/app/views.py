import json
import os
import numpy as np
import tensorflow as tf
from PIL import Image

from rest_framework.decorators import api_view
from rest_framework.response import Response

# ======================================================
# PATHS
# ======================================================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(BASE_DIR, "plant_disease_model.h5")
LABELS_PATH = os.path.join(BASE_DIR, "class_labels.json")

# ======================================================
# LOAD MODEL & LABELS (ONLY ONCE)
# ======================================================
model = tf.keras.models.load_model(MODEL_PATH)

with open(LABELS_PATH, "r") as f:
    labels = json.load(f)

IMG_SIZE = 128

# ======================================================
# IMAGE PREPROCESSING
# ======================================================
def preprocess(image):
    img = Image.open(image).convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

# ======================================================
# DISEASE SUGGESTIONS
# ======================================================
def disease_suggestion(disease):
    d = disease.lower()
    if "healthy" in d:
        return "Crop is healthy 🌱 Maintain irrigation and nutrients."
    if "blight" in d:
        return "Use fungicide and avoid excess watering."
    if "rust" in d:
        return "Apply sulfur-based fungicide."
    if "mildew" in d:
        return "Improve airflow and apply organic fungicide."
    return "Consult an agriculture officer."

# ======================================================
# 1️⃣ DISEASE PREDICTION API
# ======================================================
@api_view(["POST"])
def predict_disease(request):
    image = request.FILES.get("image")

    if not image:
        return Response({"error": "Image file required"}, status=400)

    img = preprocess(image)
    preds = model.predict(img)[0]
    idx = int(np.argmax(preds))
    confidence = float(preds[idx])

    disease = labels[str(idx)] if isinstance(labels, dict) else labels[idx]

    if confidence < 0.50:
        return Response({
            "disease": "Uncertain",
            "confidence": round(confidence * 100, 2),
            "status": "Low confidence",
            "suggestion": "Upload a clearer leaf image"
        })

    return Response({
        "disease": disease,
        "confidence": round(confidence * 100, 2),
        "status": "Healthy" if "healthy" in disease.lower() else "Disease detected",
        "suggestion": disease_suggestion(disease)
    })

# ======================================================
# 2️⃣ CROP RECOMMENDATION API
# ======================================================
@api_view(["POST"])
def recommend_crop(request):
    soil = request.data.get("soil")
    season = request.data.get("season")
    rainfall = request.data.get("rainfall")

    if soil == "black" and season == "kharif":
        crop = "Cotton"
    elif soil == "loamy" and rainfall > 100:
        crop = "Rice"
    elif soil == "sandy":
        crop = "Groundnut"
    else:
        crop = "Wheat"

    return Response({
        "recommended_crop": crop,
        "reason": "Based on soil type, season, and rainfall"
    })

# ======================================================
# 3️⃣ MARKET PRICE ANALYZER API
# ======================================================
@api_view(["GET"])
def market_prices(request):
    prices = {
        "Rice": 2300,
        "Wheat": 2100,
        "Cotton": 6500,
        "Groundnut": 5500
    }
    return Response(prices)

# ======================================================
# 4️⃣ PROFIT CALCULATOR API
# ======================================================
@api_view(["POST"])
def profit_calculator(request):
    cost = request.data.get("cost")
    yield_q = request.data.get("yield")
    price = request.data.get("price")

    revenue = yield_q * price
    profit = revenue - cost

    return Response({
        "total_cost": cost,
        "expected_revenue": revenue,
        "net_profit": profit,
        "verdict": "Profitable ✅" if profit > 0 else "Loss ❌"
    })

# ======================================================
# 5️⃣ GOVERNMENT SUBSIDY API
# ======================================================
@api_view(["GET"])
def subsidy_schemes(request):
    return Response({
        "subsidies": [
            "PM Fasal Bima Yojana",
            "Kisan Credit Card",
            "Soil Health Card Scheme",
            "Drip Irrigation Subsidy (50%)",
            "Organic Farming Incentive"
        ]
    })
