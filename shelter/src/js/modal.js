export default class Modal {
    constructor(classes) {
        this.classes = classes;
        this.modal = '';
        this.overlay = '';
        this.modalCloseBtn = '';
    }

    buildModal(content) {
        this.overlay = this.createDomNode('div', 'overlay');
        this.modal = this.createDomNode('div', 'modal', this.classes);
        this.modalCloseBtn = this.createDomNode('span', 'button', 'round__button', 'button_bordered', 'modal__close-button');
        
        this.setContent(content);
        this.generateModal();
        this.bindEvents();
        this.openModal();
    }

    bindEvents() {
        this.overlay.addEventListener('click', this.closeModal);
    }

    openModal() {
        document.body.append(this.overlay);
    }

    closeModal(e) {
        let classes = e.target.classList;
        if (classes.contains('overlay') || classes.contains('modal__close-button')) {
            document.querySelector('.overlay').remove();
        }
    }

    createDomNode(element, ...classes) {
        let node = document.createElement(element);
        node.classList.add(...classes);
        return node;
    }

    setContent(content) {
        if (typeof content === 'string') {
            this.modal.innerHTML = content;
        } else {
            this.modal.append(content);
        }
    }

    generateModal() {
        this.modal.firstChild.append(this.modalCloseBtn);
        this.overlay.append(this.modal);
    }

}