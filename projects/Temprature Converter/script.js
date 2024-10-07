function convertTemperature() {
    const fromUnit = document.getElementById("from").value;
    const toUnit = document.getElementById("to").value;
    const inputValue = parseFloat(document.getElementById("inputTemperature").value);
    let convertedValue;
  
    if (fromUnit === "celsius" && toUnit === "fahrenheit") {
      convertedValue = (inputValue * 9/5) + 32;
    } else if (fromUnit === "celsius" && toUnit === "kelvin") {
      convertedValue = inputValue + 273.15;
    } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
      convertedValue = (inputValue - 32) * 5/9;
    } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
      convertedValue = (inputValue - 32) * 5/9 + 273.15;
    } else if (fromUnit === "kelvin" && toUnit === "celsius") {
      convertedValue = inputValue - 273.15;
    } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
      convertedValue = (inputValue - 273.15) * 9/5 + 32;
    } else {
      convertedValue = inputValue;
    }
  
    document.getElementById("result").value = convertedValue.toFixed(2);
  }
  
  function clearFields() {
    document.getElementById("from").value = "celsius";
    document.getElementById("to").value = "celsius";
    document.getElementById("inputTemperature").value = "";
    document.getElementById("result").value = "";
  }
  