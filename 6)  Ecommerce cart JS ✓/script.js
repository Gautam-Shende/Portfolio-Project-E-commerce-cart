

document.addEventListener("DOMContentLoaded", function() {
    const cartCount = document.querySelector(".cart-count");
    const addToCartButtons = document.querySelectorAll(".btn-secondary");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count++;
        });
    });
});


// Variables to store cart items and count
let cartItems = [];
let cartCount = 0;
let totalAmount = 0;

// Function to add an item to the cart
function addToCart(productName, productPrice, productImage) {
    const product = {
        name: productName,
        price: parseFloat(productPrice),
        image: productImage
    };
    cartItems.push(product);
    cartCount++;
    totalAmount += product.price;  // Add product price to total
    updateCartCount();
    displayCartItems();
}

// Function to update the cart count in the navigation
function updateCartCount() {
    document.querySelector('.cart-count').textContent = cartCount;
}

// Function to display the cart items, total, and Buy Now button in the cart section
function displayCartItems() {
    const cartBox = document.querySelector('.cart-section .box');
    const buyNowBtn = document.getElementById('buyNowBtn'); // Reference to Buy Now button
    cartBox.innerHTML = ''; // Clear previous cart items

    if (cartItems.length === 0) {
        cartBox.innerHTML = '<p>Your cart is empty, Pleas Select Products first.</p>';
        document.querySelector('.cart-total').textContent = ''; // Clear total amount when cart is empty
        buyNowBtn.style.display = 'none'; // Hide the Buy Now button if cart is empty
    } else {
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartBox.appendChild(itemElement);
        });

        // Update and display the total amount
        document.querySelector('.cart-total').textContent = `Total: $${totalAmount.toFixed(2)}`;

        // Show the Buy Now button if the cart is not empty
        buyNowBtn.style.display = 'inline-block';
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    totalAmount -= cartItems[index].price;  // Subtract product price from total
    cartItems.splice(index, 1);
    cartCount--;
    updateCartCount();
    displayCartItems();
}

// Function for the Buy Now button action
function buyNow() {
    alert('Thank you for your purchase! Your Total Amount is : $' + totalAmount.toFixed(2));

    // Clear the cart after purchase
    cartItems = [];
    cartCount = 0;
    totalAmount = 0;
    updateCartCount();
    displayCartItems();
}

// Add event listeners to the "Add to Cart" buttons
document.querySelectorAll('.btn-secondary').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productName = document.querySelectorAll('.product-card h3')[index].textContent;
        const productPrice = document.querySelectorAll('.product-card p')[index].textContent.replace('$', '');
        const productImage = document.querySelectorAll('.product-card img')[index].src;
        addToCart(productName, productPrice, productImage);
    });
});

// Initial update of cart display
displayCartItems();
