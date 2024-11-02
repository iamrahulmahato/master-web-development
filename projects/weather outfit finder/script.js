function getOutfit(weather) {
    let outfitRecommendation;
  
    switch (weather) {
      case "sunny":
        outfitRecommendation = "Wear a light t-shirt, shorts, and sunglasses. 🌞";
        break;
      case "rainy":
        outfitRecommendation = "Wear a waterproof jacket, boots, and carry an umbrella. 🌧️";
        break;
      case "cold":
        outfitRecommendation = "Wear a warm coat, scarf, and gloves. 🧣";
        break;
      case "snowy":
        outfitRecommendation = "Wear a heavy jacket, snow boots, and a beanie. ❄️";
        break;
      default:
        outfitRecommendation = "Select a weather condition.";
    }
  
    document.getElementById("result").innerText = outfitRecommendation;
  }
  