let cart = [];

// Load cart from local storage on page load
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add an item to the cart (Create operation)
function addToCart(item, price) {
    const existingItem = cart.find(c => c.item === item);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item exists
    } else {
        cart.push({ item, price, quantity: 1 }); // Add new item
    }
    updateCart();
    saveCart();
}

// Update the cart display (Read operation)
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((c, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${c.item}</td>
            <td>Rs.${c.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${c.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>Rs.${(c.price * c.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})">Delete</button></td>
        `;
        cartItems.appendChild(row);
    });

    updateTotal();
}

// Update the total price in the cart
function updateTotal() {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('total-price').innerText = `Total: Rs.${totalPrice.toFixed(2)}`;
}

// Update item quantity (Update operation)
function updateQuantity(index, quantity) {
    if (quantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = parseInt(quantity);
    }
    updateCart();
    saveCart();
}

// Remove an item from the cart (Delete operation)
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    saveCart();
}

// Submit cart and alert total cost
function submitCart() {
    const totalCost = cart.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
    alert(`Total Cost: Rs.${totalCost.toFixed(2)}`); // Show total cost in an alert
    cart = []; // Clear cart after submission
    updateCart(); // Update the display
    saveCart(); // Ensure the cart is saved in local storage
}

// Initialize the cart when the page loads
window.onload = loadCart;

// Store feedback in session storage
function storeFeedback() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    const feedbackDetails = {
        name: name,
        email: email,
        feedback: feedback
    };

    sessionStorage.setItem('feedback', JSON.stringify(feedbackDetails));
    alert('Thank you for your feedback!');
}

// Retrieve feedback from session storage (optional)
function getFeedback() {
    const storedFeedback = sessionStorage.getItem('feedback');
    if (storedFeedback) {
        const feedbackDetails = JSON.parse(storedFeedback);
        console.log('Stored Feedback:', feedbackDetails);
    }
}
