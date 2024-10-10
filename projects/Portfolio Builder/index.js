document.getElementById('portfolioForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Collect data from the form
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const awards = document.getElementById('awards').value;
  
    // Profile picture upload
    const profilePicInput = document.getElementById('profilePic');
    let profilePicURL = '';
    if (profilePicInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profilePicURL = e.target.result;
        displayPortfolio(profilePicURL);
      };
      reader.readAsDataURL(profilePicInput.files[0]);
    } else {
      displayPortfolio(profilePicURL);
    }
  
    function displayPortfolio(imageURL) {
      // Display the portfolio
      const portfolioOutput = document.getElementById('portfolioOutput');
      portfolioOutput.innerHTML = `
        <img src="${imageURL}" alt="${name}'s Profile Picture">
        <h2>${name}'s Portfolio</h2>
        <p><strong>Bio:</strong> ${bio}</p>
        <p><strong>Skills:</strong> ${skills}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Awards:</strong> ${awards}</p>
      `;
  
      // Show the download buttons
      document.getElementById('downloadBtn').style.display = 'block';
      document.getElementById('downloadPdfBtn').style.display = 'block';
    }
  });
  
  // Download as HTML
  document.getElementById('downloadBtn').addEventListener('click', function() {
    const portfolioContent = document.getElementById('portfolioOutput').innerHTML;
    const blob = new Blob([portfolioContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'portfolio.html';
    link.click();
  });
  
  // Download as PDF
  document.getElementById('downloadPdfBtn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const awards = document.getElementById('awards').value;
  
    doc.text(`${name}'s Portfolio`, 10, 10);
    doc.text(`Bio: ${bio}`, 10, 20);
    doc.text(`Skills: ${skills}`, 10, 30);
    doc.text(`Experience: ${experience}`, 10, 40);
    doc.text(`Awards: ${awards}`, 10, 50);
  
    doc.save('portfolio.pdf');
  });
  