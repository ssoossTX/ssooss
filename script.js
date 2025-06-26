let count = 0;
const counter = document.getElementById('counter');
const clickerBtn = document.getElementById('clickerBtn');
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const tabButtons = sideMenu.querySelectorAll('nav ul li');
const tabContents = sideMenu.querySelectorAll('.tab-content');
const menuOverlay = document.getElementById('menuOverlay');

clickerBtn.addEventListener('click', () => {
    count++;
    counter.textContent = count;
});

menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    menuOverlay.classList.toggle('active');
});

menuOverlay.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
});

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(tc => tc.classList.remove('active'));
        const tabId = btn.getAttribute('data-tab');
        document.getElementById('tab' + tabId.charAt(0).toUpperCase() + tabId.slice(1)).classList.add('active');
        // При переключении вкладки закрывать меню на мобильных
        sideMenu.classList.remove('open');
        menuOverlay.classList.remove('active');
    });
});

// Открывать первую вкладку по умолчанию
if (tabContents.length) tabContents[0].classList.add('active');
