document.addEventListener("DOMContentLoaded", function () {
    const paymentForm = document.getElementById("payment-form");
    const popup = document.getElementById("payment-popup");
    const closePopup = document.getElementById("close-popup");
    const mainContent = document.getElementById("main-content");

    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = document.getElementById("full-name").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const state = document.getElementById("state").value.trim();
        const zipCode = document.getElementById("zip-code").value.trim();
        const cardNumber = document.getElementById("card-number").value.trim();
        const expiryDate = document.getElementById("expiry-date").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (fullName === "" || address === "" || city === "" || state === "" || zipCode === "" || cardNumber === "" || expiryDate === "" || cvv === "") {
            alert("Please fill in all the fields.");
            return;
        }

        if (cardNumber.length !== 16) {
            alert("Card number should be exactly 16 digits.");
            return;
        }

        if (cvv.length !== 3) {
            alert("CVV should be exactly 3 digits.");
            return;
        }

        mainContent.classList.add("blurred"); 
        popup.style.display = "flex"; 
        popup.style.opacity = "1"; 
        localStorage.removeItem("cart");
    });

    closePopup.addEventListener("click", function () {
        popup.style.opacity = "0"; 
        setTimeout(() => {
            popup.style.display = "none"; 
            mainContent.classList.remove("blurred"); 
            window.location.href = "index.html"; 
        }, 300); 
    });
});
