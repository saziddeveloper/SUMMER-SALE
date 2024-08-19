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
    totalPriceElement.innerText = totalPrice;

    // Apply discount if valid coupon code is applied
    if (couponCode === "SELL200") {
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
        productDiv.className = "px-4 py-2 mb-2 bg-white rounded-lg border border-gray-200"; // Tailwind classes
        productDiv.innerHTML = `
            <div class="flex items-center mb-1">
                <span class="font-semibold text-lg mr-2">${productCounter}.</span>
                <div class="flex-1">
                    <span class="font-semibold text-lg text-gray-800 product-name">${productName}</span>
                </div>
            </div>
            <div class="flex items-center ml-[25px]">
                <span class="text-gray-400 product-price text-lg">${productPrice} \$</span>
                <span class="ml-2 text-gray-400 text-lg">X <span class="product-quantity text-lg ml-1">1</span></span>
            </div>
        `;
        entryProduct.appendChild(productDiv);
        productCounter++; // Increment the counter for the next product
    }
}

// Function-2: Use coupon
function getValidCoupon() {
    const inputField = document.getElementById("input-coupon-field");
    couponCode = inputField.value;
    // Recalculate discount if a valid coupon is applied
    if (couponCode === "SELL200") {
        applyDiscount();
    }
}

// Function-3: Apply discount based on coupon
function applyDiscount() {
    const discountPercent = 20;
    const discountAmount = (totalPrice * discountPercent) / 100;
    const discountedPrice = totalPrice - discountAmount;
    // Update discount and total in the DOM
    document.getElementById("discount-price").innerText = discountAmount;
    document.getElementById("total").innerText = discountedPrice;
}

// Function-4: to set coupon code
function setCouponCode() {
    // Set the coupon code in the input field
    const inputField = document.getElementById("input-coupon-field");
    inputField.value = "SELL200";
}