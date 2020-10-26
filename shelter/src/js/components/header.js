export default class Header {
    constructor(page) {
        this.page = page;
    }

    createHeader() {
        const header = `<div class="wrapper header__wrapper">
                            <div class="logo">
                                <a class="logo__link" href="../main/index.html" onclick="${this.page === 'main' ? 'return false;' : ''}">
                                    <h1 class="logo__title ${this.page === 'main' ? 'logo__title_light' : 'logo__title_dark'}">Cozy House</h1>
                                    <span class="logo__subtitle ${this.page === 'main' ? 'logo__subtitle_light' : 'logo__subtitle_dark'}">Shelter for pets in Boston</span>
                                </a>
                            </div>
                            <div class="burger-button ${this.page === 'main' ? '' : 'burger-button_dark'}">
                                <span></span>
                            </div>
                            <nav class="header__navigation burger__menu">
                                <ul class="navigation">
                                    <a href="../main/index.html">
                                        <li class="navigation__item ${this.page === 'main' ? 'navigation__item_light navigation__item_active' : 'navigation__item_dark'}">About the shelter</li>
                                    </a>
                                    <a href="../pets/index.html">
                                        <li class="navigation__item ${this.page === 'main' ? 'navigation__item_light' : 'navigation__item_dark navigation__item_active'}">Our pets</li>
                                    </a>
                                    <a href="#" onclick="return false;">
                                        <li class="navigation__item ${this.page === 'main' ? 'navigation__item_light' : 'navigation__item_dark'} navigation__item_inactive">Help the shelter</li>
                                    </a>
                                    <a href="#" onclick="return false;">
                                        <li class="navigation__item ${this.page === 'main' ? 'navigation__item_light' : 'navigation__item_dark'} navigation__item_inactive">Contacts</li>
                                    </a>
                                </ul>
                            </nav>
                            <div class="shadow__wrapper"></div>
                        </div>`
        return header;
    }

    appendHeaderToDom() {
        const parent = document.querySelector('.header');
        parent.innerHTML = this.createHeader();

    }
}