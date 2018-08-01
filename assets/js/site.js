function siteMenu(rootElem) {
    const toggles = rootElem.getElementsByClassName('js-sitenav-menu-toggle');
    const links = rootElem.getElementsByClassName('js-sitenav-link');

    for (let toggle of toggles) {
        toggle.addEventListener('click', function () {
            rootElem.classList.toggle('sitenav-wrapper--show');
            toggle.classList.toggle('sitenav__menu-toggle-link--active');
        });
    }

    for (let link of links) {
        link.addEventListener('click', function () {
            rootElem.classList.remove('sitenav-wrapper--show');
        });

        for (let toggle of toggles) {
            toggle.classList.remove('sitenav__menu-toggle-link--active');
        }
    }
}

/**
 * Simple window reload handler.
 * @param {HTMLElement} rootElem
 */
function siteReload(rootElem) {
    rootElem.addEventListener('click', function () {
        window.location.reload();
    });
}

/**
 * This function will augment arbitrary block objects not to break baseline text
 * flow if they have height that is not a straight mutiple of baseline grid size.
 * It is primarily meant for images which have arbitrary height that
 * will break the baseline flow of text that follows after them.
 *
 * Imagine you have baseline grid of 16px and image has height of 72px. This
 * would make all the trailing text shifted against baseline by 8px (72 - 16 * 4 = 8).
 *
 * For images, this function will fix their height to a integer rem value (floored).
 *
 * For other objects, This function will add either positive or negative margin
 * to the object whichever is closer to the next baseline grid line.
 *
 * @param {HTMLElement} element
 */
function fixBaseline(element) {
    function _fix() {
        // Get actual size of 1 rem in px
        const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const elemHeight = element.getBoundingClientRect().height;
        const elemHeightInRem = elemHeight / remSize;

        // Fix images using setting their height to a direct multiple of 1rem
        if (element instanceof HTMLImageElement) {
            if (elemHeightInRem % 1 !== 0) {
                element.style.height = Math.floor(elemHeightInRem) + 'rem';
            }
        }
        // Fix other elements by adjusting their margin
        else {
            const heightDecimalPart = elemHeightInRem % 1;
            const marginInRem = heightDecimalPart > 0.5 ?
                1 - heightDecimalPart :
                heightDecimalPart * -1;
            element.style.marginBottom = marginInRem + 'rem';
        }
    }

    // Wait for image to load.
    if (element instanceof HTMLImageElement) {
        element.complete ? _fix() : element.onload = _fix;
    } else {
        _fix();
    }

}

const handlers = [
    {className: 'js-sitenav', handler: siteMenu},
    {className: 'js-site-reload-button', handler: siteReload},
    {className: 'js-fix-baseline', handler: fixBaseline},
];

handlers.forEach(({className, handler}) => {
    for (let rootElem of document.getElementsByClassName(className)) {
        handler(rootElem);
    }
});

if (window.location.href.indexOf('?showgrid') !== -1) {
    document.getElementsByClassName('js-baseline-grid')[0].classList.add('baseline-grid--visible');
}
