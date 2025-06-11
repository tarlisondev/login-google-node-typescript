const socket = io();
const email = document.body.dataset.user;
socket.emit("register", email);