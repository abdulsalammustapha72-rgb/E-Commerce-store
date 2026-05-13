const buttons = document.querySelectorAll('.btn')
const cartOrders = document.querySelector('.cartItems')
const totalAmount = document.querySelector('.cart__p')
const totalQty = document.querySelector('.cart__qty')
const placeOrder = document.querySelector('.Order')

let cart = JSON.parse(localStorage.getItem('cart')) || []

// SAVE CART
const saveCart = () => {

    localStorage.setItem('cart', JSON.stringify(cart))

    renderCart()

}

// CALCULATE TOTAL
const calculateTotal = () => {

    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

}

// CALCULATE QUANTITY
const calculateQty = () => {

    return cart.reduce(
        (qty, item) => qty + item.quantity,
        0
    )

}

// RENDER CART
const renderCart = () => {

    if (!cartOrders) return

    cartOrders.innerHTML = ''

    cart.map((item) => {

        const { name, price, image, quantity } = item

        const productHTML = document.createElement('section')

        productHTML.classList.add('order__item')

        productHTML.innerHTML = `
        
            <div class="cart__div2">

                <img src="${image}" alt="">

                <h3>${name}</h3>

                <p>$${price} x ${quantity}</p>

                <section class="btn__section">

                    <button class="removeBtn">
                        Remove
                    </button>

                    <button class="inc">
                        +
                    </button>

                    <button class="dec">
                        -
                    </button>

                </section>

            </div>
        
        `

        // REMOVE
        productHTML
        .querySelector('.removeBtn')
        .addEventListener('click', () => {

            cart = cart.filter(
                (cartItem) => cartItem.name !== name
            )

            saveCart()

        })

        // INCREASE
        productHTML
        .querySelector('.inc')
        .addEventListener('click', () => {

            item.quantity++

            saveCart()

        })

        // DECREASE
        productHTML
        .querySelector('.dec')
        .addEventListener('click', () => {

            if (item.quantity > 1) {

                item.quantity--

            } else {

                cart = cart.filter(
                    (cartItem) => cartItem.name !== name
                )

            }

            saveCart()

        })

        cartOrders.appendChild(productHTML)

    })

    totalAmount.textContent =
    `Total Amount: $${calculateTotal()}`

    totalQty.textContent =
    `Total Qty Order: ${calculateQty()}`

}

// ADD TO CART
buttons.forEach((button) => {

    button.addEventListener('click', () => {

        const {
            name,
            price,
            image
        } = button.dataset

        const existingItem = cart.find(
            (item) => item.name === name
        )

        if (existingItem) {

            existingItem.quantity++

        } else {

            cart.push({
                name,
                price: Number(price),
                image,
                quantity: 1
            })

        }

        saveCart()

    })

})

// PLACE ORDER
placeOrder?.addEventListener('click', () => {

    localStorage.removeItem('cart')

    cart = []

    renderCart()

    window.location.href = 'success.html'

})

renderCart()