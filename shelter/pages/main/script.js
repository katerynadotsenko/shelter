import data from '../../js/pets-mock.js';
import PetCard from '../../js/pet-card.js';

let randomPart = 1;
let randomIds = 0;

window.onload = function() {
    let carouselWrapper = document.querySelector('.carousel__wrapper');
    let carouselContent = document.querySelector('.carousel__content');

    let carouselButtonPrev = document.querySelector('.round__button_right');
    let carouselButtonNext = document.querySelector('.round__button_left');

    let burgerButton = document.querySelector('.burger-button');
    let burgerMenu = document.querySelector('.burger__menu');
    let navigationItemActive = document.querySelector('.item_active');
    let shadowWrapper = document.querySelector('.shadow__wrapper');
    let logo = document.querySelector('.logo');
    let cloneLogo = logo.cloneNode(true);


    /* toggle burger menu */

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


    /* carousel */

    if (data) {
        if (carouselContent.offsetWidth >= 990) {
            randomIds = generateRandomIds(3);
        } else if (carouselContent.offsetWidth >= 580) {
            randomIds = generateRandomIds(2);
        } else {
            randomIds = generateRandomIds(1);
        }
        appendPetCardsToDom(randomIds, carouselContent);
    }

    window.addEventListener('resize', () => {
        let carouselContentCardsCount = document.querySelector('.carousel__content').childElementCount;
    
        if (carouselContent.offsetWidth >= 990) {
            if (carouselContentCardsCount !== 3) {
                randomIds = generateRandomIds(3);
                removePetCardsFromDom(carouselContent);
                appendPetCardsToDom(randomIds, carouselContent);
            }
        } else if (carouselContent.offsetWidth >= 580) {
            if (carouselContentCardsCount !== 2) {
                randomIds = generateRandomIds(2);
                removePetCardsFromDom(carouselContent);
                appendPetCardsToDom(randomIds, carouselContent);
            }
        } else {
            if (carouselContentCardsCount !== 1) {
                randomIds = generateRandomIds(1);
                removePetCardsFromDom(carouselContent);
                appendPetCardsToDom(randomIds, carouselContent);
            }
        }
    });

    carouselButtonPrev.addEventListener('click', () => {
        let carouselContent = document.querySelector('.carousel__content');

        let carouselContentPrev = document.createElement('div');
        carouselContentPrev.classList.add('carousel__content');
        carouselWrapper.append(carouselContentPrev);
        carouselContentPrev.style.left = '-100%';

        carouselContent.style.left = '100%';
        
        setTimeout(() => {
            carouselContent.remove();
        }, 300);
        
        setTimeout(() => {
            carouselContentPrev.style.left = '0';
        }, 50);

        if (carouselContent.offsetWidth >= 990) {
            randomIds = generateRandomIds(3);
        } else if (carouselContent.offsetWidth >= 580) {
            randomIds = generateRandomIds(2);
        } else {
            randomIds = generateRandomIds(1);
        }
        appendPetCardsToDom(randomIds, carouselContentPrev);
    });
    
    carouselButtonNext.addEventListener('click', () => {
        let carouselContent = document.querySelector('.carousel__content');
        
        let carouselContentPrev = document.createElement('div');
        carouselContentPrev.classList.add('carousel__content');
        carouselWrapper.append(carouselContentPrev);
        carouselContentPrev.style.left = '100%';

        carouselContent.style.left = '-100%';
        
        setTimeout(() => {
            carouselContent.remove();
        }, 300);
        
        setTimeout(() => {
            carouselContentPrev.style.left = '0';
        }, 50);

        if (carouselContent.offsetWidth >= 990) {
            randomIds = generateRandomIds(3);
        } else if (carouselContent.offsetWidth >= 580) {
            randomIds = generateRandomIds(2);
        } else {
            randomIds = generateRandomIds(1);
        }
        appendPetCardsToDom(randomIds, carouselContentPrev);
    });

    const toggleBurgerMenu = () => {
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
    randomPart = randomPart === 1 ? 2: 1
    return randomIds;
}

const appendPetCardsToDom = (randomIds, carouselContent) => {
    let card = '';
    randomIds.forEach(id => {
        card = new PetCard(data[id].id, data[id].name, data[id].img);
        carouselContent.append(card.generatePetCard());
    });
}

const removePetCardsFromDom = (carouselContent) => {
    while (carouselContent.hasChildNodes()) {  
        carouselContent.removeChild(carouselContent.firstChild);
    }
}

