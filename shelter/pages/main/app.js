document.addEventListener("DOMContentLoaded", () => {
    var menu_popup = document.getElementsByClassName('menu-popup')[0];
    var menu_triger = document.getElementsByClassName('menu-triger')[0];
    var menu_close = document.getElementsByClassName('menu-close')[0];

    menu_triger.addEventListener('click', () => {
        menu_popup.style.cssText='display: block;';
    }, false);
    menu_close.addEventListener('click', () => {
        menu_popup.style.cssText='display: none;';
    }, false);
});