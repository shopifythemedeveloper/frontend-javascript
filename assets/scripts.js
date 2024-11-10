document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.main-product__thumbnail img').forEach(image => {
        image.addEventListener('click', event => {
            document.querySelector('.main-product__thumbnail.active').classList.remove('active');
            image.parentNode.classList.add('active');
            document.querySelector('.main-product__featured-image img').src = image.src;
        });
    });

    document.getElementById('increment').addEventListener('click', event => {
        event.preventDefault();
        let quantity = document.querySelector('.main-product__quantity-input');
        quantity.value = parseInt(quantity.value) + 1;
    });

    document.getElementById('decrement').addEventListener('click', event => {
        event.preventDefault();
        let quantity = document.querySelector('.main-product__quantity-input');
        if(quantity.value > 1) quantity.value = parseInt(quantity.value) - 1;
    });

    const apiEndpoint = "https://fakestoreapi.com/products";

    const product = {
        title: 'One Life Graphic T-shirt',
        description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
        image: 'main-product-image.png',
        stars: 4.5,
        price: 260,
        rrp: 300,
        quantity: 1
    }

    const variants = [
        { id: 1, color: 'brown', size: 'small' },
        { id: 2, color: 'brown', size: 'medium' },
        { id: 3, color: 'brown', size: 'large' },
        { id: 4, color: 'brown', size: 'x-large' },
        { id: 5, color: 'green', size: 'small' },
        { id: 6, color: 'green', size: 'medium' },
        { id: 7, color: 'green', size: 'large' },
        { id: 8, color: 'green', size: 'x-large' },
        { id: 9, color: 'navy', size: 'small' },
        { id: 10, color: 'navy', size: 'medium' },
        { id: 11, color: 'navy', size: 'large' },
        { id: 12, color: 'navy', size: 'x-large' }
    ]

    let currentVariant = { id: 1, color: 'brown', size: 'small' }

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', event => {

            const variant_selection = {
                color: currentVariant.color,
                size: currentVariant.size
            }
            variant_selection[event.currentTarget.name] = event.currentTarget.value;

            currentVariant = variants.find(variant => {
                return variant.color === variant_selection.color && 
                       variant.size === variant_selection.size
            });
            document.querySelector('.current-variant').innerHTML = currentVariant.id
        });
    });

    function updateNotice(data) {
        const notice = document.querySelector('.atc-notice');

        const { title, image, price } = data;

        notice.innerHTML = `
            <h2>${title} added to the cart</h2>
            <div class="atc-notice__featured-image">
                <img src="/assets/images/${image}" alt="${title}">
            </div>
            <div class="atc-notice__price">
                <div class="main-product__price-main">$${price}</div>
            </div>
        `;

        notice.classList.add('open');

        setTimeout(() => {
            notice.classList.remove('open');
        }, 3000)
    }

    document.querySelector('.main-product__add-to-cart').addEventListener('click', event => {
        event.preventDefault();

        const button = event.currentTarget;

        button.disabled = true;
        button.innerHTML = "Adding to cart...";

        product.variant = currentVariant.id;
        fetch(apiEndpoint, { 
                method: "POST", 
                body: JSON.stringify(product),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json())
            .then(json => {
                button.disabled = false;
                button.innerHTML = "Add to cart";
                updateNotice(json);
            });
    });
});