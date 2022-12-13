import { cp } from "fs/promises";
import os from "os";
import { ValidaionError } from "../errors/errors.js";
import { Command } from "./command.js";

export class OsCommand extends Command {
  _MANDATORY_ARGS_COUNT = 1;

  #commands = {
    EOL: encodeURI(os.EOL),
    cpus: this.#cpus(),
    homedir: os.homedir(),
    username: os.userInfo().username,
    architecture: os.arch(),
  };

  constructor(manager, args) {
    super(manager, args);
    this.validateArgs();
    this._command = this._args[0].replace("--", "");
  }

  validateArgs() {
    super.validateArgs();
    if (!this.#commands.hasOwnProperty(this._args[0].replace("--", ""))) throw new ValidaionError(this.help());
  }

  async execute() {
    return this.#commands[this._command];
  }

  #cpus() {
    return [`Amount: ${os.cpus().length}`, ...os.cpus().map((cpu) => `Model: ${cpu.model}, Clock rate: ${(cpu.speed / 1000).toFixed(2)}GHz`)].join(os.EOL);
  }

  help() {
    return "os [--EOL] [--cpus] [--homedir] [--username] [--architecture] <command>";
  }
}
