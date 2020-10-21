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

    //let pets_items_div = document.querySelector('.pets_items');
    let pets_pagination_div = document.querySelector('.pets_pagination');

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
    let json;
    let pets_pagination;
    let timeOutFunctionId;

    window.addEventListener('resize', function () {
        clearTimeout(timeOutFunctionId);
        timeOutFunctionId = setTimeout(resizePetItem, 500);
    });
    window.addEventListener('DOMContentLoaded', resizePetItem);

    function resizePetItem() {
        if (window.screen.width <= 629) {
            console.log('<629')
            slice_n = 5;
            deletePetItem();
            generatePetItem(json);
            pets_pagination = pets_pagination.rebuild();
        }
        else if (window.screen.width <= 1200) {
            console.log('<1200')
            slice_n = 2;
            deletePetItem();
            generatePetItem(json);
            pets_pagination = pets_pagination.rebuild();
        }
        else if (window.screen.width > 1280) {
            slice_n = 0;
        }
    }

    function deletePetItem() {
        let tns_item = document.querySelectorAll('.tns-item');
        tns_item.forEach(el => {
            el.remove();
        })

    }

    function generatePetItem(pets_json) {
        // пагинация
        let pets_obj = pets_json;
        let pets_obj_arr = [];
        let arr_length = 48 / pets_obj.slice(slice_n).length;
        for (let i = 0; i < arr_length; i++) {
            pets_obj_arr[i] = shuffle(pets_obj.slice(slice_n));
        }
        let x = 0;
        console.log(pets_obj_arr)
        if (x == 0) {
            for (let i = 0; i < pets_obj_arr.length; i++) {
                let page_div = document.createElement('div');
                page_div.classList.add(`page-${i}`);

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
                page_div.appendChild(pets_items_div);
                pets_pagination_div.appendChild(page_div);
            }
        }

        // слайдер на главной странице
        // else {
        //     pets_obj.map(function (pet) {
        //         let pets_item_div = document.createElement('div');
        //         pets_item_div.classList.add('pets_item');

        //         let pets_item_img = document.createElement('img');
        //         pets_item_img.src = pet.img;

        //         let pets_names_div = document.createElement('div');
        //         pets_names_div.classList.add('pets_names');
        //         pets_names_div.innerHTML = `${pet.name}`;

        //         let pets_button = document.createElement('a');
        //         pets_button.classList.add('btn-secondary');
        //         pets_button.innerHTML = 'Learn more';
        //         pets_button.href = '#';

        //         pets_item_div.appendChild(pets_item_img);
        //         pets_item_div.appendChild(pets_names_div);
        //         pets_item_div.appendChild(pets_button);
        //         pets_items_div.appendChild(pets_item_div);
        //     })
        // }
        return arr_length;
    }

    fetch('../../assets/json/pets.json')
        .then(response => response.json())
        .then(pets_json => {
            json = pets_json;
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

            pets_pagination = tns({
                container: '.pets_pagination',
                nav: false,
                controls: false,
                loop: false,
                mouseDrag: true,
            });

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

    function shuffle(array) {
        let arr = array.slice();;
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

});