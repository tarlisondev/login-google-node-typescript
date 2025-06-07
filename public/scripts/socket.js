

const socket = io();
const from = document.body.dataset.user;
const to = document.body.dataset.contact;
const messageInput = document.getElementById('message')
const sendBtn = document.getElementById('send');
const chatMessages = document.getElementById('chat-messages')

socket.emit('register', from); // envia email ao conectar

sendBtn.addEventListener('click', e => {
  e.preventDefault();

  const content = messageInput.value.trim();

  if (!content) return

  const data = {
    fromEmail: from,
    toEmail: to,
    content: messageInput.value,
    createdAt: new Date().toISOString()
  }

  // Exibir a mensagem enviada na interface
  renderMessage(data.content, 'sent');

  // Enviar para o servidor
  socket.emit('send_message', data);

  messageInput.value = '';

});

// Receber mensagem
socket.on('receive_message', (data) => {
  // Verifica se a mensagem é destinada ao usuário atual
  if (data.toEmail === from) {
    renderMessage(data.content, 'received');
  }
});

// Função para exibir mensagem no chat
function renderMessage(text, type) {
  const div = document.createElement('div');
  div.classList.add('message', type);
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker registrado!'));
}


