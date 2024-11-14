// Vänta på att hela dokumentet har laddats klart
document.addEventListener("DOMContentLoaded", () => {
    // Hämta formuläret med ID "new-product-form" från HTML-dokumentet
    const form = document.querySelector("#new-product-form");

    // Lägg till en event-lyssnare för formulärets submit-händelse
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Förhindra att sidan laddas om vid submit

        // Skapa ett FormData-objekt från formulärets innehåll
        const formData = new FormData(event.target);

        // Skapa ett objekt för den nya produkten baserat på formulärdata
        const newProduct = {
            articleNumber: formData.get("Articlenr"), // Hämta artikelnummer från formuläret
            productName: formData.get("productname"),  // Hämta produktnamn
            description: formData.get("description"),  // Hämta beskrivning
            productPicture: formData.get("productpicture"), // Hämta produktbildens länk (sträng)
            sku: formData.get("sku"),                  // Hämta SKU
            brand: formData.get("brand"),              // Hämta märke
            price: formData.get("price"),              // Hämta pris
            date: formData.get("date"),                // Hämta datum
        };

        // Skicka en POST-förfrågan till servern med produktdata i JSON-format
        fetch("/add-product", {
            method: "POST", // HTTP-metod är POST för att skapa en ny resurs
            headers: {
                "Content-Type": "application/json" // Skicka data som JSON
            },
            body: JSON.stringify(newProduct) // Konvertera produktobjektet till JSON-sträng
        })
        .then(response => response.json()) // Vänta på att servern skickar ett svar och konvertera svaret till JSON
        .then(data => {
            console.log('Produkt tillagd:', data);
            setTimeout(() => {
                window.location.href = "/admin/products/product";
            }, 500);
            
        })
        .catch(error => {
            console.error('Fel vid produktläggning:', error); // Logga eventuella fel som inträffar
            // Här kan du hantera fel, t.ex. visa ett felmeddelande för användaren
        });
    });
});
