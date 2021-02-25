let tagElement = null;
let ticketElement = null;
let messageElement = null;
let outputElement = null;
let errorElement = null;

// var option = document.createElement("option");
// option.text = "nothing";
// tagElement.add(option);

function load() {
  tagElement = document.getElementById("tag");
  ticketElement = document.getElementById("ticket");
  messageElement = document.getElementById("message");
  outputElement = document.getElementById("output");
  errorElement = document.getElementById("error");

  tagElement.addEventListener("input", updateTag);
  ticketElement.addEventListener("input", updateTicket);
  messageElement.addEventListener("input", updateMessage);
}

const state = {
  tag: "",
  ticket: "",
  message: "",
  error: false,
  errorMessage: "The commit message should be less than 100 characters",
};

function updateTag() {
  state.tag = tagElement.value;
  displayOutput();
}
function updateTicket() {
  state.ticket = validateTicket(ticketElement.value.toLowerCase()) ?? "";
  displayOutput();
}

function updateMessage() {
  let tempMessage = messageElement.value;
  if (validateMessage(tempMessage)) {
    state.message = tempMessage;
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
  state.output = `${state.tag}(${state.ticket}): ${state.message}`;
  outputElement.innerHTML = state.output;
}
