// LADDA PRODUKTER / LISTA
document.getElementById('loadProductsBtn').addEventListener('click', function(event) {
  event.preventDefault(); 

  fetch('/api/products/load', {
    method: 'GET'  
  })
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById('productlist');
        productList.innerHTML = ''; 

        products.forEach((product, index) => {
            const tr = document.createElement('tr');
        
            if (index % 2 === 0) {
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

            tr.appendChild(tdName);
            tr.appendChild(tdDescription);
            tr.appendChild(tdPrice);

            productList.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Något har blivit fel:', error);
    });
});
