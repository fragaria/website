function siteMenu(rootElem) {
    const toggles = rootElem.getElementsByClassName('js-sitenav-menu__toggle');
    const links = rootElem.getElementsByClassName('js-sitenav__link');
    const currentUrl = window.location.pathname;

    for (let toggle of toggles) {
        toggle.addEventListener('click', function () {
            rootElem.classList.remove('sitenav-wrapper--noanim');
            rootElem.classList.toggle('sitenav-wrapper--show');

            if (toggle.classList.contains('is-active')) {
                toggle.classList.remove('is-active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('noscroll');
            } else {
                toggle.classList.add('is-active');
                toggle.setAttribute('aria-expanded', 'true');
                document.body.classList.add('noscroll');
            }
        });
    }

    for (let link of links) {
        link.addEventListener('click', function (evt) {
            const targetUrl = evt.target.closest('.js-sitenav-menu__anchor').getAttribute('href');
            const targetSuffix = targetUrl.replace(currentUrl, '');

            // id-based navigation on current page
            if (targetSuffix.startsWith('#')) {
                evt.preventDefault();

                const sitenavWrap = rootElem;
                const sitenavMenu = rootElem.getElementsByClassName('js-sitenav-menu')[0];
                const sitenavMenuHeight = sitenavMenu.getBoundingClientRect().height;
                const target = document.getElementById(targetSuffix.substring(1));
                window.scroll({top: target.offsetTop, behavior: 'smooth'});

                rootElem.classList.add('sitenav-wrapper--noanim');
                rootElem.classList.remove('sitenav-wrapper--show');
                document.body.classList.remove('noscroll');

                for (let toggle of toggles) {
                    toggle.classList.remove('is-active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

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

/**
 * Expand portfolio strip on click and hide 'Show more' button at the same time.
 * @param {HTMLElement} element
 */
function expandPortfolio(element) {
    const toggle = element.getElementsByClassName('js-portfolio-strip__expand-toggle')[0];

    toggle.addEventListener('click', function () {
        element.classList.remove('portfolio-strip--collapsed');
    });
}

/**
 * Shrink site navigation when user scrolls 100px down
 * and takes it backs when user returns to top
 * @param {HTMLElement} element
 */
function shirkSidenavOnScroll(element) {
    const onScroll = () => {
        const scrolled = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

        scrolled > 100 ?
            element.classList.add('sitenav--shrinked') :
            element.classList.remove('sitenav--shrinked');
    }

    const enableAnimations = () => {
        element.classList.add('sitenav--animated');
    }

    const raf = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;
    let lastScrollTop = document.documentElement.scrollTop;

    if (raf) {
        // make sure to run it first time too
        onScroll();
        loop();
        setTimeout(enableAnimations);
    }

    function loop() {
        let scrollTop = document.documentElement.scrollTop;

        if (lastScrollTop === scrollTop) {
            raf(loop);
            return;
        } else {
            lastScrollTop = scrollTop;

            // fire scroll function if scrolls vertically
            onScroll();
            raf(loop);
        }
    }
}

/**
 * This function will automatically add anchors for all the h* elements
 * found within the rootElem descendant nodes.
 * @param {HTMLElement} rootElem
 */
function autoAddHeadlineAnchors(rootElem) {
    const headlines = rootElem.querySelectorAll('h1,h2,h3,h4,h5,h6');

    for (let headline of headlines) {
        const anchorUrl = window.location.pathname + '#' + headline.getAttribute('id');
        const anchor = document.createElement('a');
        anchor.setAttribute('title', 'Link to this heading');
        anchor.setAttribute('aria-hidden', 'true');
        anchor.setAttribute('href', anchorUrl);
        anchor.classList.add('headline-link');
        const anchorIcon = document.createElement('i');
        anchorIcon.classList.add('icon--link');
        anchor.appendChild(anchorIcon);
        headline.appendChild(anchor);
    }
}


const handlers = [
    {className: 'js-sitenav', handler: siteMenu},
    {className: 'js-sitenav', handler: shirkSidenavOnScroll},
    {className: 'js-site-reload-button', handler: siteReload},
    {className: 'js-fix-baseline', handler: fixBaseline},
    {className: 'js-portfolio-strip', handler: expandPortfolio},
    {className: 'js-auto-add-headline-anchors', handler: autoAddHeadlineAnchors},
];

handlers.forEach(({className, handler}) => {
    for (let rootElem of document.getElementsByClassName(className)) {
        handler(rootElem);
    }
});

if (window.location.href.indexOf('?showgrid') !== -1) {
    document.getElementsByClassName('js-baseline-grid')[0].classList.add('baseline-grid--visible');
}
