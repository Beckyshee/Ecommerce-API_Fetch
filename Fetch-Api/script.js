const url = 'https://fakestoreapi.com/products';

const cont = document.getElementById('cont');
const productDetailsContainer = document.getElementById('product-details');
const cartItemsContainer = document.getElementById('cart-items');
const totalAmountSpan = document.getElementById('total-amount');
const clearCartButton = document.getElementById('clear-cart');

let products = [];
let cart = [];


async function fetchProducts() {
    try {
        const response = await fetch(url);
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


function displayProducts(products) {
    cont.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>rating: ${product.category}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;

        const addToCartButton = productElement.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => addToCart(product));

        cont.appendChild(productElement);
    });
}


function displayProductDetails(product) {
    productDetailsContainer.innerHTML = '';

    const productDetailElement = document.createElement('div');
    productDetailElement.classList.add('product-detail');
    productDetailElement.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
    `;

    const addToCartButton = document.createElement('button');
    addToCartButton.innerText = 'Add to Cart';
    addToCartButton.addEventListener('click', () => addToCart(product));
    productDetailElement.appendChild(addToCartButton);

    productDetailsContainer.appendChild(productDetailElement);
}


function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const cartItem = { ...product, quantity: 1 };
        cart.push(cartItem);
    }

    displayCart();
}

// Function to clear the cart
function clearCart() {
    cart = [];
    displayCart();
}

// Function to display the shopping cart
function displayCart() {
    cartItemsContainer.innerHTML = '';
    let grandTotal = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        grandTotal += item.price * item.quantity;

        cartItemElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        `;

        const removeButton = cartItemElement.querySelector('.remove-from-cart');
        removeButton.addEventListener('click', () => removeFromCart(item));

        cartItemsContainer.appendChild(cartItemElement);
    });

    totalAmountSpan.textContent = grandTotal.toFixed(2);
}

// Function to remove an item from the cart
function removeFromCart(item) {
    const index = cart.findIndex(cartItem => cartItem.id === item.id);

    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        displayCart();
    }
}

// Event listener for clearing the cart
clearCartButton.addEventListener('click', clearCart);

// Fetch and display products when the page loads
fetchProducts();
