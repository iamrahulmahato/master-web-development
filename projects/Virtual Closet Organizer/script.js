// app.js
document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('upload-input');
    const uploadBtn = document.getElementById('upload-btn');
    const closetItems = document.getElementById('closet-items');
    const outfitSlots = document.querySelectorAll('.outfit-slot');
    let uploadedImages = [];
  
    // Handle image upload
    uploadBtn.addEventListener('click', () => {
      const files = uploadInput.files;
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = function (event) {
            const imageUrl = event.target.result;
            uploadedImages.push(imageUrl);
            displayClosetItem(imageUrl);
          };
          reader.readAsDataURL(files[i]);
        }
      }
    });
  
    // Display uploaded images in the closet
    function displayClosetItem(imageUrl) {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('closet-item');
      itemDiv.style.backgroundImage = `url(${imageUrl})`;
      itemDiv.draggable = true;
  
      // Drag and Drop functionality
      itemDiv.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('image-url', imageUrl);
      });
  
      closetItems.appendChild(itemDiv);
    }
  
    // Handle dragging items to outfit builder
    outfitSlots.forEach((slot) => {
      slot.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
  
      slot.addEventListener('drop', (e) => {
        const imageUrl = e.dataTransfer.getData('image-url');
        if (imageUrl) {
          slot.style.backgroundImage = `url(${imageUrl})`;
          slot.style.backgroundSize = 'cover';
          slot.style.backgroundPosition = 'center';
        }
      });
    });
  });
  