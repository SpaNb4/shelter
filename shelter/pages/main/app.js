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

    // модальное окно с животными
    let modal_pets = document.querySelector('#modal_pets');
    // кнопка закрытия модального окна
    let modal_close = document.querySelector('[data-close-button]');

    let pets_header = document.querySelector('.our_pets_header');

    menu_trigger.addEventListener('click', () => {
        logo.classList.toggle('hidden');
        blackout.classList.toggle('active');
        menu_popup.classList.toggle('active');
        menu_close.classList.toggle('menu_close');
        menu_trigger.classList.toggle('menu_close');

        pets_header.style.cssText = 'position: initial';
    });

    menu_close.addEventListener('click', () => {
        logo.classList.toggle('hidden');
        blackout.classList.toggle('active');
        menu_popup.classList.toggle('active');
        menu_close.classList.toggle('menu_close');
        menu_trigger.classList.toggle('menu_close');

        pets_header.style.cssText = 'position: sticky';
    });

    modal_close.addEventListener('click', () => {
        blackout.classList.toggle('active');
        modal_pets.classList.toggle('active');
    });

    blackout.addEventListener('click', () => {
        modal_pets.classList.remove('active');
        menu_popup.classList.toggle('active');
        logo.classList.toggle('hidden');
        menu_trigger.classList.toggle('menu_close');
        menu_close.classList.toggle('menu_close');
        blackout.classList.toggle('active');
    });

    blackout.addEventListener('mouseover', () => {
        modal_close.classList.add('hover');
    });

    blackout.addEventListener('mouseout', () => {
        modal_close.classList.remove('hover');
    });

    let json;
    let pets_pagination;
    let pets_slider;

    function shuffle(array) {
        let arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function generatePetDOM(pets_obj_arr) {
        let pets_carousel = document.querySelector('.pets_carousel');

        let pets_slider_div = document.createElement('div');
        pets_slider_div.classList.add('pets_slider');
        for (let i = 0; i < pets_obj_arr.length; i++) {
            let pets_items_div = document.createElement('div');
            pets_items_div.classList.add('pets_items');

            pets_obj_arr[i].map(function (pet) {
                let pets_item_div = document.createElement('div');
                pets_item_div.classList.add('pets_item');

                let pets_item_img = document.createElement('img');
                pets_item_img.src = pet.img;

                let pets_names_div = document.createElement('div');
                pets_names_div.classList.add('pets_names');
                pets_names_div.innerHTML = `${pet.name}`;

                let pets_button = document.createElement('a');
                pets_button.classList.add('btn-secondary');
                pets_button.innerHTML = 'Learn more';
                pets_button.href = '#';

                pets_item_div.appendChild(pets_item_img);
                pets_item_div.appendChild(pets_names_div);
                pets_item_div.appendChild(pets_button);
                pets_items_div.appendChild(pets_item_div);
            })
            let slider_item_div = document.createElement('div');
            slider_item_div.classList.add('slider_item');
            slider_item_div.appendChild(pets_items_div);

            pets_slider_div.appendChild(slider_item_div);
            pets_carousel.appendChild(pets_slider_div);
        }
    }

    function deletePetItem() {
        let tns_outer = document.querySelector('.tns-outer');
        tns_outer.remove();
    }

    function randomPet() {
        deletePetItem();
        generatePetItem(json);
    }

    let random_button = document.querySelectorAll('.random_button');
    random_button.forEach(el => {
        el.addEventListener('click', randomPet);
    })

    let arr_length = 0;
    function generatePetItem(pets_json) {
        let pets_obj = pets_json;
        let pets_pagination_div = document.querySelector('.pets_pagination');
        // пагинация
        if (pets_pagination_div) {

            let pets_obj_arr = [];
            arr_length = 48 / pets_obj.length;
            for (let i = 0; i < arr_length; i++) {
                pets_obj_arr[i] = shuffle(pets_obj);
                pets_obj_arr[i] = pets_obj_arr[i];
            }

            generatePetDOM(pets_obj_arr);

            let next_button = document.querySelector('.next_button');
            let prev_button = document.querySelector('.prev_button');
            let first_button = document.querySelector('.first_button');
            let last_button = document.querySelector('.last_button');
            let page = document.querySelector('.slider_button.active')

            next_button.onclick = function () {
                pets_pagination.goTo('next');
            };

            prev_button.onclick = function () {
                pets_pagination.goTo('prev');
            };

            first_button.onclick = function () {
                pets_pagination.goTo('first');
            };

            last_button.onclick = function () {
                pets_pagination.goTo('last');
            };

            pets_pagination = tns({
                container: '.pets_slider',
                nav: false,
                controls: false,
                loop: false,
                mouseDrag: true,
                preventActionWhenRunning: true,
            });

            pets_pagination.events.on('indexChanged', () => {
                let index = pets_pagination.getInfo().index;
                page.textContent = index + 1;
                if (index == arr_length - 1) {
                    next_button.disabled = true;
                    last_button.disabled = true;
                }
                if (index < arr_length - 1) {
                    next_button.disabled = false;
                    last_button.disabled = false;
                }
                if (index == 0) {
                    prev_button.disabled = true;
                    first_button.disabled = true;
                }
                if (index > 0) {
                    prev_button.disabled = false;
                    first_button.disabled = false;
                }
            });
        }

        //слайдер на главной странице
        else {
            let pets_obj_arr = [];

            for (let i = 0; i < 2; i++) {
                pets_obj_arr[i] = shuffle(pets_obj);
                pets_obj_arr[i] = pets_obj_arr[i].slice(5);
            }
            generatePetDOM(pets_obj_arr);

            pets_slider = tns({
                container: '.pets_slider',
                nav: false,
                controls: false,
                loop: true,
                preventActionWhenRunning: true,
            });

            let next_button = document.querySelector('.next_button');
            let prev_button = document.querySelector('.prev_button');

            next_button.onclick = function () {
                pets_slider.goTo('prev');
            };

            prev_button.onclick = function () {
                pets_slider.goTo('prev');
            };



        }
    }

    fetch('../../assets/json/pets.json')
        .then(response => response.json())
        .then(pets_json => {
            json = pets_json;
            generatePetItem(pets_json);
        })
        .then(() => {
            // массив с животными по клику на который
            // открывается модальное окно
            let pets_items = document.querySelectorAll('.pets_item');

            pets_items.forEach(pets_item => {
                pets_item.addEventListener('click', () => {
                    blackout.classList.toggle('active');
                    modal_pets.classList.toggle('active');
                });
                pets_item.addEventListener('mouseover', () => {
                    let btn_secondary = document.querySelector('.btn-secondary');
                    btn_secondary.classList.toggle('hover');
                });
                pets_item.addEventListener('mouseout', () => {
                    let btn_secondary = document.querySelector('.btn-secondary');
                    btn_secondary.classList.toggle('hover');
                });
            });
        });
});