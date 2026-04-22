import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
            buildDirectory: 'build', // ⭐ QUAN TRỌNG
        }),
        react(),
        svgr(),
    ],
    build: {
        outDir: 'public/build',   // 🔥 QUAN TRỌNG
        emptyOutDir: true,
        manifest: true,
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
