// FEATURE 1: DARK MODE TOGGLE
// BUILT WITHOUT CURSOR - PURE MANUAL CODE
// This demonstrates my raw JavaScript skills
// 

class DarkModeManager {
    constructor() {
        // Check localStorage for saved preference
        this.isDark = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        this.createToggleButton();
        if (this.isDark) {
            this.enableDarkMode();
        }
        this.setupEventListeners();
    }

    createToggleButton() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        // Create toggle container
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'dark-mode-toggle';
        toggleContainer.style.cssText = `
            padding: 16px;
            margin-top: 20px;
            border-top: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.3s ease;
        `;

        // Left section with icon and label
        const leftSection = document.createElement('div');
        leftSection.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        const icon = document.createElement('i');
        icon.className = `fas ${this.isDark ? 'fa-sun' : 'fa-moon'}`;
        icon.style.color = this.isDark ? '#FFD700' : '#657786';
        icon.style.transition = 'all 0.3s ease';
        icon.style.fontSize = '1.1rem';

        const label = document.createElement('span');
        label.textContent = this.isDark ? 'Light Mode' : 'Dark Mode';
        label.style.fontSize = '0.95rem';
        label.style.fontWeight = '500';
        label.style.transition = 'color 0.3s ease';

        leftSection.appendChild(icon);
        leftSection.appendChild(label);

        // Toggle switch
        const switchContainer = document.createElement('div');
        switchContainer.style.cssText = `
            width: 44px;
            height: 24px;
            background: ${this.isDark ? '#1DA1F2' : '#E1E8ED'};
            border-radius: 50px;
            position: relative;
            transition: background 0.3s ease;
            flex-shrink: 0;
        `;

        const knob = document.createElement('div');
        knob.style.cssText = `
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: ${this.isDark ? '22px' : '2px'};
            transition: left 0.3s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;

        switchContainer.appendChild(knob);
        toggleContainer.appendChild(leftSection);
        toggleContainer.appendChild(switchContainer);

        // Hover effect
        toggleContainer.addEventListener('mouseenter', () => {
            toggleContainer.style.background = 'rgba(29, 161, 242, 0.05)';
        });
        toggleContainer.addEventListener('mouseleave', () => {
            toggleContainer.style.background = 'transparent';
        });

        sidebar.appendChild(toggleContainer);

        // Store references
        this.toggleContainer = toggleContainer;
        this.switchContainer = switchContainer;
        this.knob = knob;
        this.icon = icon;
        this.label = label;
    }

    setupEventListeners() {
        if (this.toggleContainer) {
            this.toggleContainer.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }
    }

    toggleDarkMode() {
        this.isDark = !this.isDark;
        localStorage.setItem('darkMode', this.isDark);
        
        if (this.isDark) {
            this.enableDarkMode();
        } else {
            this.disableDarkMode();
        }

        this.updateToggleUI();
        showNotification(this.isDark ? 'Dark mode enabled ' : 'Light mode enabled ');
    }

    enableDarkMode() {
        const root = document.documentElement;
        root.style.setProperty('--bg', '#15202B');
        root.style.setProperty('--dark', '#FFFFFF');
        root.style.setProperty('--white', '#192734');
        root.style.setProperty('--border', '#38444D');
        root.style.setProperty('--gray-bg', '#253341');
        root.style.setProperty('--gray-dark', '#8899A6');
        root.style.setProperty('--gray-light', '#8899A6');
        
        document.body.style.background = '#15202B';
        document.body.style.color = '#FFFFFF';

        // Update feed header
        const feedHeader = document.querySelector('.feed-header');
        if (feedHeader) {
            feedHeader.style.background = 'rgba(21, 32, 43, 0.95)';
        }

        // Update trending
        const trending = document.querySelector('.trending');
        if (trending) {
            trending.style.background = '#192734';
        }

        // Update search box
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.style.background = '#253341';
        }

        // Update all text areas
        document.querySelectorAll('textarea, input').forEach(el => {
            el.style.color = '#FFFFFF';
        });
    }

    disableDarkMode() {
        const root = document.documentElement;
        root.style.setProperty('--bg', '#F5F8FA');
        root.style.setProperty('--dark', '#14171A');
        root.style.setProperty('--white', '#FFFFFF');
        root.style.setProperty('--border', '#E1E8ED');
        root.style.setProperty('--gray-bg', '#E1E8ED');
        root.style.setProperty('--gray-dark', '#657786');
        root.style.setProperty('--gray-light', '#AAB8C2');
        
        document.body.style.background = '#F5F8FA';
        document.body.style.color = '#14171A';

        const feedHeader = document.querySelector('.feed-header');
        if (feedHeader) {
            feedHeader.style.background = 'rgba(255, 255, 255, 0.95)';
        }

        const trending = document.querySelector('.trending');
        if (trending) {
            trending.style.background = '#F5F8FA';
        }

        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.style.background = '#E1E8ED';
        }

        document.querySelectorAll('textarea, input').forEach(el => {
            el.style.color = '#14171A';
        });
    }

    updateToggleUI() {
        if (!this.toggleContainer) return;
        
        if (this.icon) {
            this.icon.className = `fas ${this.isDark ? 'fa-sun' : 'fa-moon'}`;
            this.icon.style.color = this.isDark ? '#FFD700' : '#657786';
        }
        
        if (this.label) {
            this.label.textContent = this.isDark ? 'Light Mode' : 'Dark Mode';
        }
        
        if (this.switchContainer) {
            this.switchContainer.style.background = this.isDark ? '#1DA1F2' : '#E1E8ED';
        }
        
        if (this.knob) {
            this.knob.style.left = this.isDark ? '22px' : '2px';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeManager();
});