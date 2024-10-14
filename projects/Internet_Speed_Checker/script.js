document.getElementById('start-btn').addEventListener('click', startSpeedTest);

function startSpeedTest() {
  const downloadSpeedElement = document.getElementById('download-speed');
  const uploadSpeedElement = document.getElementById('upload-speed');
  const resultsDiv = document.getElementById('results');
  const errorMessageElement = document.getElementById('error-message');
  const startButton = this;

  resultsDiv.style.display = 'none';
  errorMessageElement.style.display = 'none';
  downloadSpeedElement.textContent = '0';
  uploadSpeedElement.textContent = '0';
  startButton.disabled = true;

  simulateDownloadSpeedTest(downloadSpeedElement, 2000);
  simulateUploadSpeedTest(uploadSpeedElement, 2000);
}

function simulateDownloadSpeedTest(element, delay) {
  setTimeout(() => {
    const simulatedSpeed = Math.random() * 100 / 2;
    element.textContent = simulatedSpeed.toFixed(2);
    document.getElementById('results').style.display = 'block';
    document.getElementById('start-btn').disabled = false;
  }, delay);
}

function simulateUploadSpeedTest(element, delay) {
  setTimeout(() => {
    const simulatedSpeed = Math.random() * 100 / 8;
    element.textContent = simulatedSpeed.toFixed(2);
    document.getElementById('results').style.display = 'block';
    document.getElementById('start-btn').disabled = false;
  }, delay);
}