// Show the pop-up automatically when the page loads

window.onload = function() {
    document.getElementById('popup-nl').style.display = 'flex';
  };

  // Close the pop-up when the user clicks the close button

  document.querySelector('.close-nl').addEventListener('click', function() {
    document.getElementById('popup-nl').style.display = 'none';
  });

  // // Close the pop-up when clicking outside the pop-up content
  // window.addEventListener('click', function(event) {
  //   const popupContent = document.querySelector('.popup-content'); // Select the popup content
  //   if (event.target === document.getElementById('popup')) {
  //       document.getElementById('popup').style.display = 'none';
  //   }
  // });

  // Handle form submission

  document.getElementById("emailForm-nl").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from actually submitting or refreshing the page

    const emailInput = document.getElementById("email-nl");

    // Here you can add code to handle the subscription, e.g., send data to your server

    // Clear the input field
    emailInput.value = "";
    
    // Optionally, you can display a confirmation message
    alert("Thank you for subscribing!");
});


  // Handle "No thanks" link

  document.querySelector('.no-thanks-nl').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('popup-nl').style.display = 'none';
  });
 
 