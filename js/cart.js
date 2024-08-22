// Modal show delay for look real
function openModalWithDelay() {
    setTimeout(function() {
        document.getElementById('my_modal').showModal();
    }, 1500);
}

// Global variables
let totalPrice = 0;
let couponCode = "";
let productCounter = 1; // Start the counter for serial numbers

// Function-1: Calculate cart product price and update the product list
function calculatePrice(productName, productPrice) {
    // Update the total price
    totalPrice += productPrice;
    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.innerText = `${totalPrice} $`;
    // Apply discount if valid coupon code is applied and totalPrice > 200
    if (couponCode === "SELL200" && totalPrice > 200) {
        applyDiscount();
    }
    // Update or create a product entry in the cart
    const entryProduct = document.getElementById("entryProduct");
    const existingProductDiv = document.getElementById(`product-${productName}`);
    if (existingProductDiv) {
        // If the product already exists, update the quantity
        const quantitySpan = existingProductDiv.querySelector('.product-quantity');
        const currentQuantity = parseInt(quantitySpan.innerText);
        const newQuantity = currentQuantity + 1;
        quantitySpan.innerText = newQuantity;
    } else {
        // If the product doesn't exist, create a new div for it
        const productDiv = document.createElement('div');
        productDiv.id = `product-${productName}`;
        productDiv.className = "px-3 py-2 mb-2 bg-white rounded-lg border border-gray-200"; // Tailwind classes
        productDiv.innerHTML = `
            <div class="flex items-center mb-1">
                <span class="font-semibold text-lg mr-2">${productCounter}.</span>
                <span class="font-semibold text-lg text-gray-800 product-name">${productName}</span>
            </div>
            <div class="flex ml-[25px]">
                <span class="text-gray-400 product-price text-lg">${productPrice} \$</span>
                <span class="ml-2 text-gray-400 text-lg">X <span class="product-quantity text-lg ml-1">1</span></span>
            </div>
        `;
        entryProduct.appendChild(productDiv);
        productCounter++; // Increment the counter for the next product
    }
    // Check if there are any products in the cart
    togglePurchaseButton();
}

// Function-2: Use coupon
function getValidCoupon() {
    const inputField = document.getElementById("input-coupon-field");
    couponCode = inputField.value;
    // Recalculate discount if a valid coupon is applied and totalPrice > 200
    if (couponCode === "SELL200" && totalPrice > 200) {
        applyDiscount();
    }
}

// Function-3: Apply discount based on coupon
function applyDiscount() {
    if (totalPrice > 199) {
        const discountPercent = 20;
        const discountAmount = (totalPrice * discountPercent) / 100;
        const discountedPrice = totalPrice - discountAmount;
        // Update discount and total in the DOM
        document.getElementById("discount-price").innerText = `${discountAmount} $`;
        document.getElementById("total").innerText = `${discountedPrice} $`;
    } else {
        // If totalPrice <= 200, no discount is applied
        document.getElementById("discount-price").innerText = `0 $`;
        document.getElementById("total").innerText = `${totalPrice} $`;
    }
}

// Function-4: to set coupon code
function setCouponCode() {
    // Set the coupon code in the input field
    const inputField = document.getElementById("input-coupon-field");
    inputField.value = "SELL200";
}

// Function-5: Toggle the "Make Purchase" button based on cart content
function togglePurchaseButton() {
    const entryProduct = document.getElementById("entryProduct");
    const purchaseButton = document.getElementById("purchase-button");

    if (entryProduct.children.length > 0) {
        purchaseButton.disabled = false;
        purchaseButton.classList.remove('opacity-50', 'cursor-not-allowed');
        purchaseButton.classList.add('hover:opacity-80', 'active:bg-[#920b6e]');
    } else {
        purchaseButton.disabled = true;
        purchaseButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// Initial check on page load
togglePurchaseButton();
