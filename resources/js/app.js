import axios from "axios";

/* 
Template Name     : Mr. Burger - Real-time burger
File Description  : Main javascript file of the template
Author            : Bidhan Dev
Support           : bidhan.d@gmail.com
MIT license       : https://github.com/bidhandev/Mr.-Burger/blob/main/LICENSE
*/

/* Global variable */
const doc = document;

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
const cartDOM = document.querySelector(".cart__items");
const addToCartBtn = document.querySelectorAll(".menu__button");
const totalCost = document.querySelector(".total__cost");
const shippingCost = document.querySelector(".shipping__cost");
const totalPrice = document.querySelector(".total__price");
const totalCount = document.querySelector(".totalQty");
let newCartItems = (JSON.parse(localStorage.getItem("new_cart_items")) || []);
totalCount.innerText = newCartItems.totalQty;
totalCost.innerText = newCartItems.totalPrice
document.addEventListener("DOMContentLoaded", loadData);

function orderPrice(price) {
    if (price === 0) {
        shippingCost.innerText = 0;
        newCartItems.shippingCost = 0;
        totalPrice.innerText = price + newCartItems.shippingCost;
        localStorage.setItem("new_cart_items", JSON.stringify(newCartItems));
    } else if (price < 500) {
        shippingCost.innerText = 60;
        newCartItems.shippingCost = 60;
        totalPrice.innerText = price + newCartItems.shippingCost;
        localStorage.setItem("new_cart_items", JSON.stringify(newCartItems));
    } else if (price < 1000) {
        shippingCost.innerText = 50;
        newCartItems.shippingCost = 50;
        totalPrice.innerText = price + newCartItems.shippingCost;
        localStorage.setItem("new_cart_items", JSON.stringify(newCartItems));
    } else if (price < 1500) {
        shippingCost.innerText = 40;
        newCartItems.shippingCost = 40;
        totalPrice.innerText = price + newCartItems.shippingCost;
        localStorage.setItem("new_cart_items", JSON.stringify(newCartItems));
    } else {
        shippingCost.innerText = 30;
        newCartItems.shippingCost = 30;
        totalPrice.innerText = price + newCartItems.shippingCost;
        localStorage.setItem("new_cart_items", JSON.stringify(newCartItems));
    }
}


if (window.location.pathname === "/cart") {
    orderPrice(newCartItems.totalPrice)
}



addToCartBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        let parentElement = btn.parentElement;
        if (!JSON.parse(localStorage.getItem("new_cart_items"))) {
            let newCart = {
                items: {},
                totalQty: 0,
                totalPrice: 0,
                shippingCost: 0
            };
            localStorage.setItem("new_cart_items", JSON.stringify(newCart));
        }

        let newCart = JSON.parse(localStorage.getItem("new_cart_items"));
        const newId = parentElement.querySelector("#product__id").value;

        const newCartItem = {
            id: parentElement.querySelector("#product__id").value,
            name: parentElement.querySelector(".menu__name").innerText,
            image: parentElement.querySelector(".menu__img").getAttribute("src"),
            price: parentElement.querySelector(".menu__price").innerText.replace("BDT ~ ", ""),
        }

        if (!newCart.items[newId]) {
            newCart.items[newId] = {
                item: newCartItem,
                qty: 1
            };
            newCart.totalQty = newCart.totalQty + 1;
            newCart.totalPrice = newCart.totalPrice + parseInt(parentElement.querySelector(".menu__price").innerText.replace("BDT ~ ", ""));
            localStorage.setItem("new_cart_items", JSON.stringify(newCart));
        } else {
            newCart.items[newId].qty = newCart.items[newId].qty + 1;
            newCart.totalQty = newCart.totalQty + 1;
            newCart.totalPrice = newCart.totalPrice + parseInt(newCartItem.price);
            localStorage.setItem("new_cart_items", JSON.stringify(newCart));
        }
        totalCount.innerText = newCart.totalQty;
        totalCost.innerText = newCart.totalPrice;
    });
})




