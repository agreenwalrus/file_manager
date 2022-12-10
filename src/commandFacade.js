import { EOL } from "os";

import { ExitCommand } from "./commands/exitCommand.js";
import { HashCommand } from "./commands/hashCommand.js";
import { UpCommand } from "./commands/upCommand.js";
import { NoSuchCommandError } from "./errors/errors.js";

export class CommandFacade {
  getCommand(input, manager) {
    const [command, other] = input.replace(EOL, "").split(" ");
    const args = other ? other.split(" ").filter((p) => p !== "") : [];

    switch (command) {
      case "up":
        return this.#getUpCommand(manager);
      case ".exit":
        return this.#getExitCommand(manager);
      case "hash":
        return this.#getHashCommand(manager, args);
      default:
        throw new NoSuchCommandError(command);
    }

    //throw new Error("Method is not defined");
  }

  #getUpCommand(manager) {
    return new UpCommand(manager);
  }

  #getExitCommand(manager) {
    return new ExitCommand(manager);
  }

  #getHashCommand(manager, args) {
    return new HashCommand(manager, args);
  }
}
