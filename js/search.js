/* ============================================
   MUST Writers Guild — Search Module
   ============================================ */

const Search = {
    debounceTimer: null,
    
    init(inputId, callback) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        input.addEventListener('input', (e) => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                callback(e.target.value);
            }, 300);
        });
    },
    
    filterItems(items, query, fields) {
        if (!query) return items;
        
        const lowerQuery = query.toLowerCase();
        return items.filter(item => 
            fields.some(field => {
                const value = item[field];
                if (Array.isArray(value)) {
                    return value.some(v => v.toLowerCase().includes(lowerQuery));
                }
                return value?.toLowerCase().includes(lowerQuery);
            })
        );
    },
    
    highlightText(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
};