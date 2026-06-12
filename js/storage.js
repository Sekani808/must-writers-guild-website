/* ============================================
   MUST Writers Guild — Storage Management
   ============================================ */

const Storage = {
    // Theme
    getTheme() {
        return localStorage.getItem('theme') || 'light';
    },
    
    setTheme(theme) {
        localStorage.setItem('theme', theme);
    },
    
    // Bookmarks
    getBookmarks() {
        return JSON.parse(localStorage.getItem('bookmarks') || '[]');
    },
    
    addBookmark(bookmark) {
        const bookmarks = this.getBookmarks();
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    },
    
    removeBookmark(id, type) {
        let bookmarks = this.getBookmarks();
        bookmarks = bookmarks.filter(b => !(b.id === id && b.type === type));
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    },
    
    isBookmarked(id, type) {
        return this.getBookmarks().some(b => b.id === id && b.type === type);
    },
    
    // Reading Positions
    getReadingPosition(contentId, contentType) {
        const positions = JSON.parse(localStorage.getItem('readingPositions') || '{}');
        return positions[`${contentType}-${contentId}`];
    },
    
    saveReadingPosition(contentId, contentType, position) {
        const positions = JSON.parse(localStorage.getItem('readingPositions') || '{}');
        positions[`${contentType}-${contentId}`] = {
            position,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('readingPositions', JSON.stringify(positions));
    },
    
    // Reader Preferences
    getFontSize() {
        return parseInt(localStorage.getItem('readerFontSize')) || 1;
    },
    
    setFontSize(size) {
        localStorage.setItem('readerFontSize', size);
    },
    
    // Applications
    getApplications() {
        return JSON.parse(localStorage.getItem('applications') || '[]');
    },
    
    saveApplication(application) {
        const applications = this.getApplications();
        applications.push(application);
        localStorage.setItem('applications', JSON.stringify(applications));
    },
    
    // Cache for offline
    async cacheContent(key, data) {
        const cache = JSON.parse(localStorage.getItem('contentCache') || '{}');
        cache[key] = {
            data,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('contentCache', JSON.stringify(cache));
    },
    
    getCachedContent(key) {
        const cache = JSON.parse(localStorage.getItem('contentCache') || '{}');
        return cache[key]?.data || null;
    },
    
    // Clear all data
    clearAll() {
        const theme = this.getTheme();
        localStorage.clear();
        this.setTheme(theme);
    }
};