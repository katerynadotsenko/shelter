export default class PetCard {
    constructor(id, name, img) {
        this.id = id;
        this.name = name;
        this.img = img;
    }

    generatePetCard() {
        let template = '';
        const card = document.createElement('div');
        card.className = 'card';
        template = `<div class="card__image">
                        <img src="${this.img}" alt="pet-${this.name}">
                    </div>
                    <span class="card__name">${this.name}</span>
                    <button class="button button_bordered">Learn more</button>`;
        card.innerHTML = template;
        return card;
    }
}