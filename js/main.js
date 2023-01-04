const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

const root = document.documentElement;

// Theme
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn); // will take everything within the document with that label and create a node array list 
const currentTheme = localStorage.getItem(theme);

//Portfolio
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector('#search');

// Modal
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
    if (document.querySelector(`${selector}.${active}`) !== null) {
        document.querySelector(`${selector}.${active}`).classList.remove(active);
    } elm.classList.add(active);
};

const setTheme = (val) => {
    if (val === dark) {
        root.setAttribute(dataTheme, dark);
        localStorage.setItem(theme, dark);
    } else {
        root.setAttribute(dataTheme, light);
        localStorage.setItem(theme, light);
    }
};

if (currentTheme) {
    root.setAttribute(dataTheme, currentTheme);
    switcher.forEach((btn) => {
        btn.classList.remove(active);
    });
    if (currentTheme === dark) {
        switcher[1].classList.add(active);
    } else {
        switcher[0].classList.add(active);
    }
}

toggleTheme.addEventListener('click', function() {
    const tab = this.parentElement.parentElement;
    if (!tab.className.includes(open)) {
        tab.classList.add(open);
    } else {
        tab.classList.remove(open);
    }
});

for (const elm of switcher) {
    elm.addEventListener('click', function() {
        const toggle = this.dataset.toggle;
        setActive(elm, switcherBtn);
        setTheme(toggle);
    })
};

searchBox.addEventListener('keyup', (e) => {
    const searchInput = e.target.value.toLowerCase().trim();
    portfolioItems.forEach((card) => {
        if (card.dataset.item.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    })
})

for(const link of filterLink) {
    link.addEventListener('click', function() {
        setActive(link, '.filter-link');
        const filter = link.dataset.filter;
        portfolioItems.forEach((card) => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else if (card.dataset.item === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        })
    })
};

// Create a piece of code that builds HTML with data


// Modal/Full Site Modal "Open Buttons"
for(const elm of openModal) {
    elm.addEventListener('click', function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    })
};
// Full site modal "Close Buttons"
for (const elm of closeModal) {
    elm.addEventListener('click', function() {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    } )
};

// Modal
document.addEventListener('click', (e) => {
    if (e.target === document.querySelector('.modal.is-visible')) {
        document.querySelector('.modal.is-visible').classList.remove(isVisible);
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        document.querySelector('.modal.is-visible').classList.remove(isVisible);
    }
})

const elmsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elms-displayed');
const marqueeContent = document.querySelector('ul.marquee-content');

root.style.setProperty('--marquee-elms', marqueeContent.children.length);

for (let i = 0; i < elmsDisplayed; i += 1) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}