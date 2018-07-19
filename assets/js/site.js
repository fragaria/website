function siteMenu(rootElem) {
    const toggles = rootElem.getElementsByClassName('js-sitenav-menu-toggle');

    for (let toggle of toggles) {
        toggle.addEventListener('click', function () {
            rootElem.classList.toggle('sitenav-wrapper--show');
            toggle.classList.toggle('sitenav__menu-toggle-link--active');
        });
    }
}

for (let sitenavRoot of document.getElementsByClassName('js-sitenav')) {
    siteMenu(sitenavRoot);
}
