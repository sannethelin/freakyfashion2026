const form = document.querySelector ("#new-product-form");

// Parametern "event innehåller information om händelsen"
form.addEventListener ("submit", function (event){

    event.preventDefault();// Förhindra att sidan laddas om

    console.log("Du vill skicka data");
});

