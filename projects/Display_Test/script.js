        // Initial Colors Array
        let colorarray = [
            "#e58e26", "#f9b4ab", "#B1FB17",
            "#78e08f", "#fd79a8", "#1e90ff",
            "#ff6348", "#9b59b6", "#2ecc71",
            "#e74c3c", "#34495e", "#f1c40f"
        ];

        const colorbox = document.getElementById("colorbox");
        const currentColorDisplay = document.getElementById("current-color-display");
        const currentColorCode = document.getElementById("current-color-code");
        const resetBtn = document.getElementById("reset-btn");
        const addColorBtn = document.getElementById("add-color-btn");
        const newColorPicker = document.getElementById("new-color-picker");
        const copyTooltip = document.getElementById("copy-tooltip");
        const tooltipText = document.getElementById("tooltip-text");

        // Function to Change Background Color
        function bgchange(color) {
            document.body.style.background = colorarray[color];
            currentColorDisplay.style.backgroundColor = colorarray[color];
            currentColorCode.textContent = colorarray[color];
        }

        // Initialize Color Circles
        colorarray.forEach(function (color, index) {
            let span = document.createElement("span");
            span.classList.add("color-circle");
            span.style.backgroundColor = color;
            span.addEventListener("click", function () {
                bgchange(index);
            });
            colorbox.appendChild(span);
        });

        // Set Initial Current Color Display
        currentColorDisplay.style.backgroundColor = "#f5f5f5";
        currentColorCode.textContent = "#f5f5f5";

        // Reset Button Functionality
        resetBtn.addEventListener("click", function () {
            document.body.style.background = "#f5f5f5";
            currentColorDisplay.style.backgroundColor = "#f5f5f5";
            currentColorCode.textContent = "#f5f5f5";
        });

        // Add Color Button Functionality
        addColorBtn.addEventListener("click", function () {
            const newColor = newColorPicker.value;
            colorarray.push(newColor);
            let span = document.createElement("span");
            span.classList.add("color-circle");
            span.style.backgroundColor = newColor;
            span.addEventListener("click", function () {
                bgchange(colorarray.length - 1);
            });
            colorbox.appendChild(span);
        });

        // Copy to Clipboard Functionality
        copyTooltip.addEventListener("click", function () {
            const colorCode = currentColorCode.textContent;
            navigator.clipboard.writeText(colorCode).then(() => {
                tooltipText.textContent = "Copied!";
                setTimeout(() => {
                    tooltipText.textContent = "Copy";
                }, 2000);
            }).catch(err => {
                tooltipText.textContent = "Error";
                console.error('Could not copy text: ', err);
            });
        });