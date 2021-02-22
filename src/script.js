let tag = "";
let ticket = "";
let message = "";

let tagElement = null;
let ticketElement = null;
let messageElement = null;

function load() {
  tagElement = document.getElementById("tag");
  ticketElement = document.getElementById("ticket");
  messageElement = document.getElementById("message");

  displayOutput();
}

function updateForm() {
  tag = tagElement.value;
  ticket = ticketElement.value.toLowerCase();
  message = messageElement.value;
  displayOutput();
}

function displayOutput() {
  document.getElementById("output").innerHTML = `${tag}(${ticket}): ${message}`;
}
