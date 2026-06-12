/* ============================================
   MUST Writers Guild — Events Module
   ============================================ */

const Events = {
    events: [],
    
    async init() {
        await this.loadEvents();
        this.render();
    },
    
    async loadEvents() {
        try {
            const response = await fetch('/data/events.json');
            this.events = await response.json();
            Storage.cacheContent('events', this.events);
        } catch (error) {
            console.error('Failed to load events:', error);
            this.events = Storage.getCachedContent('events') || [];
        }
    },
    
    getUpcoming() {
        const now = new Date();
        return this.events
            .filter(e => new Date(e.date) >= now)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    
    getPast() {
        const now = new Date();
        return this.events
            .filter(e => new Date(e.date) < now)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    
    generateICS(event) {
        // Helper function to format date for ICS (YYYYMMDDTHHMMSSZ format)
        const formatICSDate = (date) => {
            return date.toISOString()
                .replace(/[:-]/g, '')
                .replace('Z', '')
                .split('.')[0] + 'Z';
        };
        
        const startDate = new Date(event.date + 'T' + event.time);
        const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
        
        // Escape special characters in text fields
        const escapeICSText = (text) => {
            if (!text) return '';
            return text.replace(/[\\,;]/g, '\\$&').replace(/\n/g, '\\n');
        };
        
        return [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//MUST Writers Guild//EN',
            'CALSCALE:GREGORIAN',
            'BEGIN:VEVENT',
            `UID:${event.id}@mustwritersguild.mw`,
            `DTSTAMP:${formatICSDate(new Date())}`,
            `DTSTART:${formatICSDate(startDate)}`,
            `DTEND:${formatICSDate(endDate)}`,
            `SUMMARY:${escapeICSText(event.title)}`,
            `DESCRIPTION:${escapeICSText(event.description)}`,
            `LOCATION:${escapeICSText(event.venue)}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');
    },
    
    downloadICS(event) {
        const icsContent = this.generateICS(event);
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `must-writers-guild-${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    render() {
        // Rendering handled in page-specific script
    }
};