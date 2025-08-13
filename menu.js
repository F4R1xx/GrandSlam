// menu.js
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

/**
 * Creates the HTML structure for the sidebar menu.
 * @param {string} activePage - The ID of the currently active page (e.g., 'home', 'tabela').
 * @param {boolean} isAdmin - Whether the current user is an admin.
 * @returns {string} The HTML string for the menu.
 */
const createMenuHTML = (activePage, isAdmin) => {
    const menuItems = [
        { id: 'perfil', href: 'perfil.html', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', text: 'Perfil' },
        { id: 'home', href: 'home.html', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', text: 'Início' },
        { id: 'tabela', href: 'tabela.html', icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', text: 'Tabela' },
        { id: 'meusjogos', href: 'meusjogos.html', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Meus Jogos' },
        { id: 'jogos', href: 'jogos.html', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', text: 'Todos os Jogos' },
        { id: 'desempenho', href: 'desempenho.html', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', text: 'Meu Desempenho' }
    ];

    const adminItem = {
        id: 'adm', href: 'adm.html', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z', text: 'Administrador'
    };

    const linksHTML = menuItems.map(item => `
        <a href="${item.href}" class="menu-link ${item.id === activePage ? 'active' : ''}">
            <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="${item.icon}" />
            </svg>
            <span>${item.text}</span>
        </a>
    `).join('');

    const adminLinkHTML = isAdmin ? `
        <div class="menu-separator">
            <a href="${adminItem.href}" class="menu-link ${adminItem.id === activePage ? 'active' : ''}">
                 <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="${adminItem.icon}" />
                </svg>
                <span>${adminItem.text}</span>
            </a>
        </div>
    ` : '';

    return `
        <aside id="sidebar">
            <div class="sidebar-inner">
                <div class="sidebar-header">
                    <svg class="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="48" fill="currentColor"/><path d="M11.5 76C23.5 56.5 47 48.5 50 48.5C53 48.5 76.5 56.5 88.5 76" stroke="white" stroke-opacity="0.6" stroke-width="5" stroke-linecap="round"/><path d="M11.5 24C23.5 43.5 47 51.5 50 51.5C53 51.5 76.5 43.5 88.5 24" stroke="white" stroke-opacity="0.6" stroke-width="5" stroke-linecap="round"/></svg>
                    <h1 class="logo-text">Grand Slam</h1>
                </div>
                <nav class="sidebar-nav sidebar-scroll">
                    ${linksHTML}
                    ${adminLinkHTML}
                </nav>
                <div class="sidebar-footer">
                    <button id="logout-button" class="logout-button">
                        <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span>Sair</span>
                    </button>
                </div>
            </div>
        </aside>
        <div id="sidebar-overlay"></div>
    `;
};

/**
 * Attaches all necessary event listeners for the menu to function.
 */
function attachMenuEventListeners() {
    // Logout functionality
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth).catch(error => console.error("Logout failed:", error));
        });
    }

    // Mobile sidebar toggle functionality
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const hamburgerButton = document.getElementById('hamburger-button'); // Assumes this ID exists in the main HTML

    if (sidebar && sidebarOverlay && hamburgerButton) {
        const toggleSidebar = () => {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('open');
        };

        hamburgerButton.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }
}


/**
 * Main function to be exported. It checks user auth, renders the menu,
 * and attaches event listeners.
 * @param {string} containerId - The ID of the element where the menu will be injected.
 * @param {string} activePage - The ID of the currently active page.
 */
export function loadMenu(containerId, activePage) {
    onAuthStateChanged(auth, (user) => {
        // The individual pages handle the redirect if the user is not logged in.
        if (!user) return;

        const isAdmin = user.email === 'grandslam@gmail.com';
        const menuContainer = document.getElementById(containerId);
        
        if (menuContainer) {
            menuContainer.innerHTML = createMenuHTML(activePage, isAdmin);
            attachMenuEventListeners();
        }
    });
}
