import axios from "axios";

/* 
Template Name     : Mr. Burger - Real-time burger
File Description  : Main javascript file of the template
Author            : Bidhan Dev
Support           : bidhan.d@gmail.com
MIT license       : https://github.com/bidhandev/Mr.-Burger/blob/main/LICENSE
*/

/* Global variable */
let doc = document;

/*----------------------------
              Navigation bar effects on scroll
              ------------------------------*/
window.addEventListener("scroll", function () {
    const header = doc.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0);
});

/*----------------------------
              Show scroll top
              ------------------------------*/
const scrollTop = () => {
    const scrollTop = doc.getElementById('scroll-top');
    if (this.scrollY >= 560) {
        scrollTop.classList.add('scroll-top');
    } else {
        scrollTop.classList.remove('scroll-top');
    }
};
window.addEventListener('scroll', scrollTop);

const menuBtn = doc.querySelector(".nav-menu-btn");
const navigation = doc.querySelector(".nav__menu");
const closeBtn = doc.querySelectorAll(".nav-close");
menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});
closeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});


/*----------------------------
              Hero carousel
              ------------------------------*/
$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        smartSpeed: 1200,
        dots: false
    });
});

/*----------------------------
              Add to cart
              ------------------------------*/
const ifEmptyCart = doc.querySelector("#ifEmptyCart");
const cartDOM = doc.querySelector(".cart__items");
const addToCartBtn = doc.querySelectorAll(".menu__button");
const totalCost = doc.querySelector(".total__cost");
const shippingCost = doc.querySelector(".shipping__cost");
const totalPrice = doc.querySelector(".total__price");
const totalCount = doc.querySelector(".totalQty");
const sendCart = doc.querySelector("#sendCart");
const orderPlacedBtn = doc.querySelector("#orderPlacedBtn");
const orderPlacedPhone = doc.querySelector("#orderPlacedPhone");
const orderPlacedAddress = doc.querySelector("#orderPlacedAddress");
let cart = JSON.parse(localStorage.getItem("cart"));
doc.addEventListener("DOMContentLoaded", loadData);

// Save data in localStorage
function saveLocalStorage(data) { localStorage.setItem("cart", JSON.stringify(data)) };

// 
let cartData = {
    phone: "",
    address: "",
    paymentType: "",
    orderCart: localStorage?.getItem("cart")
};

// Empry cart merkup
function emptyCartMerkup() {
    if (cart.totalQty === 0) {
        ifEmptyCart.innerHTML = `
            <div class="empty_cart">
                <h3>Your cart is empty😢</h3>
                <img src="/img/empty-cart.png" alt="">
                <a class="btn" href="/menu">Add Item</a>
            </div>
        `
    };
}

// Shipping cost counter func
function shippingCostCounter(price) {
    const setShippingCost = (num) => {
        shippingCost.innerText = num;
        cart.shippingCost = num;
        totalPrice.innerText = price + cart.shippingCost;
        saveLocalStorage(cart);
    };
    if (price === 0) setShippingCost(0);
    else if (price < 500) setShippingCost(60);
    else if (price < 1000) setShippingCost(50);
    else if (price < 1500) setShippingCost(40);
    else setShippingCost(30);
};

// If the card is not in the localStorage 
let emptyCart = { items: {}, totalQty: 0, totalPrice: 0, shippingCost: 0 };
if (!localStorage.getItem("cart")) {
    saveLocalStorage(emptyCart)
    location.reload();
};

// Add to cart func
addToCartBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        let newCart = cart;
        const parentElement = btn.parentElement;
        const id = parentElement.querySelector("#burgerId").value;
        const name = parentElement.querySelector(".menu__name").innerText;
        const image = parentElement.querySelector(".menu__img").getAttribute("src");
        const price = parentElement.querySelector(".menu__price").innerText.replace("BDT ~ ", "");
        const newCartItem = { id, name, image, price };

        if (!newCart.items[id]) {
            newCart.items[id] = {
                item: newCartItem,
                qty: 1
            };
            newCart.totalQty = newCart.totalQty + 1;
            newCart.totalPrice = newCart.totalPrice + parseInt(price);
            saveLocalStorage(newCart);
        } else {
            newCart.items[id].qty = newCart.items[id].qty + 1;
            newCart.totalQty = newCart.totalQty + 1;
            newCart.totalPrice = newCart.totalPrice + parseInt(newCartItem.price);
            saveLocalStorage(newCart);
        }
        totalCount.innerText = newCart.totalQty;
        totalCost.innerText = newCart.totalPrice;
    });
});

