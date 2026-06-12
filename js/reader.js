/* ============================================
   MUST Writers Guild — Reader Module
   ============================================ */

const Reader = {
    content: null,
    type: null,
    id: null,
    
    init(type, id) {
        this.type = type;
        this.id = id;
        this.loadContent();
    },
    
    async loadContent() {
        try {
            const response = await fetch(`data/${this.type}s.json`);
            const items = await response.json();
            this.content = items.find(item => item.id === this.id);
            
            if (this.content) {
                this.render();
                this.restorePosition();
            }
        } catch (error) {
            console.error('Failed to load content:', error);
        }
    },
    
    render() {
        // Rendering handled in page-specific script
    },
    
    savePosition() {
        const scrollPos = window.scrollY;
        Storage.saveReadingPosition(this.id, this.type, scrollPos);
    },
    
    restorePosition() {
        const saved = Storage.getReadingPosition(this.id, this.type);
        if (saved && saved.position > 0) {
            window.scrollTo(0, saved.position);
        }
    },
    
    toggleBookmark() {
        const isBookmarked = Storage.isBookmarked(this.id, this.type);
        
        if (isBookmarked) {
            Storage.removeBookmark(this.id, this.type);
        } else {
            Storage.addBookmark({
                id: this.id,
                type: this.type,
                title: this.content.title,
                author: this.type === 'story' ? this.content.author : this.content.poet,
                date: new Date().toISOString()
            });
        }
        
        return !isBookmarked;
    }
};