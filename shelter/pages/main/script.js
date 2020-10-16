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
    let header = document.querySelector('.header');
    let logo = document.querySelector('.logo');
    let cloneLogo = logo.cloneNode(true);

    let randomIds = generateRandomIds(3);

    if (data) {
        appendPetCardsToDom(randomIds);
    }

    burgerButton.addEventListener('click', () => {
        if (burgerButton.classList.contains('burger-button_active')) {
            burgerButton.classList.remove('burger-button_active');
            burgerMenu.classList.remove('burger__menu_active');
            header.classList.remove('background_shadow');
            logo.classList.remove('logo_none');
            cloneLogo.remove();
        } else {
            burgerButton.classList.add('burger-button_active');
            burgerMenu.classList.add('burger__menu_active');
            header.classList.add('background_shadow');
            logo.classList.add('logo_none');
            burgerMenu.append(cloneLogo);
        }
    })

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

