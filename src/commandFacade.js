import { EOL } from "os";
import { AddCommand } from "./commands/addCommand.js";
import { CatCommand } from "./commands/catCommand.js";
import { CdCommand } from "./commands/cdCommad.js";
import { CompressBrotliCommand } from "./commands/compressBrotliCommand.js";
import { CpCommand } from "./commands/cpCommand.js";

import { ExitCommand } from "./commands/exitCommand.js";
import { HashCommand } from "./commands/hashCommand.js";
import { LsCommand } from "./commands/lsCommand.js";
import { OsCommand } from "./commands/osCommand.js";
import { RmCommand } from "./commands/rmCommand.js";
import { RnCommand } from "./commands/rnCommand.js";
import { UpCommand } from "./commands/upCommand.js";
import { NoSuchCommandError } from "./errors/errors.js";

export class CommandFacade {
  getCommand(input, manager) {
    const [command, ...other] = input
      .replace(EOL, "")
      .split(" ")
      .filter((p) => p !== "");
    const args = other ?? [];

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
        return this.#getCompressBrotliCommand(manager, args);
      case "decompress":
        return this.#getDecompressBrotliCommand(manager, args);
      case "rm":
        return this.#getRmCommand(manager, args);
      case "cp":
        return this.#getCpCommand(manager, args);
      case "mv":
        return this.#getMvCommand(manager, args);
      case "os":
        return this.#getOsCommand(manager, args);
      case "ls":
        return this.#getLsCommand(manager);
      case "rn":
        return this.#getRnCommand(manager, args);
      default:
        throw new NoSuchCommandError(command);
    }
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

  #getCompressBrotliCommand(manager, args) {
    return new CompressBrotliCommand(manager, args, 1, true);
  }

  #getDecompressBrotliCommand(manager, args) {
    return new CompressBrotliCommand(manager, args, -1, true);
  }

  #getRmCommand(manager, args) {
    return new RmCommand(manager, args);
  }

  #getCpCommand(manager, args) {
    return new CpCommand(manager, args);
  }

  #getMvCommand(manager, args) {
    return new CpCommand(manager, args, true);
  }

  #getOsCommand(manager, args) {
    return new OsCommand(manager, args);
  }

  #getLsCommand(manager) {
    return new LsCommand(manager);
  }

  #getRnCommand(manager, args) {
    return new RnCommand(manager, args);
  }
}
