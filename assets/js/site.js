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
 * Simple carousel implementation.
 * @param {HTMLElement} rootElem
 */
function portfolioStrip(rootElem) {
    const items = Array.from(rootElem.getElementsByClassName('js-portfolio-strip-item'));
    const detailContainer = rootElem.getElementsByClassName('js-portfolio-detail-container')[0];
    const detailContainerBody = detailContainer.getElementsByClassName('js-portfolio-detail-container__body')[0];
    const viewport = detailContainer.getElementsByClassName('js-portfolio-detail-container__viewport')[0];
    const triangleElem = detailContainer.getElementsByClassName('js-portfolio-detail-container__triangle')[0];
    let reinit = true;

    viewport.style.overflow = 'hidden';
    detailContainerBody.style.postion = 'absolute';
    detailContainerBody.style.width = '9999px';
    detailContainerBody.style.transform = 'translateX(0px)';

    // enable triangle and strip row transitions
    const enableTranstions = () => {
        triangleElem.style.transition = 'transform .3s ease-in-out';
        detailContainerBody.style.transition = 'transform .3s ease-in-out';
    }

    const disableTransitions = () => {
        triangleElem.style.transition = 'none';
        detailContainerBody.style.transition = 'none';
    }

    // iterate over all carousel items
    const forEachItem = handler => {
        for (let item of items) {
            handler(item);
        }
    }

    // return width of viewport
    const getViewportWidth = () => {
        return viewport.getBoundingClientRect().width;
    }

    // position triangle to mark `item`
    const positionTriangle = (item) => {
        const triangleWidth = triangleElem.getBoundingClientRect().width;
        const itemWidth = item.getBoundingClientRect().width;
        const itemLeftOffset = item.offsetLeft;

        const offset = (itemLeftOffset) + (itemWidth / 2) - (triangleWidth / 2);
        triangleElem.style.transform = 'translateX(' + offset + 'px)';
    };

    // activate detail of the `item`
    const activateDetail = (item) => {
        positionTriangle(item);
        const idx = items.indexOf(item);
        detailContainerBody.style.transform = 'translateX(-' + getViewportWidth() * idx + 'px)';
    }

    /**
     * Since dimensions can only be calculated when element is displayed,
     * we can only do it when some detail is first requested.
     *
     * Once dimensions are set, we position to the first item.
     */
    const updateDimensions = (activateCallback) => {
        disableTransitions();

        const viewportWidth = getViewportWidth();
        let minHeight = 0;

        for (let item of detailContainerBody.getElementsByClassName('js-portfolio-detail-container__item')) {
            item.style.width = viewportWidth + 'px';
            minHeight = Math.max(item.getBoundingClientRect().height, minHeight);
        }
        viewport.style['min-height'] = minHeight + 'px';

        activateCallback();
        setTimeout(enableTranstions, 0);
    }

    // Attaches event handler that listens to click events on projects.
    const attachItemHandler = item => {
        const itemDetailHTML = item.getElementsByClassName('js-portfolio-strip-item-template')[0].innerHTML;

        const detailWrapElement = document.createElement('div');
        detailWrapElement.style.display = 'inline-block';
        detailWrapElement.style.width = getViewportWidth() + 'px';
        detailWrapElement.className = 'js-portfolio-detail-container__item';
        const detailElement = document.createElement('div');
        detailElement.className = 'portfolio-project-detail';
        detailElement.innerHTML = itemDetailHTML;
        detailWrapElement.appendChild(detailElement);
        detailContainerBody.appendChild(detailWrapElement);

        item.addEventListener('click', function () {
            // do not bother on mobiles
            if (window.innerWidth < 1200) {
                return;
            }

            const itemOnClass = 'js-portfolio-strip-item--on';
            const containerOnClass = 'portfolio-strip__detail-container--on';

            forEachItem(i => {
                if (i !== item) {
                    i.classList.remove(itemOnClass)
                }
            });

            // item already active -> deactivate
            if (item.classList.contains(itemOnClass)) {
                item.classList.remove(itemOnClass);
                detailContainer.classList.remove(containerOnClass);
                reinit = true;
            } else {
                item.classList.add(itemOnClass);
                detailContainer.classList.add(containerOnClass);
                if (reinit) {
                    reinit = false;
                    updateDimensions(() => activateDetail(item));
                } else {
                    activateDetail(item);
                }
            }

        });
    };

    // push in reverse to assemble the strip adequately
    items.reverse().forEach(attachItemHandler);
}

const handlers = [
    {className: 'js-sitenav', handler: siteMenu},
    {className: 'js-portfolio-strip', handler: portfolioStrip},
];

handlers.forEach(({className, handler}) => {
    for (let rootElem of document.getElementsByClassName(className)) {
        handler(rootElem);
    }
});

if (window.location.href.indexOf('?showgrid') !== -1) {
    document.getElementsByClassName('js-baseline-grid')[0].classList.add('baseline-grid--visible');
}
