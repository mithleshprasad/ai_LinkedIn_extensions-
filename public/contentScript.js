// Log to check if content script is executing
console.warn("LinkedIn content script is running.");

// Function to fill LinkedIn chat input with the given reply
function fillChatInput(reply) {
  const chatInput = document.querySelector('div.msg-form__contenteditable');
  if (chatInput) {
    console.warn("Chat input found. Filling with reply:", reply);

    // Clear and set the input
    chatInput.innerHTML = ''; 
    chatInput.focus();
    document.execCommand('insertText', false, reply);
  } else {
    console.error('Chat input not found!');
  }
}

// Function to send the message
function sendChatMessage() {
  const sendButton = document.querySelector('button.msg-form__send-button');
  if (sendButton) {
    console.log("Send button found. Sending message.");
    sendButton.click();
  } else {
    console.error('Send button not found!');
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'fillChatInput') {
    fillChatInput(request.reply);
  } else if (request.action === 'sendChatMessage') {
    sendChatMessage();
  }
});
