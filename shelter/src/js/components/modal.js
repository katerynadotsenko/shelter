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
        this.overlay.addEventListener('mouseover', this.hoverAction);
        this.overlay.addEventListener('mouseout', this.outAction);
    }

    openModal() {
        document.body.append(this.overlay);
        document.body.classList.toggle('blocked');
        const overlay = document.querySelector('.overlay');
        const modal = document.querySelector('.modal');
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
        }, 100);
    }

    hoverAction(e) {
        const classes = e.target.classList;
        if ((classes.contains('overlay') || classes.contains('modal__close-button')) && !classes.contains('modal')) {
            document.querySelector('.modal__close-button').style.cssText = 'background-color: #FDDCC4; border: 2px solid #FDDCC4';
        }
    }

    outAction(e) {
        const classes = e.target.classList;
        if ((classes.contains('overlay') || classes.contains('modal__close-button')) && !classes.contains('modal')) {
            document.querySelector('.modal__close-button').style.cssText = 'background-color: transparent; border: 2px solid #F1CDB3';
        }
    }

    closeModal(e) {
        const classes = e.target.classList;
        if (classes.contains('overlay') || classes.contains('modal__close-button')) {
            const overlay = document.querySelector('.overlay');
            const modal = document.querySelector('.modal');
            overlay.style.opacity = '0';
            modal.style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.overlay').remove();
                document.body.classList.toggle('blocked');
            }, 300);
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