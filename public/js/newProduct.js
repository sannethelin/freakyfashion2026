document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#new-product-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const newProduct = {
            articleNumber: formData.get("Articlenr"),
            productName: formData.get("productname"),
            description: formData.get("description"),
            productPicture: formData.get("productpicture"),
            sku: formData.get("sku"),
            brand: formData.get("brand"),
            price: formData.get("price"),
            date: formData.get("date"),
        };

        fetch("/api/products/add-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Produkt tillagd:", data);

            setTimeout(() => {
                window.location.href = "/admin/products/product";
            }, 500);
        })
        .catch(error => {
            console.error("Fel vid tilläggning av produkten:", error); 
        });
    });
});
