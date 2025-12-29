/**
 * GitHub Stats Service
 * Fetches repository statistics from GitHub API with caching and rate limiting
 */

class GitHubStatsService {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 3600000; // 1 hour in milliseconds
        this.rateLimitDelay = 1000; // 1 second between requests
        this.lastRequestTime = 0;
        this.sessionStorageKey = 'github_stats_cache';

        // Load cache from sessionStorage
        this.loadCacheFromStorage();
    }

    /**
     * Load cached data from sessionStorage
     */
    loadCacheFromStorage() {
        try {
            const stored = sessionStorage.getItem(this.sessionStorageKey);
            if (stored) {
                const data = JSON.parse(stored);
                // Convert plain object back to Map
                this.cache = new Map(Object.entries(data));
            }
        } catch (error) {
            console.warn('Failed to load GitHub stats cache from storage:', error);
        }
    }

    /**
     * Save cache to sessionStorage
     */
    saveCacheToStorage() {
        try {
            // Convert Map to plain object for JSON serialization
            const cacheObj = Object.fromEntries(this.cache);
            sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save GitHub stats cache to storage:', error);
        }
    }

    /**
     * Implement rate limiting
     */
    async waitForRateLimit() {
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;

        if (timeSinceLastRequest < this.rateLimitDelay) {
            const waitTime = this.rateLimitDelay - timeSinceLastRequest;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        this.lastRequestTime = Date.now();
    }

    /**
     * Fetch repository stats from GitHub API
     * @param {string} owner - Repository owner/organization
     * @param {string} repo - Repository name
     * @returns {Promise<Object>} Repository statistics
     */
    async fetchRepoStats(owner, repo) {
        if (!owner || !repo) {
            return this.getFallbackStats();
        }

        const cacheKey = `${owner}/${repo}`;

        // Check cache first
        const cached = this.getCachedStats(cacheKey);
        if (cached) {
            return cached;
        }

        // Rate limiting
        await this.waitForRateLimit();

        try {
            const response = await fetch(
                `https://api.github.com/repos/${owner}/${repo}`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            // Handle rate limiting
            if (response.status === 403) {
                console.warn(`GitHub API rate limit exceeded for ${cacheKey}`);
                return this.getFallbackStats();
            }

            // Handle not found
            if (response.status === 404) {
                console.warn(`Repository not found: ${cacheKey}`);
                return this.getFallbackStats();
            }

            if (!response.ok) {
                throw new Error(`GitHub API responded with status ${response.status}`);
            }

            const data = await response.json();

            const stats = {
                stars: data.stargazers_count || 0,
                forks: data.forks_count || 0,
                language: data.language || 'N/A',
                updated: data.updated_at,
                description: data.description || '',
                topics: data.topics || [],
                homepage: data.homepage || null,
                openIssues: data.open_issues_count || 0,
                watchers: data.watchers_count || 0,
                size: data.size || 0
            };

            // Cache the result
            this.cacheStats(cacheKey, stats);

            return stats;

        } catch (error) {
            console.error(`Error fetching GitHub stats for ${cacheKey}:`, error);
            return this.getFallbackStats();
        }
    }

    /**
     * Get cached stats if available and not expired
     * @param {string} cacheKey - Cache key for the repository
     * @returns {Object|null} Cached stats or null
     */
    getCachedStats(cacheKey) {
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            const now = Date.now();

            if (now - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            } else {
                // Remove expired cache entry
                this.cache.delete(cacheKey);
                this.saveCacheToStorage();
            }
        }

        return null;
    }

    /**
     * Cache repository stats
     * @param {string} cacheKey - Cache key for the repository
     * @param {Object} stats - Repository statistics
     */
    cacheStats(cacheKey, stats) {
        this.cache.set(cacheKey, {
            data: stats,
            timestamp: Date.now()
        });

        this.saveCacheToStorage();
    }

    /**
     * Get fallback stats when API fails or rate limited
     * @returns {Object} Fallback statistics object
     */
    getFallbackStats() {
        return {
            stars: null,
            forks: null,
            language: null,
            updated: null,
            description: null,
            topics: [],
            homepage: null,
            openIssues: null,
            watchers: null,
            size: null
        };
    }

    /**
     * Format last updated date
     * @param {string} dateString - ISO date string
     * @returns {string} Formatted date string
     */
    formatUpdatedDate(dateString) {
        if (!dateString) return 'Unknown';

        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 30) return `${diffDays} days ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    }

    /**
     * Format number with K/M suffix
     * @param {number} num - Number to format
     * @returns {string} Formatted number string
     */
    formatNumber(num) {
        if (num === null || num === undefined) return 'N/A';
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    }

    /**
     * Batch fetch stats for multiple repositories
     * @param {Array<{owner: string, repo: string}>} repos - Array of repository objects
     * @returns {Promise<Array<Object>>} Array of repository statistics
     */
    async fetchMultipleRepoStats(repos) {
        const promises = repos.map(({owner, repo}) =>
            this.fetchRepoStats(owner, repo)
        );

        return await Promise.all(promises);
    }

    /**
     * Clear all cached stats
     */
    clearCache() {
        this.cache.clear();
        try {
            sessionStorage.removeItem(this.sessionStorageKey);
        } catch (error) {
            console.warn('Failed to clear GitHub stats cache from storage:', error);
        }
    }

    /**
     * Get cache statistics
     * @returns {Object} Cache statistics
     */
    getCacheStats() {
        return {
            totalEntries: this.cache.size,
            entries: Array.from(this.cache.keys())
        };
    }
}

// Export for use in portfolio
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubStatsService;
}
