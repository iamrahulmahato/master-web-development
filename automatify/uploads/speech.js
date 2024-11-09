// Initialize the Web Speech API
        const recognition = new webkitSpeechRecognition() || SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        let finalTranscript = "";
        let interimTranscript = "";
        
        const startButton = document.getElementById("startButton");
        const stopButton = document.getElementById("stopButton");
        const clearButton = document.getElementById("clearButton");
        const output = document.getElementById("output");

        startButton.addEventListener("click", () => {
            startButton.disabled = true;
            stopButton.disabled = false;
            clearButton.disabled = true;
            recognition.start();
        });

        stopButton.addEventListener("click", () => {
            startButton.disabled = false;
            stopButton.disabled = true;
            clearButton.disabled = false;
            recognition.stop();
        });

        clearButton.addEventListener("click", () => {
            finalTranscript = "";
            interimTranscript = "";
            output.innerText = ""; // Clear the output
            clearButton.disabled = true;
        });

        recognition.onstart = () => {
            console.log("Listening started...");
        };

        recognition.onresult = (event) => {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            output.innerHTML = `
                <p><strong>Final Transcript:</strong> ${finalTranscript}</p>
                <p><strong>Interim Transcript:</strong> ${interimTranscript}</p>
            `;
        };

        recognition.onend = () => {
            console.log("Listening stopped...");
        };
    
