
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
