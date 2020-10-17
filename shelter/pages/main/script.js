import data from '../../js/pets-mock.js';
import PetCard from '../../js/pet-card.js';

let carouselContent = '';
let carouselButtonPrev = '';
let carouselButtonNext = '';
let randomPart = 1;

window.onload = function() {
    carouselContent = document.querySelector('.carousel__content');

    carouselButtonPrev = document.querySelector('.round__button_left');
    carouselButtonNext = document.querySelector('.round__button_right');

    let burgerButton = document.querySelector('.burger-button');
    let burgerMenu = document.querySelector('.burger__menu');
    let shadowWrapper = document.querySelector('.shadow__wrapper');
    let logo = document.querySelector('.logo');
    let cloneLogo = logo.cloneNode(true);

    let randomIds = generateRandomIds(3);

    if (data) {
        appendPetCardsToDom(randomIds);
    }

    burgerButton.addEventListener('click', () => {
        toggleBurgerMenu();
    });

    shadowWrapper.addEventListener('click', () => {
        toggleBurgerMenu();
    });

    carouselButtonPrev.addEventListener('click', () => {
        while (carouselContent.hasChildNodes()) {  
            carouselContent.removeChild(carouselContent.firstChild);
          }
        randomIds = generateRandomIds(3);
        appendPetCardsToDom(randomIds);
    });
    
    carouselButtonNext.addEventListener('click', () => {
        while (carouselContent.hasChildNodes()) {  
            carouselContent.removeChild(carouselContent.firstChild);
          }
        randomIds = generateRandomIds(3);
        appendPetCardsToDom(randomIds);
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

const generateRandomIds = (cardQuantity) => {
    let randomIds = [];
    for (let i = 1; i <= cardQuantity; i++) {
        let randomId = randomPart === 1 ? Math.floor(Math.random() * data.length/2) : Math.floor(Math.random() * data.length/2) + Math.floor(data.length/2);
        if (randomIds.find(item => item === randomId) !== undefined) {
            i--;
        } else {
            randomIds.push(randomId);
        }
    }
    console.log("randomIds - ", randomIds);
    randomPart = randomPart === 1 ? 2: 1
    return randomIds;
}

const appendPetCardsToDom = (randomIds) => {
    let card = '';
    randomIds.forEach(id => {
        card = new PetCard(data[id].id, data[id].name, data[id].img);
        carouselContent.append(card.generatePetCard());
    });
}

