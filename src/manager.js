import { EOL } from "os";

import { CommandFacade } from "./commandFacade.js";

export class Manager {
  #userName;
  #currDir;
  #commandFactory;

  constructor(userName, currDir) {
    this.#currDir = currDir;
    this.#userName = userName;
    this.#commandFactory = new CommandFacade();
  }

  start() {
    this.#setUpEvents();
    console.log(this.startMessage);
    process.stdout.write(this.prompt);
  }

  async #setUpEvents() {
    process.stdin.on("data", async (data) => {
      try {
        const res = await this.execute(data.toString());
        if (res !== undefined) console.log(res);
      } catch (err) {
        console.log(`${err.name}: ${err.message}`);
      }
      process.stdout.write(this.prompt);
    });

    process.on("exit", (code) => {
      console.log(this.endMessage);
    });

    process.on("SIGINT", () => {
      process.stdout.write(EOL);
      this.execute(".exit");
    });
  }

  get userDir() {
    return this.#userName;
  }

  get currDir() {
    return this.#currDir;
  }

  set currDir(newDir) {
    this.#currDir = newDir;
  }

  execute(input) {
    const command = this.#commandFactory.getCommand(input, this);
    return command.execute();
  }

  get startMessage() {
    return `Welcome to the File Manager, ${this.#userName}!`;
  }

  get endMessage() {
    return `Thank you for using File Manager, ${this.#userName}, goodbye!`;
  }

  get prompt() {
    return `🤓 ${this.currDir}>`;
  }
}
