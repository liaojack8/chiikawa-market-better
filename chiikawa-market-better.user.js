// ==UserScript==
// @name         Chiikawa Market Better
// @namespace    https://github.com/liaojack8
// @version      v20241028.3
// @author       liaojack8
// @description  Check storage of products in Chiikawa market.
// @homepage     https://github.com/liaojack8/chiikawa-market-better
// @icon         https://chiikawamarket.jp/cdn/shop/files/fav.png
// @match        https://chiikawamarket.jp/*
// @match        https://nagano-market.jp/*
// @downloadURL  https://raw.githubusercontent.com/liaojack8/chiikawa-market-better/master/chiikawa-market-better.user.js
// @updateURL    https://raw.githubusercontent.com/liaojack8/chiikawa-market-better/master/chiikawa-market-better.user.js
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    function execute() {
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
                // auto agree terms
                document.querySelector("div.checkArea>label").dispatchEvent(clickEvent);
                document.querySelector("div.checkArea>input").checked = true;
            }
        } else if (document.location.pathname.includes('products/')) {
            // Product.
            const quantity = document
                .getElementsByClassName("product-form--variant-select")?.[0]
                ?.children?.[0]?.getAttribute("data-inventory-quantity");
            const label = document.getElementsByClassName("product-page--title")?.[0];
            if (quantity !== undefined && label) {
                label.innerHTML += `<span style="color: red; font-weight: bold;"> [庫存: ${quantity}]</span>`;
            }
            // auto agree product_attetion
            document.querySelector("div.agree_box>label").dispatchEvent(clickEvent);
            document.querySelector("div.agree_box>input").checked = true;
        }
        setTimeout(fuckWorldshopping, 1000)
    }
    var clickEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });
    function fuckWorldshopping() {
        // remove worldshopping
        document.querySelector('#zigzag-worldshopping-checkout').remove();
    }
    window.addEventListener('load', setTimeout(execute, 1000));
})();