let tag = localStorage.getItem("tag") ?? "feat";
let ticket = localStorage.getItem("ticket") ?? "gtech-00000";
let message = localStorage.getItem("message") ?? "";

let tagElement = null;
let ticketElement = null;
let messageElement = null;

function load() {
  tagElement = document.getElementById("tag");
  ticketElement = document.getElementById("ticket");
  messageElement = document.getElementById("message");

  fillForm();
  displayOutput();
}
function fillForm() {
  tagElement.value = tag;
  ticketElement.value = ticket;
  messageElement.value = message;
}

function updateForm() {
  tag = tagElement.value;
  ticket = ticketElement.value.toLowerCase();
  message = messageElement.value;

  localStorage.setItem("tag", tag);
  localStorage.setItem("ticket", ticket);
  localStorage.setItem("message", message);

  displayOutput();
}

function displayOutput() {
  document.getElementById("output").innerHTML = `${tag}(${ticket}): ${message}`;
}
