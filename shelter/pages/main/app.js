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

    let pets_header = document.querySelector('.our_pets_header');

    menu_trigger.addEventListener('click', () => {
        logo.style.visibility = 'hidden';
        blackout.classList.toggle('active');
        menu_popup.classList.toggle('active');
        menu_close.classList.toggle('menu_close');
        menu_trigger.classList.toggle('menu_close');

        pets_header.style.cssText = 'position: initial';
    }, false);

    menu_close.addEventListener('click', () => {
        logo.style.visibility = 'visible';
        blackout.classList.toggle('active');
        menu_popup.classList.toggle('active');
        menu_close.classList.toggle('menu_close');
        menu_trigger.classList.toggle('menu_close');

        pets_header.style.cssText = 'position: sticky';
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
        menu_popup.classList.toggle('active');
        blackout.classList.toggle('active');
    }, false);

    blackout.addEventListener('mouseover', () => {
        modal_close.classList.add('hover');
    }, false);

    blackout.addEventListener('mouseout', () => {
        modal_close.classList.remove('hover');
    }, false);

    let pets_items_div = document.querySelector('.pets_items');
    fetch('./pets.json')
        .then(response => response.json())
        .then(pets_json => {
            let pets_obj = pets_json;
            return pets_obj.map(function (pet) {
                let pets_div = createNode('div');
                pets_div.classList.add('pets_item');

                let img = createNode('img');
                img.src = pet.img;

                let pets_names_div = createNode('div');
                pets_names_div.classList.add('pets_names');
                pets_names_div.innerHTML = `${pet.name}`;

                let pets_button = createNode('a');
                pets_button.classList.add('btn-secondary');
                pets_button.innerHTML = 'Learn more';
                pets_button.href = '#';

                append(pets_div, img);
                append(pets_div, pets_names_div);
                append(pets_div, pets_button);
                append(pets_items_div, pets_div);

            })
        })
        .then(() => {
            let slider = tns({
                container: '.pets_items.main_pets',
                items: 3,
                gutter: 90,
                loop: false,
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
            })
        });

    function createNode(element) {
        return document.createElement(element);
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }




});