function loadData() {
    if (Object.values(newCartItems.items).length > 0) {
        Object.values(newCartItems.items).forEach(product => {
            addItemToTheDOM(product);
            const cartDOMItems = document.querySelectorAll(".cart_item");
            cartDOMItems.forEach(individualItem => {
                if (individualItem.querySelector("#product__id").value === product.item.id) {
                    // increrase
                    increaseItem(individualItem, product);
                    // decrease
                    decreaseItem(individualItem, product);
                    // Removing Element
                    removeItem(individualItem, product);

                }
            });
        });
    }
}




function addItemToTheDOM(product) {
    // Adding the new Item to the Dom
    cartDOM.insertAdjacentHTML("afterbegin", `
        <tr class="cart_item">
            <input type="hidden" id="product__id" value="${product.item.id}">
            <td>
                <div class="products">
                    <img src="${product.item.image}" alt="">
                    <h6>${product.item.name}</h6>
                </div>
            </td>
            <td>
                <div class="quantity mt-27">
                    <button class="minus_btn" id="decreaseCart" action="decrease"><i
                            class='bx bx-minus'></i></button>
                    <span class="quantity_count">${product.qty}</span>
                    <button class="plus_btn" id="increaseCart" action="increase"><i
                            class='bx bx-plus'></i></button>
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
}

function increaseItem(individualItem, product) {
    individualItem.querySelector("[action='increase']").addEventListener('click', () => {
        // Actual Array
        newCartItems.items[product.item.id].qty = newCartItems.items[product.item.id].qty + 1;
        newCartItems.totalQty = newCartItems.totalQty + 1;
        newCartItems.totalPrice = newCartItems.totalPrice + parseInt(newCartItems.items[product.item.id].item.price);
        individualItem.querySelector(".quantity_count").innerText = newCartItems.items[product.item.id].qty;
        individualItem.querySelector(".total_price_count").innerText = parseInt(newCartItems.items[product.item.id].item.price) * newCartItems.items[product.item.id].qty;
        totalCount.innerText = newCartItems.totalQty;
        totalCost.innerText = newCartItems.totalPrice;
        orderPrice(newCartItems.totalPrice);
        localStorage.setItem("new_cart_items", JSON.stringify(newCartItems));
    });
};

function decreaseItem(individualItem, product) {
    individualItem.querySelector("[action='decrease']").addEventListener('click', () => {
        // all cart items in the dom
        newCartItems.items[product.item.id].qty = newCartItems.items[product.item.id].qty - 1;
        newCartItems.totalQty = newCartItems.totalQty - 1;
        newCartItems.totalPrice = newCartItems.totalPrice - parseInt(newCartItems.items[product.item.id].item.price);
        individualItem.querySelector(".quantity_count").innerText = newCartItems.items[product.item.id].qty;
        individualItem.querySelector(".total_price_count").innerText = parseInt(newCartItems.items[product.item.id].item.price) * newCartItems.items[product.item.id].qty;
        if (product.qty === 0) {
            delete newCartItems.items[product.item.id];
            individualItem.remove();
        };
        totalCount.innerText = newCartItems.totalQty;
        totalCost.innerText = newCartItems.totalPrice;
        orderPrice(newCartItems.totalPrice);
        localStorage.setItem("new_cart_items", JSON.stringify(newCartItems));
    });
};

function removeItem(individualItem, product) {
    individualItem.querySelector("[action='remove']").addEventListener('click', () => {
        delete newCartItems.items[product.item.id];
        newCartItems.totalQty = newCartItems.totalQty - product.qty
        newCartItems.totalPrice = newCartItems.totalPrice - product.item.price * product.qty;
        totalCount.innerText = newCartItems.totalQty;
        totalCost.innerText = newCartItems.totalPrice;
        orderPrice(newCartItems.totalPrice);
        individualItem.remove();
        localStorage.setItem("new_cart_items", JSON.stringify(newCartItems));
    });
}