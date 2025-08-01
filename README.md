# Didier Jourdain Portfolio - Development Setup

This portfolio website now includes hot reloading functionality for efficient development.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation
```bash
npm install
```

### Development Server with Hot Reloading
```bash
npm run dev
```

This will:
- Start a development server on `http://localhost:3000`
- Automatically open your browser
- Watch for changes in HTML, CSS, JS, and image files
- Automatically refresh the browser when files change

## 📝 Available Scripts

### `npm run dev`
Starts the development server with hot reloading using our custom configuration.

### `npm run simple`
Starts a simple live-server with basic hot reloading.

### `npm start`
Starts the live-server without automatic file watching.

### `npm run serve`
Starts a basic Python HTTP server on port 8000 (no hot reloading).

## 🔥 Hot Reloading Features

- **Instant Updates**: Changes to HTML, CSS, and JS files trigger automatic browser refresh
- **Asset Watching**: Images, SVGs, and other assets are also monitored
- **Fast Refresh**: Minimal delay between saving a file and seeing changes
- **Console Logging**: See requests and file changes in the terminal
- **Cross-Platform**: Works on macOS, Windows, and Linux

## 📁 Project Structure

```
didier-jourdain-portfolio.webflow/
├── index.html              # Main homepage
├── about-me.html           # About page
├── contact-me.html         # Contact page
├── my-works-home.html      # Works overview
├── css/                    # Stylesheets
│   ├── didier-jourdain-portfolio.webflow.css
│   ├── normalize.css
│   └── webflow.css
├── js/                     # JavaScript files
│   └── webflow.js
├── images/                 # Images and assets
├── documents/              # Documents (JSON, etc.)
├── package.json            # Node.js dependencies
├── dev-server.js          # Custom development server
└── .env                   # Environment configuration
```

## 🛠️ Development Workflow

1. **Start Development**: Run `npm run dev`
2. **Edit Files**: Make changes to any HTML, CSS, or JS files
3. **See Changes**: Browser automatically refreshes with your changes
4. **Debug**: Check the terminal for any errors or logs

## 🎨 Making Changes

### HTML Files
Edit any `.html` file and save - the browser will automatically refresh.

### CSS Styles
Modify files in the `css/` directory:
- `didier-jourdain-portfolio.webflow.css` - Main stylesheet
- `webflow.css` - Webflow framework styles
- `normalize.css` - CSS reset/normalize

### JavaScript
Edit `js/webflow.js` or add new JavaScript files.

### Images and Assets
Add or replace files in the `images/` directory.

## 🚫 Troubleshooting

### Port Already in Use
If port 3000 is busy, the server will automatically find the next available port.

### Browser Not Opening
Manually navigate to `http://localhost:3000` if the browser doesn't open automatically.

### Changes Not Reloading
- Check that files are saved
- Ensure you're editing files in the correct directory
- Restart the development server with `Ctrl+C` then `npm run dev`

### Cache Issues
If you see old content, try:
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Restart the development server

## 📦 Dependencies

- **live-server**: Provides the hot reloading functionality
- **Node.js**: Runtime for the development server

## 🌐 Production Deployment

For production, you can simply upload the HTML, CSS, JS, and image files to any web server. The hot reloading setup is only for development and won't affect your production site.

---

Happy coding! 🎨✨
