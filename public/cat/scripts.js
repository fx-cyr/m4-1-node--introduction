const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");

handleFocus = () => {
  messageInput.focus();
};
const updateConversation = (message) => {
  // deconstruct the message object
  const { author, text } = message;
  // create a <p> element
  const messageElem = document.createElement("p");
  // add the text message to the element
  messageElem.innerHTML = `<span>${text}</span>`;
  messageElem.classList.add("message", author);
  // append the element to the conversation
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;
  console.log(message);
  if (author === "user") {
    messageInput.value = "";
  }
};

const sendMessage = (event) => {
  // prevent the default "page reload" from occurring.
  const message = { author: "user", text: messageInput.value };
  event.preventDefault();
  updateConversation(message);

  fetch("/cat-message")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message);
      updateConversation(data.message);
    });
};

handleFocus();
