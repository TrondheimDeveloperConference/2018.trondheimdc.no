
export default function registerMenuToggler() {
    const menuToggler = document.getElementById('menuToggler');
    const nav = document.getElementsByClassName('c-navigation')[0];
    let toggle = e => {
        menuToggler.classList.toggle('show--menu');
        nav.classList.toggle('show--menu');
    };
    menuToggler.onclick = toggle;
    const anchors = nav.getElementsByTagName('a');
    for(let a of anchors) {
        a.onclick = toggle;
    }
}