// Main cart func and load all cart data;
function loadData() {
    // update cart inner text
    totalCount.innerText = cart?.totalQty;
    totalCost.innerText = cart?.totalPrice;
    shippingCost.innerText = cart?.shippingCost;
    totalPrice.innerText = cart?.totalPrice + cart?.shippingCost;
    cartData.orderCart = localStorage?.getItem("cart");

    // On change order placed inputs
    orderPlacedPhone.addEventListener("change", () => cartData.phone = orderPlacedPhone.value);
    orderPlacedAddress.addEventListener("change", () => cartData.address = orderPlacedAddress.value);
    orderPlacedPaymentType.addEventListener("change", () => cartData.paymentType = orderPlacedPaymentType.value);

    // Order placed submit func
    orderPlacedBtn.addEventListener("click", (event) => {
        event.preventDefault();
        axios
            .post('/orders', cartData)
            .then((res) => {
                if (res.data.order) {
                    localStorage.removeItem("cart");
                    window.location.href = "/customer/orders";
                }
            })
            .catch(err => { });
    });

    emptyCartMerkup();
    const cartItemsArray = Object.values(cart.items);
    if (cartItemsArray.length > 0) {
        cartItemsArray.forEach(product => {
            addItemToTheDOM(product);
            const cartDOMItems = doc.querySelectorAll(".cart_item");
            cartDOMItems.forEach(individualItem => {
                if (individualItem.querySelector("#burgerId").value === product.item.id) {
                    // increrase
                    increaseItem(individualItem, product);
                    // decrease
                    decreaseItem(individualItem, product);
                    // Removing Element
                    removeItem(individualItem, product);
                };
            });
        });
    };
};

// Create cart item markup
function addItemToTheDOM(product) {
    // Adding the new Item to the Dom
    cartDOM.insertAdjacentHTML("afterbegin", `
        <tr class="cart_item">
            <input type="hidden" id="burgerId" value="${product.item.id}">
            <td>
                <div class="products">
                    <img src="${product.item.image}" alt="">
                    <h6>${product.item.name}</h6>
                </div>
            </td>
            <td>
                <div class="quantity mt-27">
                    <button class="minus_btn" id="decreaseCart" action="decrease">
                        <i class='bx bx-minus'></i>
                    </button>
                    <span class="quantity_count">${product.qty}</span>
                    <button class="plus_btn" id="increaseCart" action="increase">
                        <i class='bx bx-plus'></i>
                    </button>
                </div>
            </td>
            <td>
                <div class="mt-27 price">
                    <em>BTD</em> <span>${product.item.price}</span>
                </div>
            </td>
            <td>
                <div class="mt-27 price total_price">
                    <div>
                        <em>BTD</em>
                        <span class="total_price_count">${parseInt(product.item.price) * product.qty}</span>
                    </div>
                    <i class='bx bx-x' id="removeCart" action="remove"></i>
                </div>
            </td>
        </tr>
    `);
};

// Increase cart item func
function increaseItem(individualItem, product) {
    let burgerItem = cart.items[product.item.id];
    individualItem.querySelector("[action='increase']").addEventListener('click', () => {
        burgerItem.qty = burgerItem.qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + parseInt(burgerItem.item.price);
        individualItem.querySelector(".quantity_count").innerText = burgerItem.qty;
        individualItem.querySelector(".total_price_count").innerText = parseInt(burgerItem.item.price) * burgerItem.qty;
        totalCount.innerText = cart.totalQty;
        totalCost.innerText = cart.totalPrice;
        shippingCostCounter(cart.totalPrice);
        saveLocalStorage(cart);
        cartData.orderCart = localStorage?.getItem("cart");
    });
};

// Decrease cart item func
function decreaseItem(individualItem, product) {
    let burgerItem = cart.items[product.item.id];
    individualItem.querySelector("[action='decrease']").addEventListener('click', () => {
        burgerItem.qty = burgerItem.qty - 1;
        cart.totalQty = cart.totalQty - 1;
        cart.totalPrice = cart.totalPrice - parseInt(burgerItem.item.price);
        individualItem.querySelector(".quantity_count").innerText = burgerItem.qty;
        individualItem.querySelector(".total_price_count").innerText = parseInt(burgerItem.item.price) * burgerItem.qty;
        if (product.qty === 0) {
            delete cart.items[product.item.id];
            individualItem.remove();
        };
        totalCount.innerText = cart.totalQty;
        totalCost.innerText = cart.totalPrice;
        shippingCostCounter(cart.totalPrice);
        saveLocalStorage(cart);
        emptyCartMerkup();
        cartData.orderCart = localStorage?.getItem("cart")
    });
};

// Remove item from cart func
function removeItem(individualItem, product) {
    individualItem.querySelector("[action='remove']").addEventListener('click', () => {
        delete cart.items[product.item.id];
        cart.totalQty = cart.totalQty - product.qty
        cart.totalPrice = cart.totalPrice - product.item.price * product.qty;
        totalCount.innerText = cart.totalQty;
        totalCost.innerText = cart.totalPrice;
        shippingCostCounter(cart.totalPrice);
        individualItem.remove();
        saveLocalStorage(cart);
        emptyCartMerkup();
        cartData.orderCart = localStorage?.getItem("cart")
    });
};