// Service Worker for offline caching
const CACHE_NAME = 'offline-cache';
const FILES_TO_CACHE = [
    'index.html',
    'main.css',
    'exploit.js',
    'custom_host_stuff.js',
    'int64.js',
    'payload_map.js',
    'rop.js',
    'rop_slave.js',
    'webkit_fontface.js',
    'module/syscalls.js',
    '/payloads/byeprevisor.elf',
    '/payloads/elfldr.elf',
    '/payloads/etaHEN.bin',
    '/payloads/ftpsrv.elf',
    '/payloads/gdbsrv.elf',
    '/payloads/klogsrv.elf',
    '/payloads/libhijacker-game-patch.v1.160.elf',
    '/payloads/ps5-kstuff.bin',
    '/payloads/ps5-versions.elf',
    '/payloads/ps5debug_dizz.elf',
    '/payloads/ps5debug_v1.0b2.elf',
    '/payloads/rp-get-pin.elf',
    '/payloads/shsrv.elf',
    '/payloads/websrv.elf',

    // Offset files
    '/offsets/1.00.js',
    '/offsets/1.01.js',
    '/offsets/1.02.js',
    '/offsets/1.05.js',
    '/offsets/1.10.js',
    '/offsets/1.11.js',
    '/offsets/1.12.js',
    '/offsets/1.13.js',
    '/offsets/1.14.js',
    '/offsets/2.00.js',
    '/offsets/2.20.js',
    '/offsets/2.25.js',
    '/offsets/2.26.js',
    '/offsets/2.30.js',
    '/offsets/2.50.js',
    '/offsets/2.70.js',
    '/offsets/3.00.js',
    '/offsets/3.10.js',
    '/offsets/3.20.js',
    '/offsets/3.21.js',
    '/offsets/4.00.js',
    '/offsets/4.02.js',
    '/offsets/4.03.js',
    '/offsets/4.50.js',
    '/offsets/4.51.js',
    '/offsets/5.00.js',
    '/offsets/5.02.js',
    '/offsets/5.10.js',
    '/offsets/5.50.js',

];

// Install Service Worker & Cache Files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching app shell, payloads, and offsets...');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Fetch from Cache First, then Network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Activate & Clean Old Caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});
