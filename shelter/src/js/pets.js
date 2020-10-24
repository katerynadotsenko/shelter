import data from '../../js/pets-mock.js';
import PetCard from '../../js/pet-card.js';

window.onload = function() {

    const petsList = document.querySelector('.pets__list');
    let burgerButton = document.querySelector('.burger-button');
    let burgerMenu = document.querySelector('.burger__menu');
    let navigationItemActive = document.querySelector('.item_active');
    let shadowWrapper = document.querySelector('.shadow__wrapper');
    let logo = document.querySelector('.logo');
    let cloneLogo = logo.cloneNode(true);

    if (data) {
        appendPetCardsToDom(data, petsList);
    }

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
}

const appendPetCardsToDom = (data, petsList) => {
    let card = '';
    data.forEach(item => {
        card = new PetCard(item);
        petsList.append(card.generatePetCard(['card_pets__list']));
    });
}
