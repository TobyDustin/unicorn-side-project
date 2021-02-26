let tagElement = null;
let ticketElement = null;
let messageElement = null;
let outputElement = null;
let errorElement = null;
let root = null;

const state = {
  tag: "",
  ticket: "",
  message: "",
  error: false,
  errorMessage: "The commit message should be less than 100 characters",
};
// var option = document.createElement("option");
// option.text = "nothing";
// tagElement.add(option);

function load() {
  root = document.getElementById("root");

  root.appendChild(new TicketInput().create());
  root.appendChild(new MessageInput().create());
  // tagElement = document.getElementById("tag");
  // ticketElement = document.getElementById("ticket");
  // messageElement = document.getElementById("message");
  // outputElement = document.getElementById("output");
  // errorElement = document.getElementById("error");

  // tagElement.addEventListener("input", updateTag);
  // ticketElement.addEventListener("input", updateTicket);
  // messageElement.addEventListener("input", updateMessage);
}
const InputFactory = () => {
  this.create = ({
    name,
    type = "text",
    placeholder = "Input",
    eventType,
    eventHandler,
  }) => {
    var inputContainer = document.createElement("div");

    var label = document.createElement("label");
    label.innerHTML = name;

    var input = document.createElement("input");
    input.placeholder = placeholder;
    input.id = name;
    input.addEventListener(eventType, eventHandler);

    inputContainer.appendChild(label);
    inputContainer.appendChild(input);

    return inputContainer;
  };
  return this;
};
class Input {
  constructor(
    config = { name: "name", placeholder: "input", eventType: "click" }
  ) {
    this.element = null;
    this.config = config;
  }

  validateInput = () => {};
  handleInput = () => {
    console.log(this.element.children[1].value);
  };

  createElement = () => {
    this.element = InputFactory().create({
      name: this.config.name,
      placeholder: this.config.placeholder,
      eventType: this.config.eventType,
      eventHandler: this.handleInput,
    });
    return this.element;
  };
  create = () => this.element ?? this.createElement();
}

class TicketInput extends Input {
  constructor() {
    super({
      name: "ticket",
      placeholder: "gtech-00000",
      eventType: "input",
    });
  }
  handleInput = () => {
    state.ticket = this.element.children[1].value;
    console.log(state);
  };
}
class MessageInput extends Input {
  constructor() {
    super({
      name: "message",
      placeholder: "this is a commit message",
      eventType: "input",
    });
  }
  handleInput = () => {
    state.message = this.element.children[1].value;
    console.log(state);
  };
}

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
function validateMessage(message) {}
function displayOutput() {
  state.output = `${state.tag}(${state.ticket}): ${state.message}`;
  outputElement.innerHTML = state.output;
}
