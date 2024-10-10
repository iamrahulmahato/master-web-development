document.getElementById('portfolioForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // collect data
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const awards = document.getElementById('awards').value;
  
    // picture upload
    const profilePicInput = document.getElementById('profilePic');
    let profilePicURL = '';
  
    // picture check
    if (profilePicInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profilePicURL = e.target.result;
        displayPortfolio(profilePicURL);
      };
      reader.readAsDataURL(profilePicInput.files[0]); // image conversion
    } else {
      displayPortfolio(profilePicURL); // render content
    }
  
    // display portfolio
    function displayPortfolio(imageURL) {
      const portfolioOutput = document.getElementById('portfolioOutput');
      
      portfolioOutput.innerHTML = `
        <img src="${imageURL}" alt="Profile Picture" style="max-width: 200px; max-height: 200px; border-radius: 50%;">
        <h2>${name}'s Portfolio</h2>
        <p><strong>Bio:</strong> ${bio}</p>
        <p><strong>Skills:</strong> ${skills}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Awards:</strong> ${awards}</p>
      `;
  
      // show button
      document.getElementById('downloadPdfBtn').style.display = 'block';
    }
  });
  
  // pdf download
  document.getElementById('downloadPdfBtn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // collect text
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const awards = document.getElementById('awards').value;
  
    // picture input
    const profilePicInput = document.getElementById('profilePic');
  
    // image check
    if (profilePicInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const profilePicURL = e.target.result;
        doc.addImage(profilePicURL, 'JPEG', 10, 10, 50, 50);  // set image
        addTextToPdf(doc);
      };
      reader.readAsDataURL(profilePicInput.files[0]);
    } else {
      addTextToPdf(doc); // add text
    }
  
    // add text
    function addTextToPdf(doc) {
      doc.text(`${name}'s Portfolio`, 10, 70); // text position
      doc.text(`Bio: ${bio}`, 10, 80);
      doc.text(`Skills: ${skills}`, 10, 90);
      doc.text(`Experience: ${experience}`, 10, 100);
      doc.text(`Awards: ${awards}`, 10, 110);
      
      doc.save('portfolio.pdf'); // save pdf
    }
  });
  