document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'https://fakestoreapi.com/products';

    const product = {
        title: 'One Life Graphic T-shirt',
        description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
        image: 'main-product-image.png',
        stars: 4.5,
        price: 260,
        rrp: 300
    }
    
    document.querySelector('.main-product__add-to-cart').addEventListener('click', () => {
        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});