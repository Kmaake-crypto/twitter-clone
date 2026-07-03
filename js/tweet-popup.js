// FEATURE 3: TWEET POPUP
// BUILT WITH CURSOR'S ASSISTANCE

class TweetPopup {
    constructor() {
        this.createPopup();
        this.setupListeners();
    }

    createPopup() {
        if (document.getElementById('tweetPopup')) return;

        const popupHTML = `
            <div id="tweetPopup" style="
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 1000;
                display: none;
                justify-content: center;
                align-items: center;
                animation: fadeIn 0.3s ease;
            ">
                <div style="
                    background: var(--white);
                    border-radius: 16px;
                    width: 600px;
                    max-width: 90%;
                    max-height: 90vh;
                    padding: 20px;
                    animation: scaleUp 0.3s ease;
                ">
                    <!-- Header -->
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 16px;
                    ">
                        <div style="
                            cursor: pointer;
                            font-size: 1.2rem;
                            padding: 8px;
                            border-radius: 50%;
                            transition: background 0.3s;
                        " id="closePopup">
                            <i class="fas fa-times"></i>
                        </div>
                        <span style="font-weight: 700; font-size: 1.1rem;">Tweet</span>
                        <button id="popupTweetBtn" style="
                            background: var(--primary);
                            color: white;
                            border: none;
                            padding: 8px 24px;
                            border-radius: 50px;
                            font-weight: 700;
                            cursor: pointer;
                            transition: all 0.3s;
                        ">Tweet</button>
                    </div>

                    <!-- Body -->
                    <div style="display: flex; gap: 12px;">
                        <img src="https://ui-avatars.com/api/?name=You&background=1DA1F2&color=fff&size=48" 
                             style="width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;">
                        <textarea id="popupTextarea" 
                                  placeholder="What's happening?" 
                                  style="
                                      flex: 1;
                                      border: none;
                                      resize: none;
                                      font-size: 1.1rem;
                                      padding: 4px 0;
                                      font-family: var(--font);
                                      background: transparent;
                                      color: var(--dark);
                                      min-height: 100px;
                                      line-height: 1.6;
                                  " 
                                  rows="4"></textarea>
                    </div>

                    <!-- Actions -->
                    <div style="
                        padding-left: 60px;
                        margin-top: 12px;
                        border-top: 1px solid var(--border);
                        padding-top: 12px;
                        display: flex;
                        gap: 16px;
                    ">
                        <div style="display: flex; gap: 16px; color: var(--primary); font-size: 1.2rem;">
                            <i class="fas fa-image" style="cursor: pointer;"></i>
                            <i class="fas fa-gif" style="cursor: pointer;"></i>
                            <i class="fas fa-poll" style="cursor: pointer;"></i>
                            <i class="fas fa-smile" style="cursor: pointer;"></i>
                        </div>
                        <div style="margin-left: auto;">
                            <span style="font-size: 0.85rem; color: var(--gray-light);" id="popupCharCount">280</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add to body
        const container = document.createElement('div');
        container.innerHTML = popupHTML;
        document.body.appendChild(container.firstElementChild);

        // Add styles for popup animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleUp {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            #tweetPopup .close-animation {
                animation: fadeOut 0.3s ease forwards;
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    setupListeners() {
        const popup = document.getElementById('tweetPopup');
        const closeBtn = document.getElementById('closePopup');
        const tweetBtn = document.getElementById('popupTweetBtn');
        const textarea = document.getElementById('popupTextarea');
        const charCount = document.getElementById('popupCharCount');

        // Open popup from sidebar tweet button
        const sidebarBtn = document.querySelector('.sidebar .tweet-btn');
        if (sidebarBtn) {
            sidebarBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openPopup();
            });
        }

        // Open popup from main tweet button
        const mainBtn = document.querySelector('.tweet-actions .tweet-btn');
        if (mainBtn) {
            mainBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openPopup();
            });
        }

        // Close popup
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closePopup();
            });
        }

        // Close on overlay click
        if (popup) {
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    this.closePopup();
                }
            });
        }

        // Post tweet from popup
        if (tweetBtn && textarea) {
            tweetBtn.addEventListener('click', () => {
                const text = textarea.value.trim();
                if (text) {
                    postTweet(text);
                    this.closePopup();
                    textarea.value = '';
                    if (charCount) charCount.textContent = '280';
                } else {
                    showNotification('✍️ Please write something!');
                }
            });

            // Enter to post (Shift+Enter for new line)
            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    tweetBtn.click();
                }
            });

            // Character counter
            textarea.addEventListener('input', function() {
                const remaining = 280 - this.value.length;
                if (charCount) {
                    charCount.textContent = remaining;
                    charCount.style.color = remaining < 20 ? '#FFAD1F' : 'var(--gray-light)';
                    if (remaining < 0) {
                        charCount.style.color = '#FF1A1A';
                    }
                }
            });
        }

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup && popup.style.display === 'flex') {
                this.closePopup();
            }
        });
    }

    openPopup() {
        const popup = document.getElementById('tweetPopup');
        const textarea = document.getElementById('popupTextarea');
        if (popup) {
            popup.style.display = 'flex';
            popup.classList.remove('close-animation');
            if (textarea) {
                setTimeout(() => textarea.focus(), 100);
            }
        }
    }

    closePopup() {
        const popup = document.getElementById('tweetPopup');
        if (popup) {
            popup.classList.add('close-animation');
            setTimeout(() => {
                popup.style.display = 'none';
                popup.classList.remove('close-animation');
            }, 300);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TweetPopup();
});