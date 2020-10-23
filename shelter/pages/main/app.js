document.addEventListener('DOMContentLoaded', () => {
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
                pets_names_div.innerHTML = pet.name;

                let pets_button = document.createElement('a');
                pets_button.classList.add('btn-secondary');
                pets_button.innerHTML = 'Learn more';
                pets_button.href = '#';

                pets_item_div.appendChild(pets_item_img);
                pets_item_div.appendChild(pets_names_div);
                pets_item_div.appendChild(pets_button);
                pets_items_div.appendChild(pets_item_div);
            });
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

    function randomPet(pets_json, size) {
        deletePetItem();
        generatePetItem(pets_json, size);
    }

    function generatePetItem(pets_json, size) {
        let pets_obj_arr = [];
        let arr_length = 0;
        let pets_obj = pets_json;
        let pets_pagination_div = document.querySelector('.pets_pagination');
        // пагинация
        if (pets_pagination_div) {
            let pets = pets_json;

            fullPetsList = (() => {
                let tempArr = [];

                for (let i = 0; i < 6; i++) {
                    const newPets = pets;

                    for (let j = pets.length; j > 0; j--) {
                        let randInd = Math.floor(Math.random() * j);
                        const randElem = newPets.splice(randInd, 1)[0];
                        newPets.push(randElem);
                    }

                    tempArr = [...tempArr, ...newPets];
                }
                return tempArr;
            })();

            const sort6recursively = (list) => {
                const length = list.length;

                for (let i = 0; i < length / 6; i++) {
                    const stepList = list.slice(i * 6, i * 6 + 6);
                    for (let j = 0; j < 6; j++) {
                        const duplicatedItem = stepList.find((item, ind) => {
                            return item.name === stepList[j].name && ind !== j;
                        });
                        if (duplicatedItem !== undefined) {
                            const ind = i * 6 + j;
                            const which8OfList = Math.trunc(ind / 8);

                            list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

                            sort6recursively(list);
                        }
                    }
                }

                return list;
            };
            const sort863 = (list) => {
                let unique8List = [];
                let length = list.length;
                for (let i = 0; i < length / 8; i++) {
                    const uniqueStepList = [];
                    for (j = 0; j < list.length; j++) {
                        if (uniqueStepList.length >= 8) {
                            break;
                        }
                        const isUnique = !uniqueStepList.some((item) => {
                            return item.name === list[j].name;
                        });
                        if (isUnique) {
                            uniqueStepList.push(list[j]);
                            list.splice(j, 1);
                            j--;
                        }
                    }
                    unique8List = [...unique8List, ...uniqueStepList];
                }
                list = unique8List;

                list = sort6recursively(list);

                return list;
            };

            fullPetsList = sort863(fullPetsList);

            for (let i = 0; i < Math.ceil(fullPetsList.length / size); i++) {
                pets_obj_arr[i] = fullPetsList.slice(i * size, i * size + size);
            }

            generatePetDOM(pets_obj_arr);

            let next_button = document.querySelector('.next_button');
            let prev_button = document.querySelector('.prev_button');
            let first_button = document.querySelector('.first_button');
            let last_button = document.querySelector('.last_button');
            let page = document.querySelector('.slider_button.active');

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

            let pets_pagination = tns({
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
            for (let i = 0; i < 2; i++) {
                pets_obj_arr[i] = shuffle(pets_obj);
                pets_obj_arr[i] = pets_obj_arr[i].slice(5);
            }

            generatePetDOM(pets_obj_arr);

            let pets_slider = tns({
                container: '.pets_slider',
                nav: false,
                controls: false,
                loop: true,
                preventActionWhenRunning: true,
            });

            let next_button = document.querySelector('.next_button');
            let prev_button = document.querySelector('.prev_button');

            next_button.onclick = function () {
                randomPet(pets_obj);
                pets_slider.goTo('prev');
            };

            prev_button.onclick = function () {
                randomPet(pets_obj);
                pets_slider.goTo('prev');
            };
        }
    }

    function generateModalPets(current_pets_item) {
        for (let i = 0; i < pets_obj_arr[0].length; i++) {
            if (pets_obj_arr[0][i].name == current_pets_item.querySelector('.pets_names').textContent) pets_item = pets_obj_arr[0][i];
        }
        let modal_pets_img = document.querySelector('.modal_pets img');
        modal_pets_img.src = pets_item.img;

        let modal_pets_h3 = document.querySelector('.modal_pets_content h3');
        modal_pets_h3.innerHTML = pets_item.name;

        let modal_pets_h4 = document.querySelector('.modal_pets_content h4');
        modal_pets_h4.innerHTML = `${pets_item.type} - ${pets_item.breed}`;

        let modal_pets_description = document.querySelector('.modal_pets_content p');
        modal_pets_description.innerHTML = pets_item.description;

        let modal_pets_age = document.querySelector('.modal_pets_content ul li:nth-child(1)');
        modal_pets_age.innerHTML = `<span>Age: </span> ${pets_item.age}`;

        let modal_pets_inoculations = document.querySelector('.modal_pets_content ul li:nth-child(2)');
        modal_pets_inoculations.innerHTML = `<span>Inoculations: </span> ${pets_item.inoculations}`;

        let modal_pets_diseases = document.querySelector('.modal_pets_content ul li:nth-child(3)');
        modal_pets_diseases.innerHTML = `<span>Diseases: </span> ${pets_item.diseases}`;

        let modal_pets_parasites = document.querySelector('.modal_pets_content ul li:nth-child(4)');
        modal_pets_parasites.innerHTML = `<span>Parasites: </span> ${pets_item.parasites}`;
    }

    fetch('../../assets/json/pets.json')
        .then((response) => response.json())
        .then((pets_json) => {
            let size = 8;
            generatePetItem(pets_json, size);
            return pets_json;
        })
        .then((pets_json) => {
            function resizePetItem() {
                if (window.screen.width <= 629) {
                    let size = 3;
                    deletePetItem();
                    generatePetItem(pets_json, size);
                }
                else if (window.screen.width <= 1200) {
                    let size = 6;
                    deletePetItem();
                    generatePetItem(pets_json, size);
                }
            }
            resizePetItem();

            let pets_items = document.querySelector('.pets_items');

            pets_items.addEventListener('mouseout', (e) => {
                if (e.target != pets_items) {
                    let current_pets_item = e.target.closest('.pets_item');
                    let btn_secondary = current_pets_item.querySelector('.btn-secondary');
                    btn_secondary.classList.toggle('hover');
                }
            });

            pets_items.addEventListener('mouseover', (e) => {
                if (e.target != pets_items) {
                    let current_pets_item = e.target.closest('.pets_item');
                    let btn_secondary = current_pets_item.querySelector('.btn-secondary');
                    btn_secondary.classList.toggle('hover');
                }
            });

            pets_items.addEventListener('click', (e) => {
                if (e.target != pets_items) {
                    let current_pets_item = e.target.closest('.pets_item');

                    generateModalPets(current_pets_item);
                    blackout.classList.toggle('active');
                    modal_pets.classList.toggle('active');
                }
            });
        });
});
