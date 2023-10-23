document.addEventListener('DOMContentLoaded', function () {
    let products = document.querySelector('.products')
   async function fetchProducts(url){
        let data = await fetch(url);
        let response = await data.json();

        for (let i = 0; i < response.length; i++) {
            products.innerHTML += `
            <div class="product">
                   <img class="productImg " alt="" src="${response[i].images[1]}">
                   <h2 class="title">${response[i].title}</h2>
                   <h4 class="category">${response[i].category.name}</h4>
                   <p class="description">${response[i].description}</p>
                   <h3 class="price">${response[i].price}</h3>
                   <a href="#!" data-productId="${response[i].id}" class="add-to-cart"></a>
            </div>`
            
        }

      
        //console.log(response);
    };
    fetchProducts('https://fakestoreapi.com/products')
   /* .then(res=>res.json())
    .then(json=>console.log(json)) */
})