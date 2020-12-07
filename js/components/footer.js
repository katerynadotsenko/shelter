export default class Footer {
    constructor() {

    }

    createFooter() {
        const footer = `<div class="wrapper footer__wrapper">
                            <div class="layout-2-column footer__content">
                                <div class="footer__contacts">
                                    <h3 class="footer__title">For questions and suggestions</h3>
                                    <div class="contacts__content">
                                        <a class="contacts__email" href="mailto:email@shelter.com">
                                            email@shelter.com
                                        </a>
                                        <a class="contacts__phone" href="tel:+13 674 567 75 54">
                                            +13 674 567 75 54
                                        </a>
                                    </div>
                                </div>
                                <div class="footer__location">
                                    <h3 class="footer__title">We are waiting for your visit</h3>
                                    <div class="location__content">
                                        <a class="location__address" target="_blank" href="https://goo.gl/maps/1TmWHPARgYmXR62W9">
                                            1 Central Street, Boston (entrance from the store)
                                        </a>
                                        <a class="location__address" target="_blank" href="https://goo.gl/maps/qrpuNcruwDfi8ALw9">
                                            18 South Park, London
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="footer__image"><img src="../../assets/images/footer-puppy.png" alt="puppy"></div>
                        </div>`;
        return footer;
    }

    appendFooterToDom() {
        const parent = document.querySelector('.footer');
        parent.innerHTML = this.createFooter();
    }
}