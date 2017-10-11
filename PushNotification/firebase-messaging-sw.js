importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '599989926222'
});

firebase.messaging();

self.addEventListener('notificationclick', function (event) {
    const target = event.notification.data.click_action || '/';
    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function (clientList) {
        // clientList always is empty?!
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }

        return clients.openWindow(target);
    }));
});
