let root = null;

const state = {
  tag: "",
  ticket: "",
  message: "",
  error: false,
  errorMessage: "The commit message should be less than 100 characters",
};
const TAG_OPTIONS = [
  {
    value: "feat",
    text: "Feature - a new feature",
  },
  {
    value: "fix",
    text: "Fix - A bug fix",
  },
  {
    value: "docs",
    text: "Documentation - only changes to documentation",
  },
  {
    value: "style",
    text: "Style - changes that do not affect the code functionality",
  },
  {
    value: "refactor",
    text: "Refactor - A code change that improves the performance",
  },
  {
    value: "perf",
    text: "Performance - A code change that affects performance",
  },
  {
    value: "test",
    text: "Test - Adding missing tests",
  },
  {
    value: "chore",
    text: "Chore - Changes to build proccess",
  },
];
function load() {
  root = document.getElementById("root");

  root.appendChild(new TagSelect().create());
  root.appendChild(new TicketInput().create());
  root.appendChild(new MessageInput().create());
}
const InputFactory = () => {
  this.create = ({
    name,
    type = "text",
    placeholder = "Input",
    eventType,
    eventHandler,
  }) => {
    let inputContainer = document.createElement("div");

    let label = document.createElement("label");
    label.innerHTML = name;

    let input = document.createElement("input");
    input.placeholder = placeholder;
    input.id = name;
    input.addEventListener(eventType, eventHandler);

    inputContainer.appendChild(label);
    inputContainer.appendChild(input);

    return inputContainer;
  };
  return this;
};

const SelectFactory = () => {
  this.addOptions = (options) => {
    let optionsElements = [];
    options.forEach((optionConf) => {
      let option = document.createElement("option");
      option.value = optionConf.value;
      option.innerHTML = optionConf.text;

      optionsElements.push(option);
    });
    return optionsElements;
  };
  this.create = ({
    name = "Select",
    options = [],
    eventType,
    eventHandler,
  }) => {
    let selectContainer = document.createElement("div");

    let label = document.createElement("label");
    label.innerHTML = name;

    let select = document.createElement("select");
    this.addOptions(options).forEach((opt) => {
      select.add(opt);
    });
    select.addEventListener(eventType, eventHandler);

    selectContainer.appendChild(label);
    selectContainer.appendChild(select);

    return selectContainer;
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
  handleInput = () => {};

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
class Select {
  constructor(conf) {
    this.element = null;
    this.conf = conf;
  }
  handleInput = () => {};
  createElement = () => {
    this.element = SelectFactory().create({
      ...this.conf,
      eventHandler: this.handleInput,
    });
    return this.element;
  };
  create = () => this.element ?? this.createElement();
}

class TagSelect extends Select {
  constructor() {
    super({
      name: "tag",
      eventType: "change",
      options: TAG_OPTIONS,
    });
  }
  handleInput = () => {
    state.tag = this.element.children[1].value;
  };
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
