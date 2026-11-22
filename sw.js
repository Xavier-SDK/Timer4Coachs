/* Ancienne app web Timer4Coachs, retirée : ce service worker vide son cache hors ligne et se désinstalle,
   pour que les téléphones où elle était installée affichent la page d'accueil actuelle. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({ type: 'window' }))
    .then(clients => clients.forEach(c => c.navigate(c.url))));
});
