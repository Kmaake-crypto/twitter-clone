//FAKETWITTER - CORE APPLICATION

//SAMPLE TWEETS DATA
const sampleTweets = [
    {
        id: 1,
        username: "John Doe",
        handle: "@johndoe",
        avatar: "https://ui-avatars.com/api/?name=John+Doe&background=1DA1F2&color=fff&size=48",
        text: "Just launched my new project!  Excited to share more soon! #webdev #launch",
        likes: 42,
        retweets: 12,
        replies: 8,
        time: "2h"
    },
    {
        id: 2,
        username: "Jane Smith",
        handle: "@janesmith",
        avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=1DA1F2&color=fff&size=48",
        text: "Working on the Twitter clone project is so much fun! #coding #webdev ",
        likes: 28,
        retweets: 7,
        replies: 5,
        time: "4h"
    },
    {
        id: 3,
        username: "Tech News Daily",
        handle: "@technews",
        avatar: "https://ui-avatars.com/api/?name=Tech+News&background=1DA1F2&color=fff&size=48",
        text: "AI and Web Development are transforming how we build applications. What's your favorite tech stack? ",
        likes: 156,
        retweets: 45,
        replies: 23,
        time: "6h"
    },
    {
        id: 4,
        username: "Sarah Johnson",
        handle: "@sarahj",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=1DA1F2&color=fff&size=48",
        text: "Just finished reading 'Atomic Habits'. Highly recommend it!  #books",
        likes: 89,
        retweets: 23,
        replies: 12,
        time: "8h"
    },
    {
        id: 5,
        username: "Web Dev Tips",
        handle: "@webdevtips",
        avatar: "https://ui-avatars.com/api/?name=Web+Dev&background=1DA1F2&color=fff&size=48",
        text: "CSS Grid vs Flexbox - when to use each? Here's a quick guide \n\nGrid: 2D layouts (rows & columns)\nFlexbox: 1D layouts (row or column)",
        likes: 234,
        retweets: 89,
        replies: 34,
        time: "12h"
    },
    {
        id: 6,
        username: "Design Guru",
        handle: "@designguru",
        avatar: "https://ui-avatars.com/api/?name=Design+Guru&background=1DA1F2&color=fff&size=48",
        text: "Good design is making something intelligible and memorable. Great design is making something memorable and meaningful. ",
        likes: 312,
        retweets: 156,
        replies: 45,
        time: "14h"
    }
];

//APPLICATION STATE
let tweets = [...sampleTweets];
let currentUser = {
    name: "You",
    handle: "@you",
    avatar: "https://ui-avatars.com/api/?name=You&background=1DA1F2&color=fff&size=48"
};

//RENDER FUNCTIONS

function renderTweets(tweetArray) {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    if (!tweetArray || tweetArray.length === 0) {
        timeline.innerHTML = `
            <div style="padding: 60px 20px; text-align: center; color: var(--gray-dark);">
                <i class="fas fa-twitter" style="font-size: 4rem; color: var(--primary); opacity: 0.3;"></i>
                <h4 style="margin-top: 16px; font-weight: 600;">No tweets yet</h4>
                <p style="margin-top: 8px; color: var(--gray-light);">Be the first to tweet! </p>
            </div>
        `;
        return;
    }
    
    tweetArray.forEach(tweet => {
        const tweetElement = createTweetElement(tweet);
        timeline.appendChild(tweetElement);
    });
}

function createTweetElement(tweet) {
    const div = document.createElement('div');
    div.className = 'tweet';
    div.dataset.tweetId = tweet.id;
    
    const formattedText = formatTweetText(tweet.text);
    
    div.innerHTML = `
        <img src="${tweet.avatar}" alt="${tweet.username}" class="avatar">
        <div class="tweet-content">
            <div class="tweet-user">
                <span class="tweet-username">${tweet.username}</span>
                <span class="tweet-handle">${tweet.handle}</span>
                <span class="tweet-time">· ${tweet.time}</span>
            </div>
            <div class="tweet-text">${formattedText}</div>
            <div class="tweet-stats">
                <span class="reply-btn" data-tweet-id="${tweet.id}">
                    <i class="far fa-comment"></i> ${tweet.replies}
                </span>
                <span class="retweet-btn" data-tweet-id="${tweet.id}">
                    <i class="fas fa-retweet"></i> ${tweet.retweets}
                </span>
                <span class="like-btn" data-tweet-id="${tweet.id}">
                    <i class="far fa-heart"></i> ${tweet.likes}
                </span>
            </div>
        </div>
    `;
    
    // Event listeners
    const likeBtn = div.querySelector('.like-btn');
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleLike(tweet.id);
    });
    
    const retweetBtn = div.querySelector('.retweet-btn');
    retweetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleRetweet(tweet.id);
    });
    
    const replyBtn = div.querySelector('.reply-btn');
    replyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleReply(tweet.id);
    });
    
    return div;
}

