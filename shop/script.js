let cart = [];

// Load cart from local storage
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
    // Check if item already exists in cart
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
            <td>Rs.${c.price}</td>
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

// Initialize the cart when the page loads
window.onload = loadCart;


// Store feedback in session storage
function storeFeedback() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    // Create an object for feedback
    const feedbackDetails = {
        name: name,
        email: email,
        feedback: feedback
    };

    // Store the feedback in session storage as a string
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
