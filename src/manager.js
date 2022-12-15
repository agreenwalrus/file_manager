import { EOL } from "os";
import readline from "readline/promises";

import { CommandFacade } from "./commandFacade.js";
import { fsErrorHandler } from "./utils.js";

export class Manager {
  #userName;
  #currDir;
  #commandFactory;
  #readLine;

  constructor(userName, currDir) {
    this.#currDir = currDir;
    this.#userName = userName;
    this.#commandFactory = new CommandFacade();
    this.#readLine = readline.createInterface({ input: process.stdin, output: process.stdout });
    this.#readLine.setPrompt(this.prompt);
  }

  async start() {
    await this.#setUpEvents();
    console.log(this.startMessage);
    this.#readLine.prompt();
  }

  async #setUpEvents() {
    this.#readLine.on("line", async (data) => {
      try {
        const res = await this.execute(data.toString());
        if (res !== undefined) console.log(res);
      } catch (err) {
        fsErrorHandler(err);
      }
      this.#readLine.prompt();
    });

    process.on("exit", (code) => {
      this.#readLine.close();
      process.stdout.write(EOL);
      console.log(this.endMessage);
    });

    process.on("SIGINT", () => {
      this.execute(".exit");
    });

    process.on("uncaughtException", (err) => {
      console.log(`Operation failed: ${err.message}`);
      this.#readLine.prompt();
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
    this.#readLine.setPrompt(this.prompt);
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
    return `👻 You are currently in ${this.currDir}> `;
  }
}
