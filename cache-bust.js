import fs from 'fs';
import path from 'path';

const DIST_DIR = 'dist';
const VERSION = Date.now().toString();

function walkAndReplace(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            walkAndReplace(fullPath);
        } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Replace __SITE_VERSION__ placeholders
            content = content.replace(/__SITE_VERSION__/g, VERSION);

            // Scan for common asset extensions and append version if missing
            // Matches src="..." and href="..." for images, icons, etc.
            content = content.replace(/(src|href)="([^"]+\.(png|jpg|jpeg|webp|svg|css|js))"/g, (match, attr, url) => {
                // Don't append if it's external or already has a query string
                if (url.startsWith('http') || url.includes('?')) return match;
                return `${attr}="${url}?v=${VERSION}"`;
            });

            fs.writeFileSync(fullPath, content);
            console.log(`[Cache-Bust] Processed: ${fullPath}`);
        }
    });
}

if (fs.existsSync(DIST_DIR)) {
    console.log(`[Cache-Bust] Starting version injection (v${VERSION})...`);
    walkAndReplace(DIST_DIR);
    console.log('[Cache-Bust] Complete.');
} else {
    console.error('[Cache-Bust] Error: dist directory not found. Run "npm run build" first.');
}
