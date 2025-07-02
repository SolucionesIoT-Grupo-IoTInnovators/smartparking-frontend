importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyBcQPrQnaJRKPiZhHnrnXZPRT4uHHJVSdU",
    authDomain: "iot-innovators-d423f.firebaseapp.com",
    projectId: "iot-innovators-d423f",
    storageBucket: "iot-innovators-d423f.firebasestorage.app",
    messagingSenderId: "990367677327",
    appId: "1:990367677327:web:909dd4e2bc34ea00ffa9fa"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Mensaje en background:', payload);
    const { title, body } = payload.notification;
    self.registration.showNotification(title, {
        body,
        icon: '/logo.png',
    });
});
