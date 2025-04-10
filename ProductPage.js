var toggleitm = document.querySelector(".navbar-toggle-itm");

function menu() {
    toggleitm.style.left = "0";
}

function menuclose() {
    toggleitm.style.left = "-60%";
}

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

    const addToCartButton = document.querySelector(".add-to-cart");
    const buyNowButton = document.querySelector(".buy-now");

    function addToCart() {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (isLoggedIn !== "true") {
            alert("Please log in to add this product to your cart.");
            window.location.href = "login.html";
            return;
        }

        const productName = document.querySelector(".product-info h2").innerText;
        const productPriceText = document.querySelector(".price").innerText;
        const productImage = document.querySelector(".product-image img").src;
        const priceMatch = productPriceText.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/);
        const cleanedPrice = priceMatch ? parseInt(priceMatch[0].replace(/,/g, ""), 10) : 0;

        const product = {
            name: productName,
            price: cleanedPrice,
            image: productImage,
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Item added to cart!");
    }

    if (addToCartButton) {
        addToCartButton.addEventListener("click", addToCart);
    }

    if (buyNowButton) {
        buyNowButton.addEventListener("click", function () {
            const isLoggedIn = localStorage.getItem("isLoggedIn");

            if (isLoggedIn !== "true") {
                alert("Please log in to continue to checkout.");
                window.location.href = "login.html";
                return;
            }

            window.location.href = "checkout.html";
        });
    }
});
