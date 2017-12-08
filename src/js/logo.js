
const logo = document.getElementById('tdclogo');
const name = document.getElementById('name');

function toggleLogoInMenu() {
    const nameVisible = isElementInViewport(name);

    if(nameVisible) {
        logo.classList.remove('c-header__logo--in-menu');
    } else {
        logo.classList.add('c-header__logo--in-menu');
    }
}

function isElementInViewport (el) {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export default function registerLogoScrollListener() {
    let ticking = false;
    window.addEventListener('scroll', e => {
        if (!ticking) {

            window.requestAnimationFrame(() => {
                toggleLogoInMenu();
                ticking = false;
            });

            ticking = true;

        }

    });
}