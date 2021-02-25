let tag = "feat";
let ticket = "gtech-00000";
let message = "";

let tagElement = null;
let ticketElement = null;
let messageElement = null;
let outputElement = null;
let errorElement = null;

function load() {
  tagElement = document.getElementById("tag");
  ticketElement = document.getElementById("ticket");
  messageElement = document.getElementById("message");
  outputElement = document.getElementById("output");
  errorElement = document.getElementById("error");
}

function updateForm(element) {
  switch (element) {
    case "tag":
      tag = tagElement.value;
      break;
    case "ticket":
      ticket = validateTicket(ticketElement.value.toLowerCase()) ?? "";
      break;
    case "message":
      let tempMessage = messageElement.value;
      if (validateMessage(tempMessage)) {
        message = tempMessage;
      }
      break;
  }
  displayOutput();
}
function validateTicket(ticket) {
  let regex = /gtech-\d{5}/g;
  return ticket.match(regex);
}
function validateMessage(message) {
  if (message.length < 100) {
    errorElement.className = "valid";
    errorElement.classList.remove("invalid");
    return true;
  } else {
    errorElement.className = "invalid";
    return false;
  }
}
function displayOutput() {
  outputElement.innerHTML = `${tag}(${ticket}): ${message}`;
}
