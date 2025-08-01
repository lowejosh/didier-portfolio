#!/usr/bin/env node

const liveServer = require('live-server');
const path = require('path');

const params = {
    port: 3000, // Set the server port. Defaults to 8080.
    host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "./", // Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    ignore: 'node_modules', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 100, // Waits for all changes, before reloading. Defaults to 0 sec.
    mount: [], // Mount a directory to a route.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [function(req, res, next) { 
        // Custom middleware example
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        next(); 
    }]
};

console.log('🚀 Starting development server with hot reloading...');
console.log(`📂 Serving files from: ${path.resolve(params.root)}`);
console.log(`🌐 Server will be available at: http://${params.host}:${params.port}`);
console.log('🔥 Hot reloading is enabled - changes will automatically refresh the browser');
console.log('📁 Watching: HTML, CSS, JS, SVG, and image files');
console.log('⏹️  Press Ctrl+C to stop the server\n');

liveServer.start(params);
