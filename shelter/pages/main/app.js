document.addEventListener("DOMContentLoaded", () => {
    // кнопка открытия меню
    let menu_trigger = document.querySelector('#menu_trigger');
    // меню
    let menu_popup = document.querySelector('#menu_popup');
    let logo = document.querySelector('#logo');
    // кнопка закрытия меню
    let menu_close = document.querySelector('#menu_close');
    // затенение
    let blackout = document.querySelector('.blackout');

    // массив с животными по клику на который
    // открывается модальное окно
    let pets_items = document.querySelectorAll('.pets_item');
    // модальное окно с животными
    let modal_pets = document.querySelector('#modal_pets');
    // кнопка закрытия модального окна
    let modal_close = document.querySelector('[data-close-button]');

    menu_trigger.addEventListener('click', () => {
        logo.style.visibility = 'hidden';
        blackout.classList.toggle('active');
        menu_popup.classList.toggle('active');
        menu_close.classList.toggle('menu_close');
    }, false);

    menu_close.addEventListener('click', () => {
        logo.style.visibility = 'visible';
        blackout.classList.toggle('active');
        menu_popup.classList.toggle('active');
    }, false);

    [].forEach.call(pets_items, function (pets_item) {
        pets_item.addEventListener('click', () => {
            blackout.classList.toggle('active');
            modal_pets.classList.toggle('active');
        }, false);
    });

    modal_close.addEventListener('click', () => {
        blackout.classList.toggle('active');
        modal_pets.classList.toggle('active');
    }, false);

    blackout.addEventListener('click', () => {
        modal_pets.classList.remove('active');
        blackout.classList.toggle('active');
    }, false);


    let slider = tns({
        container: '.pets_items',
        items: 3,
        slideBy: 1,
        fixedWidth: 355,
        controlsContainer: '.control_buttons',
        nav: false,
        mouseDrag: true,
        // responsive: {
        //     320: {
        //         items: 1,
        //         fixedWidth: 270,
        //     },
        //     768: {
        //         items: 2,
        //         fixedWidth: 315, 
        //     },
        //     1280: {
        //         items: 3,
        //         fixedWidth: 355,
        //     }, 
        // }
    });


});