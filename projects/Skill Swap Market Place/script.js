// script.js
document.getElementById('postSwap').addEventListener('click', function() {
    const userName = document.getElementById('userName').value;
    const userDescription = document.getElementById('userDescription').value;
    const offerSkill = document.getElementById('offerSkill').value;
    const wantSkill = document.getElementById('wantSkill').value;

    if (!userName || !userDescription || !offerSkill || !wantSkill) {
        alert("Please fill in all fields.");
        return;
    }

    const swapItem = document.createElement('li');
    swapItem.innerHTML = `
        <strong>${userName}</strong>: Offer: ${offerSkill} | Want to learn: ${wantSkill}
        <button class="delete">Delete</button>
        <div class="description">${userDescription}</div>
    `;
    
    document.getElementById('swapList').appendChild(swapItem);
    showNotification(`Swap posted: ${offerSkill} for ${wantSkill}`);

    // Clear the input fields
    document.getElementById('userName').value = '';
    document.getElementById('userDescription').value = '';
    document.getElementById('offerSkill').value = '';
    document.getElementById('wantSkill').value = '';

    // Add delete functionality
    swapItem.querySelector('.delete').addEventListener('click', function() {
        swapItem.remove();
        showNotification(`Swap deleted: ${offerSkill} for ${wantSkill}`);
    });
});

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Filter functionality
document.getElementById('filter').addEventListener('input', function() {
    const filterValue = this.value.toLowerCase();
    const swapItems = document.querySelectorAll('#swapList li');

    swapItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filterValue) ? '' : 'none';
    });
});
