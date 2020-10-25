import data from '../../js/pets-mock.js';
import PetCard from '../../js/pet-card.js';
import PetsGeneratedData from '../../js/pets-generated-data.js';

window.onload = function() {
    const petsData = new PetsGeneratedData(data).generatePetsData();

    const petsList = document.querySelector('.pets__list'),
            burgerButton = document.querySelector('.burger-button'),
            burgerMenu = document.querySelector('.burger__menu'),
            navigationItemActive = document.querySelector('.item_active'),
            shadowWrapper = document.querySelector('.shadow__wrapper'),
            logo = document.querySelector('.logo'),
            cloneLogo = logo.cloneNode(true);

    const nextPage = document.getElementById('next-page'),
            prevPage = document.getElementById('prev-page'),
            firstPage = document.getElementById('first-page'),
            lastPage = document.getElementById('last-page'),
            activePageElement = document.getElementById('active-page');

    let activePage = 1;
    let itemsQuantityPerPage = 0;
    let pageQuantity = 0;

    const petsDataLength = petsData.length;


    window.addEventListener('resize', () => {
        if (document.body.offsetWidth >= 1280) {
            if (itemsQuantityPerPage !== 8) {
                updateItemsPerPage(8)
            }
        } else if (document.body.offsetWidth >= 768) {
            if (itemsQuantityPerPage !== 6) {
                updateItemsPerPage(6)
            }
        } else {
            if (itemsQuantityPerPage !== 3) {
                updateItemsPerPage(3)
            }
        }
    });

    if (petsData) {

        if (document.body.offsetWidth >= 1280) {
            itemsQuantityPerPage = 8;
        } else if (document.body.offsetWidth >= 768) {
            itemsQuantityPerPage = 6;
        } else {
            itemsQuantityPerPage = 3;
        }

        pageQuantity = petsDataLength / itemsQuantityPerPage;
        console.log("pageQuantity - ", pageQuantity);

        appendPetCardsToDom(petsData.slice(activePage * itemsQuantityPerPage - itemsQuantityPerPage, activePage * itemsQuantityPerPage));
    }

    function updateItemsPerPage(itemsQuantity) {
        itemsQuantityPerPage = itemsQuantity;
        pageQuantity = petsDataLength / itemsQuantityPerPage;
        if (activePage > pageQuantity) {
            activePage = pageQuantity;
            activePageElement.innerText = activePage;
        }
        changePetsCardsInDom(petsData.slice(activePage * itemsQuantityPerPage - itemsQuantityPerPage, activePage * itemsQuantityPerPage));
        updateButtonAvailability();
    }

    function updateButtonAvailability () {
        if (activePage > 1) {
            prevPage.disabled = false;
            firstPage.disabled = false;
        }

        if (activePage === pageQuantity) {
            nextPage.disabled = true;
            lastPage.disabled = true;
        }

        if (activePage === 1) {
            prevPage.disabled = true;
            firstPage.disabled = true;
        }

        if (activePage < pageQuantity) {
            nextPage.disabled = false;
            lastPage.disabled = false;
        }
    }

    nextPage.addEventListener('click', () => {
        if (activePage < pageQuantity) {
            activePage++;
            changePetsCardsInDom(petsData.slice(activePage * itemsQuantityPerPage - itemsQuantityPerPage, activePage * itemsQuantityPerPage));
            console.log(activePage);
        }

        updateButtonAvailability();

        activePageElement.innerText = activePage;
    });

    prevPage.addEventListener('click', () => {
        if (activePage > 1) {
            activePage--;
            changePetsCardsInDom(petsData.slice(activePage * itemsQuantityPerPage - itemsQuantityPerPage, activePage * itemsQuantityPerPage));
            console.log(activePage);
        }

        updateButtonAvailability();

        activePageElement.innerText = activePage;
    });

    firstPage.addEventListener('click', () => {
        activePage = 1;
        nextPage.disabled = false;
        lastPage.disabled = false;
        firstPage.disabled = true;
        prevPage.disabled = true;
        changePetsCardsInDom(petsData.slice(activePage * itemsQuantityPerPage - itemsQuantityPerPage, activePage * itemsQuantityPerPage));

        activePageElement.innerText = activePage;
    });

    lastPage.addEventListener('click', () => {
        activePage = pageQuantity;
        nextPage.disabled = true;
        prevPage.disabled = false;
        firstPage.disabled = false;
        lastPage.disabled = true;
        changePetsCardsInDom(petsData.slice(activePage * itemsQuantityPerPage - itemsQuantityPerPage, activePage * itemsQuantityPerPage));

        activePageElement.innerText = activePage;
    });

    navigationItemActive.addEventListener('click', () => {
        if (burgerButton.classList.contains('burger-button_active')) {
            toggleBurgerMenu();
        }
    });

    burgerButton.addEventListener('click', () => {
        toggleBurgerMenu();
    });

    shadowWrapper.addEventListener('click', () => {
        toggleBurgerMenu();
    });

    function toggleBurgerMenu() {
        burgerButton.classList.toggle('burger-button_active');
        burgerMenu.classList.toggle('burger__menu_active');
        shadowWrapper.classList.toggle('shadow__wrapper_active');
        logo.classList.toggle('logo_none');
    
        if (burgerButton.classList.contains('burger-button_active')) {
            burgerMenu.append(cloneLogo);
        } else {
            cloneLogo.remove();
        };
    }

    function changePetsCardsInDom (data) {
        while (petsList.hasChildNodes()) {  
            petsList.removeChild(petsList.firstChild);
        }
        appendPetCardsToDom(data);
    }
    
    function appendPetCardsToDom (data) {
        let card = '';
        data.forEach(item => {
            card = new PetCard(item);
            petsList.append(card.generatePetCard(['card_pets__list']));
        });
    }
}
