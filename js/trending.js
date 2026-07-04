// FEATURE 2: TRENDING HASHTAGS
// BUILT WITH CURSOR'S HELP

class TrendingManager {
    constructor() {
        this.topics = [
            { category: 'Sports', name: '#OrlandoPiratesVideo', tweets: '12.5K' },
            { category: 'Relenohile Mofokeng', name: '#ST union', tweets: '8.2K' },
            { category: 'Eurropean move secured', name: '#Relebohile Mofokeng #OrlandoPirates', tweets: '15.7K' },
            { category: 'South African Sensational', name: '#SouthAfricanMedia', tweets: '6.3K' },
            { category: 'Thank You Pirates Legend', name: '#Diski galore', tweets: '9.8K' }
        ];
        this.init();
    }

    init() {
        this.render();
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
                <div class="trend-name">${topic.name}</div>
                <div class="trend-tweets">${topic.tweets} tweets</div>
            `;
            item.addEventListener('click', () => this.searchTopic(topic.name));
            container.appendChild(item);
        });

        // Add refresh button
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'refresh-trends';
        refreshBtn.textContent = 'Refresh Trends';
        refreshBtn.addEventListener('click', () => this.refresh());
        container.appendChild(refreshBtn);
    }

    refresh() {
        const newTopics = [
            { category: 'Trending', name: '#OrlandoPirates', tweets: '45.2K' },
            { category: 'Sports', name: '#RelebohileMofokeng', tweets: '28.9K' },
            { category: 'Entertainment', name: '#JoziCreators', tweets: '18.3K' },
            { category: 'St Union', name: '#BELGIUM', tweets: '9.7K' },
            { category: 'World Cup', name: '#Mbokazi', tweets: '22.1K' }
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