import { EOL } from "os";
import { AddCommand } from "./commands/addCommand.js";
import { CatCommand } from "./commands/catCommand.js";
import { CdCommand } from "./commands/cdCommad.js";
import { CompressCommand } from "./commands/compressCommand.js";

import { ExitCommand } from "./commands/exitCommand.js";
import { HashCommand } from "./commands/hashCommand.js";
import { RmCommand } from "./commands/rmCommand.js";
import { UpCommand } from "./commands/upCommand.js";
import { NoSuchCommandError } from "./errors/errors.js";

export class CommandFacade {
  getCommand(input, manager) {
    const [command, ...other] = input
      .replace(EOL, "")
      .split(" ")
      .filter((p) => p !== "");
    console.log("getCommand", other);
    const args = other ?? [];
    console.log("getCommand", other, args);

    switch (command) {
      case "add":
        return this.#getAddCommand(manager, args);
      case "cat":
        return this.#getCatCommand(manager, args);
      case "up":
        return this.#getUpCommand(manager);
      case ".exit":
        return this.#getExitCommand(manager);
      case "hash":
        return this.#getHashCommand(manager, args);
      case "cd":
        return this.#getCdCommand(manager, args);
      case "compress":
        return this.#getCompressCommand(manager, args);
      case "decompress":
        return this.#getDecompressCommand(manager, args);
      case "rm":
        return this.#getRmCommand(manager, args);
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

  #getAddCommand(manager, args) {
    return new AddCommand(manager, args);
  }

  #getCatCommand(manager, args) {
    return new CatCommand(manager, args, process.stdout);
  }

  #getCdCommand(manager, args) {
    return new CdCommand(manager, args);
  }

  #getCompressCommand(manager, args) {
    return new CompressCommand(manager, args, 1);
  }

  #getDecompressCommand(manager, args) {
    return new CompressCommand(manager, args, 0);
  }

  #getRmCommand(manager, args) {
    return new RmCommand(manager, args);
  }
}
