from django.urls import path
from .views import (
    predict_disease,
    recommend_crop,
    market_prices,
    profit_calculator,
    subsidy_schemes
)

urlpatterns = [
    path("predict/", predict_disease),
    path("recommend/", recommend_crop),
    path("prices/", market_prices),
    path("profit/", profit_calculator),
    path("subsidy/", subsidy_schemes),
]
