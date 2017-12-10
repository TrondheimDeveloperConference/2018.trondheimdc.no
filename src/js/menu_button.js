
export default function registerMenuToggler() {
    const menuToggler = document.getElementById('menuToggler');
    const nav = document.getElementsByTagName('nav')[0];
    menuToggler.onclick = e => {
        menuToggler.classList.toggle('show--menu');
        nav.classList.toggle('show--menu');
    };
}