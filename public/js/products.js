document.getElementById('loadProductsBtn').addEventListener('click', function(e) {
  e.preventDefault(); 

  console.log("Knappen klickades"); 
  
  fetch('/api/products/load')
      .then(response => response.json())
      .then(products => {
        console.log(products);  
        const productList = document.getElementById('productlist');
        productList.innerHTML = ''; // Tom lista först
    
        products.forEach((product, index) => {
            //  en ny tabellrad för varje produkt
            const tr = document.createElement('tr');
    
            // bakgrundsfärg beroende på om raden är jämn eller udda
            if (index % 2 === 0) { // om radens nummer är delbart med två eller noll så skall det vara vit bakgrund
                tr.classList.add('bg-white'); 
            } else {
                tr.classList.add('bg-gray-100'); 
            }
    
            const tdName = document.createElement('td');
            tdName.textContent = product.productName;
            tdName.classList.add('border', 'border-black', 'p-2'); 
    
            const tdDescription = document.createElement('td');
            tdDescription.textContent = product.description;
            tdDescription.classList.add('border', 'border-black', 'p-2'); 
    
            const tdPrice = document.createElement('td');
            tdPrice.textContent = `${product.price} SEK`;
            tdPrice.classList.add('border', 'border-black', 'p-2'); 
    
            // Lägg till cellerna till tabellraden
            tr.appendChild(tdName);
            tr.appendChild(tdDescription);
            tr.appendChild(tdPrice);
    
            // Lägg till tabellraden till tabellen
            productList.appendChild(tr);
        });
    })
    
      .catch(error => {
          console.error('Något har blivit fel');
      });
});
