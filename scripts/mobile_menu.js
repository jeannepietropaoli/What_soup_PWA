const openMobileMenuBtn = document.getElementById('open-mobile-menu-btn');
const closeMobileMenuBtn = document.getElementById('close-mobile-menu-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    ['hidden', 'block'].forEach(className => {
        openMobileMenuBtn.classList.toggle(className);
        closeMobileMenuBtn.classList.toggle(className);
        mobileMenu.classList.toggle(className);
    })
})