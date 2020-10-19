import Modal from './modal.js';

export default class PetCard {
    constructor({id, name, img, type, breed, description, age, inoculations, diseases, parasites}) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;
    }

    generatePetCard() {
        let template = '';
        const card = document.createElement('div');
        card.className = 'card';
        card.id = this.id;
        this.addModalToPetCard(card);
        template = `<div class="card__image">
                        <img src="${this.img}" alt="pet-${this.name}">
                    </div>
                    <span class="card__name">${this.name}</span>
                    <button class="button button_bordered">Learn more</button>`;
        card.innerHTML = template;
        return card;
    }

    /* Modal */

    addModalToPetCard(card) {
        card.addEventListener('click', () => {
            let petModal = new Modal('pet-modal');
            let content = `<div class="modal__content">
                            <div class="modal__image">
                                <img src="${this.img}" alt="pet-${this.name}">
                            </div>
                            <div class="modal__text">
                                <h3>${this.name}</h3>
                                <h4>${this.type} - ${this.breed}</h4>
                                <h5>${this.description}</h5>
                                <ul class="modal__list">
                                    <li><h5><b>Age: </b>${this.age}</h5></li>
                                    <li><h5><b>Inoculations: </b>${this.inoculations}</h5></li>
                                    <li><h5><b>Diseases: </b>${this.diseases}</h5></li>
                                    <li><h5><b>Parasites: </b>${this.parasites}</h5></li>
                                </ul>
                            </div>
                        </div>`;
            petModal.buildModal(content);
        });
    }
}

