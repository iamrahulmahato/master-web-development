document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('run').addEventListener('click', function () {
    var code = document.getElementById('code').value;
    var language = document.getElementById('language').value;
    compileAndRunCode(language, code);
  });

  function compileAndRunCode(language, code) {
    var url = 'http://localhost:3000/execute'; // Proxy server URL

    var payload = {
      script: code,
      language: language,
      versionIndex: '0'
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('output').textContent = data.output;
    })
    .catch(error => {
      document.getElementById('output').textContent = 'Error: ' + error;
    });
  }
});
