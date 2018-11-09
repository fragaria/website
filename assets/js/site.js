var GRID_REMS = 1.5;

var forEachNode = function (nodelist, callback, scope) {
    for (var i = 0; i < nodelist.length; i++) {
        callback.call(scope, i, nodelist[i]); // passes back stuff we need
    }
};


// String.startsWith polyfill for IE
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}


function showIEWarning(rootElem) {
    function isIE() {
        var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
        var msie = ua.indexOf('MSIE '); // IE 10 or older
        var trident = ua.indexOf('Trident/'); //IE 11

        return (msie > 0 || trident > 0);
    }

    if (isIE() && document.cookie.indexOf('iewarndismissed') == -1) {
        rootElem.classList.add('old-ie');

        forEachNode(rootElem.querySelectorAll('.js-ie-warn__dismiss'), function (index, dismissToggle) {
            dismissToggle.addEventListener('click', function () {
                var date = new Date();
                date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
                // store cookie not to bother with this again
                document.cookie = "iewarndismissed=true; expires=" + date.toGMTString(); + " path=/";
                rootElem.classList.remove('old-ie');
            });
        });
    }
}


function siteMenu(rootElem) {
    var toggles = rootElem.getElementsByClassName('js-sitenav-menu__toggle');
    var links = rootElem.getElementsByClassName('js-sitenav__link');
    var currentUrl = window.location.pathname;

    forEachNode(toggles, function (index, toggle) {
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
    });

    forEachNode(links, function (index, link) {
        link.addEventListener('click', function (evt) {
            var targetAnchor = evt.target.closest('.js-sitenav-menu__anchor');

            if (! targetAnchor) {
                console.warn('Could not found target anchor for current click evt.', evt);
                return;
            }

            var targetUrl = targetAnchor.getAttribute('href');
            var targetSuffix = targetUrl.replace(currentUrl, '');

            // id-based navigation on current page
            if (targetSuffix.startsWith('#')) {
                evt.preventDefault();

                var sitenavWrap = rootElem;
                var sitenavMenu = rootElem.getElementsByClassName('js-sitenav-menu')[0];
                var sitenavMenuHeight = sitenavMenu.getBoundingClientRect().height;
                var targetId = targetSuffix.substring(1);
                var target = document.getElementById(targetId);
                window.scroll({top: target.offsetTop, behavior: 'smooth'});
                history.pushState({}, evt.target.text, targetUrl);

                rootElem.classList.add('sitenav-wrapper--noanim');
                rootElem.classList.remove('sitenav-wrapper--show');
                document.body.classList.remove('noscroll');

                forEachNode(toggles, function (index, toggle) {
                    toggle.classList.remove('is-active');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            }
        });
    });
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
        var remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        var gridUnitSize = remSize * GRID_REMS;

        var elemStyle = element.currentStyle || getComputedStyle(element);
        // Actual element height *without* the margin.
        var elemBoundingHeight = element.getBoundingClientRect().height;
        // Current margin of the element in px.
        var elemBottomMargin = elemStyle.marginBottom ? parseFloat(elemStyle.marginBottom) : 0;
        // Total height of the element in px.
        var elemHeight = elemBoundingHeight + elemBottomMargin;

        var elemHeightInGu = elemHeight / gridUnitSize;
        var marginBottomInGu = elemBottomMargin / gridUnitSize;

        // Fix images using setting their height to a direct multiple of 1rem
        if (element instanceof HTMLImageElement) {
            if (elemHeightInGu % gridUnitSize !== 0) {
                element.style.height = (Math.floor(elemHeightInGu) * GRID_REMS) + 'rem';
            }
        }
        // Fix other elements by adjusting their margin
        else {
            // Height difference to nearest grid unit.
            var heightDecimalPartInGu = elemHeightInGu % 1;
            // Compensated margin.
            var newMarginInGu = heightDecimalPartInGu > 0.5 ?
                1 - heightDecimalPartInGu + marginBottomInGu :
                marginBottomInGu - heightDecimalPartInGu;
            element.style.marginBottom = (newMarginInGu * GRID_REMS) + 'rem';
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
    var toggle = element.getElementsByClassName('js-portfolio-strip__expand-toggle')[0];

    toggle.addEventListener('click', function () {
        element.classList.remove('portfolio-strip--collapsed');
        toggle.setAttribute('aria-expanded', 'true');
    });
}

/**
 * Shrink site navigation when user scrolls 100px down
 * and takes it backs when user returns to top
 * @param {HTMLElement} element
 */
function shirkSidenavOnScroll(element) {
    function getBodyScrollTop() {
        let el = document.scrollingElement || document.documentElement;
        return el.scrollTop;
    }

    var onScroll = function () {
        var scrolled = Math.max(window.pageYOffset, getBodyScrollTop());

        scrolled > 100 ?
            element.classList.add('sitenav--shrinked') :
            element.classList.remove('sitenav--shrinked');
    };

    var enableAnimations = function () {
        element.classList.add('sitenav--animated');
    }

    var raf = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;
    var lastScrollTop = getBodyScrollTop();

    if (raf) {
        // make sure to run it first time too
        onScroll();
        loop();
        setTimeout(enableAnimations);
    }

    function loop() {
        var scrollTop = getBodyScrollTop();

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
    var headlines = rootElem.querySelectorAll('h1,h2,h3,h4,h5,h6');

    forEachNode(headlines, function (index, headline) {
        var anchorUrl = window.location.pathname + '#' + headline.getAttribute('id');
        var anchor = document.createElement('a');
        anchor.setAttribute('title', 'Link to this heading');
        anchor.setAttribute('aria-hidden', 'true');
        anchor.setAttribute('href', anchorUrl);
        anchor.classList.add('headline-link');
        var anchorIcon = document.createElement('i');
        anchorIcon.classList.add('icon--link');
        anchor.appendChild(anchorIcon);
        headline.appendChild(anchor);
    });
}

window.toggleGrid = function toggleGrid(valueToSet) {
    const gridElem = document.getElementsByClassName('js-baseline-grid')[0];

    if (typeof valueToSet === 'undefined') {
        gridElem.classList.toggle('baseline-grid--visible');
    } else {
        valueToSet ?
            gridElem.classList.add('baseline-grid--visible') :
            gridElem.classList.remove('baseline-grid--visible');
    }
}


var handlers = [
    {query: '.js-ie-warn', handler: showIEWarning},
    {query: '.js-sitenav', handler: siteMenu},
    {query: '.js-sitenav', handler: shirkSidenavOnScroll},
    {query: '.js-site-reload-button', handler: siteReload},
    {query: '.js-fix-baseline, .typeset h1, .typeset h2, .typeset h3, .typeset h4, .article-typeset h1, .article-typset h2, .article-typset h3, .article-typeset h4', handler: fixBaseline},
    {query: '.js-portfolio-strip', handler: expandPortfolio},
    {query: '.js-auto-add-headline-anchors', handler: autoAddHeadlineAnchors},
];

handlers.forEach(function (handler) {
    forEachNode(document.querySelectorAll(handler.query), function (index, rootElem) {
        handler.handler(rootElem);
    })
});

if (window.location.href.indexOf('?showgrid') !== -1) {
    toggleGrid(true);
}

