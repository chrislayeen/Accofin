import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: 'stitch_website',
    base: './',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve('stitch_website/index.html'),
                about: resolve('stitch_website/about.html'),
                contact: resolve('stitch_website/contact.html'),
                global: resolve('stitch_website/global_companies.html'),
                indian: resolve('stitch_website/indian_businesses.html'),
                how: resolve('stitch_website/how_we_work.html')
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
})