function formatTweetText(text) {
    let formatted = text;
    formatted = formatted.replace(/#(\w+)/g, (match, hashtag) => {
        return `<span style="color: var(--primary); cursor: pointer;" onclick="searchHashtag('${hashtag}')">#${hashtag}</span>`;
    });
    formatted = formatted.replace(/@(\w+)/g, (match, mention) => {
        return `<span style="color: var(--primary); cursor: pointer;">@${mention}</span>`;
    });
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
}

//INTERACTIONS
function handleLike(tweetId) {
    const tweet = tweets.find(t => t.id === tweetId);
    if (tweet) {
        tweet.likes += 1;
        renderTweets(tweets);
        showNotification(' Liked!');
    }
}

function handleRetweet(tweetId) {
    const tweet = tweets.find(t => t.id === tweetId);
    if (tweet) {
        tweet.retweets += 1;
        renderTweets(tweets);
        showNotification(' Retweeted!');
    }
}

function handleReply(tweetId) {
    const tweet = tweets.find(t => t.id === tweetId);
    if (tweet) {
        tweet.replies += 1;
        renderTweets(tweets);
        const textarea = document.getElementById('tweetTextarea');
        if (textarea) {
            textarea.value = `Replying to ${tweet.handle}: `;
            textarea.focus();
        }
        showNotification(' Reply mode activated');
    }
}

window.searchHashtag = function(hashtag) {
    const textarea = document.getElementById('tweetTextarea');
    if (textarea) {
        textarea.value = `#${hashtag} is trending! What do you think?`;
        textarea.focus();
    }
    showNotification(` Searching #${hashtag}`);
};

// POST TWEET
function postTweet(text) {
    if (!text || text.trim() === '') {
        showNotification(' Please write something!');
        return false;
    }
    
    const newTweet = {
        id: Date.now(),
        username: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        text: text.trim(),
        likes: 0,
        retweets: 0,
        replies: 0,
        time: 'Just now'
    };
    
    tweets.unshift(newTweet);
    renderTweets(tweets);
    
    const textarea = document.getElementById('tweetTextarea');
    if (textarea) textarea.value = '';
    
    showNotification(' Tweet posted successfully!');
    return true;
}

//NOTIFICATION
function showNotification(message) {
    const existing = document.querySelectorAll('.notification');
    existing.forEach(el => el.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

//SEARCH
function searchTweets(query) {
    if (!query || query.trim() === '') {
        renderTweets(tweets);
        return;
    }
    
    const searchTerm = query.toLowerCase().trim();
    const filtered = tweets.filter(tweet => {
        return tweet.text.toLowerCase().includes(searchTerm) ||
               tweet.username.toLowerCase().includes(searchTerm) ||
               tweet.handle.toLowerCase().includes(searchTerm);
    });
    
    renderTweets(filtered);
}

//INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    renderTweets(tweets);
    
    const postBtn = document.getElementById('postTweetBtn');
    const textarea = document.getElementById('tweetTextarea');
    const charCount = document.getElementById('charCount');
    
    if (postBtn) {
        postBtn.addEventListener('click', () => {
            postTweet(textarea.value);
        });
    }
    
    if (textarea) {
        // Character counter
        textarea.addEventListener('input', function() {
            const remaining = 280 - this.value.length;
            if (charCount) {
                charCount.textContent = remaining;
                charCount.className = 'char-count';
                if (remaining < 20 && remaining >= 0) {
                    charCount.classList.add('warning');
                }
                if (remaining < 0) {
                    charCount.classList.add('danger');
                }
            }
        });
        
        // Enter to post (Shift+Enter for new line)
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                postTweet(textarea.value);
            }
        });
    }
    
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTweets(e.target.value);
        });
    }
    
    console.log(' FakeTwitter loaded!');
});