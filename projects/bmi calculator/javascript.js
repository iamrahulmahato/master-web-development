window.onload = function () {
        let button = document.getElementById("calculate");
        button.addEventListener("click", calculateBMI)
    }

    function calculateBMI() {
        let weight = document.getElementById("weight").value;
        let height = document.getElementById("height").value;

        if (weight === '' || weight < 0 || isNaN(weight)) {
            document.getElementById("result-message").innerHTML = `Enter a valid weight`;
        }
        else if (height === '' || height < 0 || isNaN(height)) {
            document.getElementById("result-message").innerHTML = `Enter a valid height`;
        }
        else {
                const bmi = (weight / ((height * height) / 10000)).toFixed(2)
                document.getElementById("result-message").innerText = "BMI: " + bmi;
        }

    }
