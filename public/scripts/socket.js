
const socket = io();
const emailFrom = document.body.dataset.user;
const emalTo = document.body.dataset.contact;
const messageInput = document.getElementById('message')
const sendButton = document.getElementById('send');
const chatMessages = document.getElementById('chat-messages');

socket.emit("register", emailFrom);

messageInput.addEventListener('keyup', async e => {
  e.preventDefault();
  if (e.code !== 'Enter') return
  createSpace();
  sendMessageServer(validMessage());
  await addMessageContact(emalTo, validMessage().content, 'sent');
  renderMessage(validMessage().content, 'sent');
  clearInputAndFocus()
})

sendButton.addEventListener('click', async e => {
  e.preventDefault();
  createSpace();
  sendMessageServer(validMessage());
  await addMessageContact(emalTo, validMessage().content, 'sent');
  renderMessage(validMessage().content, 'sent');
  clearInputAndFocus();
});

socket.on('receive_message', async ({ toEmail, content }) => {
  await addMessageContact(emalTo, content, 'received');
  // Verifica se a mensagem é destinada ao usuário atual
  if (toEmail === emailFrom) renderMessage(content, 'received');
});

// Função para exibir mensagem no chat
async function renderMessage(text, type) {

  chatMessages.innerHTML = '';

  let info = await loadMessages();
  info.forEach(item => {
    if (item.contact === emalTo) {
      item.messages.forEach(message => {

        const div = document.createElement('div');
        div.classList.add('message', message.type);
        div.textContent = message.text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;

      });
    } else {
      console.log('não achou');
    }
  })



}

// Função para validar as mensagens antes de enviar
function validMessage() {

  const content = messageInput.value.trim();

  if (!content)
    return;

  const data = {
    fromEmail: emailFrom,
    toEmail: emalTo,
    content: messageInput.value,
    createdAt: new Date().toISOString()
  }

  return data;

}

// Função para enviar dados para servidor
function sendMessageServer(data) {
  socket.emit('send_message', data);
}

// Função para criar espaço no localStorage
function createSpace() {
  if (!localStorage.getItem('messages'))
    localStorage.setItem('messages', JSON.stringify([]));
}

// Função para carregar mensagens do localStorage
function loadMessages() {
  return JSON.parse(localStorage.getItem('messages')) || [];
}

async function existContact(contact) {
  let data = await loadMessages();
  return data.find(x => x.contact == contact);
}

async function addMessageContact(contact, text, type) {

  let exist = await existContact(contact);
  let data = await loadMessages();

  if (!exist) {
    let user = { contact, messages: [{ text, type }] }
    data.push(user);
    saveMessages(data);
  } else {

    data.forEach(async item => {
      if (item.contact === contact) {
        item.messages.push({ text, type });
      }
    });

    saveMessages(data);

  }
}

// Função para salvar mensagens no localStorage
function saveMessages(messages) {
  localStorage.setItem('messages', JSON.stringify(messages));
}

// Função para limpar o input e focar
function clearInputAndFocus() {
  messageInput.value = '';
  messageInput.focus();
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker registrado!'));
}

renderMessage();
