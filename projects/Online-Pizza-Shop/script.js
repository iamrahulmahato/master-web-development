
// Cart functionality
const cart = [];

document.querySelectorAll('.add-to-cart').forEach(item => {
    item.addEventListener('click', () => {
        const name = item.getAttribute('data-name');
        const price = item.getAttribute('data-price');
        cart.push({ name, price });
        displayCart();
    });
});

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += parseFloat(item.price);
    });

    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}


// Pizza customization
function addCustomizedPizza() {
    const size = document.getElementById('size').value;
    const toppings = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(el => el.value).join(', ');
    const price = size === 'small' ? 10 : size === 'medium' ? 15 : 20;
    cart.push({ name: `${size} Pizza with ${toppings}`, price });
    displayCart();
}

function validateOrderForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    if (!name || !phone || !address) {
        alert('Please fill out all fields.');
        return false;
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return false;
    }

    alert('Order placed successfully!');
    return true;
}

function searchPizzas() {
    const search = document.getElementById('search-bar').value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const name = item.getAttribute('data-name').toLowerCase();
        item.style.display = name.includes(search) ? '' : 'none';
    });
}

function addReview(event) {
    event.preventDefault();
    const reviewText = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;

    const reviewContainer = document.createElement('div');
    reviewContainer.className = 'review';
    reviewContainer.innerHTML = `<p>${reviewText}</p><p>Rating: ${rating} Stars</p>`;

    document.getElementById('reviews-container').appendChild(reviewContainer);

    // Clear form
    document.getElementById('review-form').reset();
}
