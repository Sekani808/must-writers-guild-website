/* ============================================
   MUST Writers Guild — Library Module
   ============================================ */

const Library = {
    stories: [],
    poems: [],
    activeTab: 'stories',
    currentFilter: 'all',
    
    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.render();
    },
    
    async loadData() {
        try {
            // Use Promise.allSettled to handle individual fetch failures
            const [storiesResult, poemsResult] = await Promise.allSettled([
                fetch('/data/stories.json').then(r => r.json()),
                fetch('/data/poems.json').then(r => r.json())
            ]);
            
            // Handle stories result
            if (storiesResult.status === 'fulfilled') {
                this.stories = storiesResult.value;
                Storage.cacheContent('stories', this.stories);
            } else {
                console.error('Failed to load stories:', storiesResult.reason);
                this.stories = Storage.getCachedContent('stories') || [];
            }
            
            // Handle poems result
            if (poemsResult.status === 'fulfilled') {
                this.poems = poemsResult.value;
                Storage.cacheContent('poems', this.poems);
            } else {
                console.error('Failed to load poems:', poemsResult.reason);
                this.poems = Storage.getCachedContent('poems') || [];
            }
        } catch (error) {
            console.error('Failed to load library:', error);
            // Try to load from cache
            this.stories = Storage.getCachedContent('stories') || [];
            this.poems = Storage.getCachedContent('poems') || [];
        }
    },
    
    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.activeTab = btn.dataset.tab;
                this.render();
            });
        });
    },
    
    getFilteredContent() {
        const items = this.activeTab === 'stories' ? this.stories : this.poems;
        
        if (this.currentFilter === 'all') return items;
        
        const key = this.activeTab === 'stories' ? 'genre' : 'theme';
        return items.filter(item => item[key] === this.currentFilter);
    },
    
    render() {
        const container = document.getElementById('contentGrid');
        const items = this.getFilteredContent();
        
        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-inbox"></i>
                    <h3>No ${this.activeTab} found</h3>
                </div>
            `;
            return;
        }
        
        // Rendering handled in page-specific scripts
    },
    
    search(query) {
        const items = this.activeTab === 'stories' ? this.stories : this.poems;
        const searchFields = this.activeTab === 'stories' 
            ? ['title', 'author', 'genre']
            : ['title', 'poet', 'theme'];
        
        return items.filter(item => 
            searchFields.some(field => 
                item[field]?.toLowerCase().includes(query.toLowerCase())
            )
        );
    }
};