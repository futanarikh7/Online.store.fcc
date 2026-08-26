// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDsTcOmQx8HdwP9cF_vIA8rEkh1Q6V3y5w",
    authDomain: "one-page-store-aug-26.firebaseapp.com",
    databaseURL: "https://one-page-store-aug-26-default-rtdb.firebaseio.com",
    projectId: "one-page-store-aug-26",
    storageBucket: "one-page-store-aug-26.firebasestorage.app",
    messagingSenderId: "186091391204",
    appId: "1:186091391204:web:22612de5b8c1bec23ac4f1",
    measurementId: "G-VK3YDLKL26"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification?.title || '📦 New Order!';
    const notificationOptions = {
        body: payload.notification?.body || 'You have a new notification',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        vibrate: [200, 100, 200],
        requireInteraction: true,
        data: {
            url: payload.data?.click_action || '/'
        }
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const urlToOpen = event.notification.data?.url || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(clientList) {
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
