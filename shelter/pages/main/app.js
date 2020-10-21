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
    }, false);

    menu_close.addEventListener('click', () => {
        logo.classList.toggle('hidden');
        blackout.classList.toggle('active');
        menu_popup.classList.toggle('active');
        menu_close.classList.toggle('menu_close');
        menu_trigger.classList.toggle('menu_close');

        pets_header.style.cssText = 'position: sticky';
    }, false);

    modal_close.addEventListener('click', () => {
        blackout.classList.toggle('active');
        modal_pets.classList.toggle('active');
    }, false);

    blackout.addEventListener('click', () => {
        modal_pets.classList.remove('active');
        menu_popup.classList.toggle('active');
        logo.classList.toggle('hidden');
        menu_trigger.classList.toggle('menu_close');
        menu_close.classList.toggle('menu_close');
        blackout.classList.toggle('active');
    }, false);

    blackout.addEventListener('mouseover', () => {
        modal_close.classList.add('hover');
    }, false);

    blackout.addEventListener('mouseout', () => {
        modal_close.classList.remove('hover');
    }, false);

    let slice_n = 0;

    function generatePetItem(pets_json) {
        // пагинация
        let pets_obj = pets_json;
        let pets_obj_arr = [];
        let arr_length = 48 / pets_obj.slice(slice_n).length;
        //let pets_items_div = document.querySelector('.pets_items');
        let pets_pagination_div = document.querySelector('.pets_pagination');

        for (let i = 0; i < arr_length; i++) {
            pets_obj_arr[i] = shuffle(pets_obj.slice(slice_n));
        }

        let x = 0;

        for (let i = 0; i < pets_obj_arr.length; i++) {
            let page_div = createNode('div');
            page_div.classList.add(`page-${i}`);

            let pets_items_div = createNode('div');
            pets_items_div.classList.add('pets_items');

            pets_obj_arr[i].map(function (pet) {
                let pets_item_div = createNode('div');
                pets_item_div.classList.add('pets_item');

                let pets_item_img = createNode('img');
                pets_item_img.src = pet.img;

                let pets_names_div = createNode('div');
                pets_names_div.classList.add('pets_names');
                pets_names_div.innerHTML = `${pet.name}`;

                let pets_button = createNode('a');
                pets_button.classList.add('btn-secondary');
                pets_button.innerHTML = 'Learn more';
                pets_button.href = '#';

                append(pets_item_div, pets_item_img);
                append(pets_item_div, pets_names_div);
                append(pets_item_div, pets_button);
                append(pets_items_div, pets_item_div);
            })
            append(page_div, pets_items_div);
            append(pets_pagination_div, page_div);
        }

        // слайдер на главной странице
        // else {
        //     pets_obj.map(function (pet) {
        //         let pets_item_div = createNode('div');
        //         pets_item_div.classList.add('pets_item');

        //         let pets_item_img = createNode('img');
        //         pets_item_img.src = pet.img;

        //         let pets_names_div = createNode('div');
        //         pets_names_div.classList.add('pets_names');
        //         pets_names_div.innerHTML = `${pet.name}`;

        //         let pets_button = createNode('a');
        //         pets_button.classList.add('btn-secondary');
        //         pets_button.innerHTML = 'Learn more';
        //         pets_button.href = '#';

        //         append(pets_item_div, pets_item_img);
        //         append(pets_item_div, pets_names_div);
        //         append(pets_item_div, pets_button);
        //         append(pets_items_div, pets_item_div);
        //     })
        // }

        return arr_length;
    }

    fetch('../../assets/json/pets.json')
        .then(response => response.json())
        .then(pets_json => {
            generatePetItem(pets_json);
        })
        .then((arr_length) => {
            // let index_slider = tns({
            //     container: '.pets_items.main_pets',
            //     controlsContainer: '.control_buttons',
            //     nav: false,
            //     mouseDrag: true,
            //     responsive: {
            //         320: {
            //             items: 1,
            //             gutter: 0,
            //         },
            //         767: {
            //             items: 2,
            //             gutter: 40,
            //         },
            //         1279: {
            //             items: 3,
            //             gutter: 90,
            //         },
            //     }
            // });

            let pets_pagination = tns({
                container: '.pets_pagination',
                nav: false,
                controls: false,
                loop: false,
                mouseDrag: true,
            });

            window.addEventListener('DOMContentLoaded', () => {
                if (window.screen.width > 1280) {
                    slice_n = 0;
                }
                if (window.screen.width <= 1280) {
                    slice_n = 2;
                }
                if (window.screen.width <= 629) {
                    slice_n = 5;
                }
            })

            function resize() {
                if (window.screen.width > 1280) {
                    slice_n = 0;
                    pets_pagination.destroy();
                    pets_pagination = pets_pagination.rebuild();
                }
                if (window.screen.width <= 1280) {
                    slice_n = 2;
                    pets_pagination.destroy();
                    pets_pagination = pets_pagination.rebuild();
                }
                if (window.screen.width <= 629) {
                    slice_n = 5;
                }
            }

            window.addEventListener('resize', resize());

            let next_button = document.querySelector('.next_button');
            let prev_button = document.querySelector('.prev_button');
            let first_button = document.querySelector('.first_button');
            let last_button = document.querySelector('.last_button');
            let page = document.querySelector('.slider_button.active')
            let pagination_buttons_arr = document.querySelectorAll('.slider_button')

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
            pagination_buttons_arr.forEach(el => {
                el.addEventListener('click', () => {
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
                })
            });

            // массив с животными по клику на который
            // открывается модальное окно
            let pets_items = document.querySelectorAll('.pets_item');

            [].forEach.call(pets_items, function (pets_item) {
                pets_item.addEventListener('click', () => {
                    blackout.classList.toggle('active');
                    modal_pets.classList.toggle('active');
                }, false);
            });
        });

    function createNode(element) {
        return document.createElement(element);
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }

    function shuffle(array) {
        let arr = array.slice();;
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

});