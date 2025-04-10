// Mobile navbar toggle logic
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenu = document.querySelector(".navbar-toggle-itm");
    const menuBtn = document.querySelector(".navbar-toggle");
    const closeBtn = document.querySelector(".cross");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
});

// Cart logic
document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");
    const checkoutButton = document.getElementById("checkout-button");

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalAmount.innerText = "Rs. 0";
            return;
        }

        cart.forEach((product, index) => {
            let item = document.createElement("div");
            item.classList.add("cart-item");

            let itemTotal = product.price * product.quantity;
            total += itemTotal;

            item.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-details">
                    <h3>${product.name}</h3>
                    <p>Rs. ${product.price} x ${product.quantity} = Rs. ${itemTotal}</p>
                    <div class="quantity-container">
                        <button class="quantity-btn decrease-item" data-index="${index}">-</button>
                        <span class="quantity-number">${product.quantity}</span>
                        <button class="quantity-btn increase-item" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(item);
        });

        totalAmount.innerText = `Rs. ${total}`;
    }

    cartContainer.addEventListener("click", function (event) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let index = event.target.getAttribute("data-index");

        if (event.target.classList.contains("remove-item")) {
            cart.splice(index, 1);
        } else if (event.target.classList.contains("increase-item")) {
            cart[index].quantity++;
        } else if (event.target.classList.contains("decrease-item")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    });

    // ✅ Checkout logic with login check
    checkoutButton.addEventListener("click", function () {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (isLoggedIn !== "true") {
            alert("Please log in to continue to checkout.");
            window.location.href = "login.html";
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        window.location.href = "payment.html";
    });

    loadCart();
});
