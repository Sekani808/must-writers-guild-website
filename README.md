# MUST Writers Guild

A progressive web application designed for the MUST Writers Guild at Malawi University of Science and Technology. The platform enables students to discover, share, and engage with creative writing content including stories, poems, and literary events.

## Mobile-First Design

This application is optimized for mobile devices with a minimum viewport width of 320px. The responsive design uses CSS Grid and Flexbox for fluid layouts that adapt seamlessly across all screen sizes. All interactive elements are sized for touch input (minimum 44x44px).

### Key Mobile Features
- Offline support via Service Worker
- Optimized performance for low-bandwidth environments
- Touch-friendly navigation with swipe gestures
- Bottom navigation bar for thumb-accessible controls
- Responsive typography that scales with viewport

## Desktop Scaling Strategy

The application can be scaled to desktop (1024px and above) using existing design patterns:

1. **Layout Expansion**: Convert single-column layouts to multi-column grids using media queries at breakpoints (768px tablet, 1024px desktop)
2. **Navigation**: Adapt bottom navigation to horizontal header navigation while maintaining the same link structure
3. **Card Systems**: Expand story/poem cards from full-width to 2-column (tablet) and 3-column (desktop) layouts
4. **Spacing**: Increase padding, margins, and gaps proportionally while maintaining visual hierarchy
5. **Typography**: Scale font sizes up without changing semantic hierarchy
6. **Content Density**: Increase information display per screen without overwhelming users

Desktop-specific additions (optional):
- Sidebar navigation panel
- Multi-panel reader with sidebar bookmarks
- Advanced filtering and search interfaces
- Admin dashboard for content management

All color schemes, typography system, and component styles are device-agnostic and scale proportionally.

## Features

- **Library**: Browse stories and poems with filtering by genre/theme
- **Reader**: Dedicated reading interface with font size controls, dark mode, and bookmarks
- **Events**: Calendar of guild activities with export functionality
- **Guild Information**: Leadership, members, constitution, and organizational values
- **PWA Capabilities**: Installable on home screen, works offline, background sync support

## Technology Stack

- HTML5 semantic markup
- CSS3 with custom properties and modern layout methods
- Vanilla JavaScript (ES6+)
- Service Worker for offline support and caching
- LocalStorage for client-side persistence
- Bootstrap Icons (CDN)
- No external JavaScript frameworks

## Installation

1. Clone or download the project
2. Serve files via HTTP (required for Service Worker functionality)
3. Access via browser at http://localhost:3000 (or your server URL)
4. Install as PWA: Browser menu → Install app (or add to home screen)

## Project Structure

```
├── index.html           Home page with featured content
├── library.html         Story and poem browsing
├── reader.html          Content reading interface
├── events.html          Event calendar
├── guild.html           Guild information and members
├── join.html            Membership application
├── manifest.json        PWA configuration
├── service-worker.js    Offline support
├── css/
│   ├── style.css        Global styles and variables
│   ├── components.css   Reusable component styles
│   └── animations.css   Keyframe animations
├── js/
│   ├── app.js           Theme and navigation management
│   ├── storage.js       LocalStorage utilities
│   ├── library.js       Content browsing logic
│   ├── reader.js        Not yet integrated
│   ├── events.js        Event management
│   └── search.js        Search functionality
├── data/
│   ├── stories.json     Story content
│   ├── poems.json       Poetry content
│   ├── events.json      Event information
│   ├── members.json     Guild members
│   └── constitution.json Guild constitution
└── assets/
    └── logo.png         Guild logo
```

## Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers on iOS 14+, Android 9+

## Data Format

All content is stored in JSON files for easy management and editing:
- Stories and poems include metadata (author, genre, date, read time)
- Events support ICS calendar export
- Members include expertise tags
- Constitution structured by articles

## Performance

- Cached-first strategy for static assets
- Background updates for data files
- Optimized image loading with lazy loading
- No external dependencies except Bootstrap Icons CDN

## License

Internal project for MUST Writers Guild.

## Developer
1st version Developed by Sekani Msachi