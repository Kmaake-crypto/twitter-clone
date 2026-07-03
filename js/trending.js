// FEATURE 2: TRENDING HASHTAGS
// BUILT WITH CURSOR'S HELP

class TrendingManager {
    constructor() {
        this.topics = [
            { category: 'Technology', name: '#AI2026', tweets: '12.5K', emoji: '🤖' },
            { category: 'World News', name: '#ClimateAction', tweets: '8.2K', emoji: '🌍' },
            { category: 'Sports', name: '#ChampionsLeague', tweets: '15.7K', emoji: '⚽' },
            { category: 'Entertainment', name: '#NewMovies', tweets: '6.3K', emoji: '🎬' },
            { category: 'Coding', name: '#WebDev', tweets: '9.8K', emoji: '💻' }
        ];
        this.init();
    }

    init() {
        this.render();
        this.setupRefresh();
    }

    render() {
        const container = document.getElementById('trendingContainer');
        if (!container) return;

        // Keep header
        const header = container.querySelector('h3');
        container.innerHTML = '';
        if (header) container.appendChild(header);

        // Render topics
        this.topics.forEach(topic => {
            const item = document.createElement('div');
            item.className = 'trend-item';
            item.innerHTML = `
                <div class="trend-category">${topic.category}</div>
                <div class="trend-name">${topic.emoji} ${topic.name}</div>
                <div class="trend-tweets">${topic.tweets} tweets</div>
            `;
            item.addEventListener('click', () => this.searchTopic(topic.name));
            container.appendChild(item);
        });

        // Add refresh button
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'refresh-trends';
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Trends';
        refreshBtn.addEventListener('click', () => this.refresh());
        container.appendChild(refreshBtn);
    }

    refresh() {
        const newTopics = [
            { category: 'Breaking', name: '#WorldCup2026', tweets: '45.2K', emoji: '🏆' },
            { category: 'Tech', name: '#ElonMusk', tweets: '28.9K', emoji: '🚀' },
            { category: 'Movies', name: '#NewRelease', tweets: '18.3K', emoji: '🎥' },
            { category: 'Science', name: '#SpaceExploration', tweets: '9.7K', emoji: '🪐' },
            { category: 'Gaming', name: '#GameOn', tweets: '22.1K', emoji: '🎮' }
        ];
        this.topics = newTopics;
        this.render();
        showNotification('Trends updated! ');
    }

    searchTopic(hashtag) {
        const textarea = document.getElementById('tweetTextarea');
        if (textarea) {
            textarea.value = `${hashtag} is trending! What do you think?`;
            textarea.focus();
        }
        showNotification(` Searching ${hashtag}`);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TrendingManager();
});