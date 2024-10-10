function runCode() {
           // Get the code from the textarea
           const code = document.getElementById("code").value;
           const outputElement = document.getElementById("output");
       
           // Clear previous output
           outputElement.innerText = '';  // This will clear the output each time before new code is run
       
           // Configure Skulpt to output to the displayOutput function
           Sk.configure({ output: displayOutput });
       
           // Run the Python code
           Sk.misceval.asyncToPromise(function() {
               return Sk.importMainWithBody("<stdin>", false, code, true);
           }).catch(function(err) {
               displayOutput(err.toString());  // Display any errors
           });
       
           // Function to handle displaying output
           function displayOutput(text) {
               outputElement.innerText += text + "\n";  // Append the new output
           }
       }
       
       