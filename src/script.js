const state = {
  tag: "feat",
  ticket: "",
  message: "",
  error: false,
  errorMessage: "ticket or message incorrect",
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
const InputFactory = () => {
  this.create = ({
    name,
    type = "text",
    placeholder = "Input",
    eventType,
    eventHandler,
  }) => {
    let inputContainer = document.createElement("div");
    inputContainer.id = name + type;
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
    config = {
      name: "name",
      placeholder: "input",
      eventType: "click",
    },
    render
  ) {
    this.element = null;
    this.config = config;
    this.render = render;
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
  constructor(conf, render) {
    this.element = null;
    this.conf = conf;
    this.render = render;
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
  constructor(render) {
    super(
      {
        name: "tag",
        eventType: "change",
        options: TAG_OPTIONS,
      },
      render
    );
  }
  handleInput = () => {
    state.tag = this.element.children[1].value;
    this.render();
  };
}
class TicketInput extends Input {
  constructor(render) {
    super(
      {
        name: "ticket",
        placeholder: "gtech-00000",
        eventType: "input",
      },
      render
    );
  }
  validateInput = (input) => {
    let regex = /gtech-\d{5}/g;
    return input.match(regex);
  };
  handleInput = () => {
    let input = this.validateInput(this.element.children[1].value);
    if (input) {
      state.error = false;
      state.ticket = input[0];
    } else {
      state.error = true;
    }
    this.render();
  };
}
class MessageInput extends Input {
  constructor(render) {
    super(
      {
        name: "message",
        placeholder: "this is a commit message",
        eventType: "input",
      },
      render
    );
  }
  validateInput = (input) => {
    return input.length < 100 ? true : false;
  };
  handleInput = () => {
    let input = this.element.children[1].value;
    if (this.validateInput(input)) {
      state.error = false;
      state.message = input;
    } else {
      state.error = true;
    }
    this.render();
  };
}

class Error {
  create = () => {
    let error = document.createElement("div");
    error.class = "invalid";
    error.id = "error";
    error.innerHTML = state.errorMessage;
    return error;
  };
}
class Output {
  create = (text) => {
    let output = document.createElement("code");
    output.id = "output";
    output.innerHTML = text;
    return output;
  };
}
class App {
  constructor() {
    this.root = document.getElementById("root");
    this.oldState = null;
  }

  render() {
    let error = document.getElementById("error");
    let outputElement = document.getElementById("output");
    error.innerHTML = state.error ? state.errorMessage : "";

    outputElement.innerHTML = "";
    outputElement.innerHTML = `${state.tag}(${state.ticket}):${state.message}`;
  }
  load() {
    root.appendChild(new TagSelect(this.render).create());
    root.appendChild(new TicketInput(this.render).create());
    root.appendChild(new MessageInput(this.render).create());
    this.render();
  }
}

const start = () => {
  new App().load();
};
