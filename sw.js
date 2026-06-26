// Szafa push notification service worker v2
// Immediately takes control so pushManager.subscribe() works on first load.

self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('push', e => {
  let data = {};
  try { data = e.data?.json() ?? {}; } catch { data = { title: 'Szafa', body: e.data?.text() ?? '' }; }
  e.waitUntil(self.registration.showNotification(data.title || 'Szafa', {
    body:    data.body || '',
    icon:    '/szafa/icon-192.png',
    badge:   '/szafa/icon-192.png',
    data:    { url: data.url || '/szafa' },
    vibrate: [200, 100, 200],
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || '/szafa'));
});
