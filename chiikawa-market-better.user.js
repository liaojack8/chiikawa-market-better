// ==UserScript==
// @name         Chiikawa Market Better
// @namespace    https://github.com/liaojack8
// @version      v20241027.2
// @author       liaojack8
// @description  Check storage of products in Chiikawa market.
// @homepage     https://github.com/liaojack8/chiikawa-market-better
// @icon         https://chiikawamarket.jp/cdn/shop/files/fav.png
// @match        https://chiikawamarket.jp/products/*
// @match        https://chiikawamarket.jp/collections/*/products/*
// @match        https://chiikawamarket.jp/cart
// @match        https://nagano-market.jp/products/*
// @match        https://nagano-market.jp/collections/*/products/*
// @match        https://nagano-market.jp/cart
// @downloadURL  https://raw.githubusercontent.com/liaojack8/chiikawa-market-better/refs/heads/master/chiikawa-market-better.user.js
// @updateURL    https://raw.githubusercontent.com/liaojack8/chiikawa-market-better/refs/heads/master/chiikawa-market-better.user.js
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    function fuckWorldshopping() {
        // remove worldshopping
        document.querySelector('#zigzag-worldshopping-checkout').remove();
        // auto agree product_attetion
        document.querySelector("div.agree_box>input").click();
    }
    if (document.location.pathname === "/cart") {
        // Cart.
        for (const item of document.getElementsByClassName("cart--item")) {
            const quantity = item.getAttribute("data-inventory-quantity");
            const label =
                item.getElementsByClassName("cart--item--title")?.[0]?.children?.[0]
                    ?.children?.[0];
            if (quantity !== undefined && label) {
                label.innerHTML += `<span style="color: red; font-weight: bold;"> [庫存: ${quantity}]</span>`;
            }
        }
    } else {
        // Product.
        const quantity = document
            .getElementsByClassName("product-form--variant-select")?.[0]
            ?.children?.[0]?.getAttribute("data-inventory-quantity");
        const label = document.getElementsByClassName("product-page--title")?.[0];
        if (quantity !== undefined && label) {
            label.innerHTML += `<span style="color: red; font-weight: bold;"> [庫存: ${quantity}]</span>`;
        }
    }
    window.addEventListener('load', setTimeout(fuckWorldshopping, 2000));
})();
