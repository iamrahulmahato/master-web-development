window.onload = function () {
        let button = document.getElementById("calculate");
        button.addEventListener("click", calculateBMI)
    }

    function calculateBMI() {
        let weight = document.getElementById("weight").value;
        let height = document.getElementById("height").value;

        if (height === '' || height < 0 || isNaN(height)) {
            results.innerHTML = `please give a valid  height ${height}`;
        }
        else if (weight === '' || weight < 0 || isNaN(weight)) {
            results.innerHTML = `please give a valid  weight ${weight}`;
        }
        else {
            const bmi = (weight / ((height * height) / 10000)).toFixed(2)

            // show the result
            document.getElementById("result-message").innerText = "BMI: " + bmi;
        }

    }
