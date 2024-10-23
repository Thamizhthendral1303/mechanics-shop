// Fetch and display spare parts order details
function displaySparePartsOrders() {
    const spareParts = JSON.parse(localStorage.getItem('cart')) || [];
    const sparePartsTableBody = document.querySelector('#spare-parts-table tbody');

    // Clear any existing rows
    sparePartsTableBody.innerHTML = '';

    // If there are orders in the cart
    if (spareParts.length > 0) {
        spareParts.forEach(part => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${part.item}</td>
                <td>Rs.${part.price}</td>
                <td>${part.quantity}</td>
                <td>Rs.${(part.price * part.quantity).toFixed(2)}</td>
            `;
            sparePartsTableBody.appendChild(row);
        });
    } else {
        sparePartsTableBody.innerHTML = '<tr><td colspan="4" class="no-data">No orders placed yet.</td></tr>';
    }
}

// Fetch and display feedback form details
function displayFeedbackDetails() {
    const feedback = JSON.parse(sessionStorage.getItem('feedback')) || null;
    const feedbackTableBody = document.querySelector('#feedback-table tbody');

    // Clear any existing rows
    feedbackTableBody.innerHTML = '';

    // If there is feedback stored
    if (feedback) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${feedback.name}</td>
            <td>${feedback.email}</td>
            <td>${feedback.feedback}</td>
        `;
        feedbackTableBody.appendChild(row);
    } else {
        feedbackTableBody.innerHTML = '<tr><td colspan="3" class="no-data">No feedback submitted yet.</td></tr>';
    }
}

// Call both functions when the page loads
window.onload = function() {
    displaySparePartsOrders();
    displayFeedbackDetails();
};
