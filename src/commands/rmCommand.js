import { resolve } from "path";
import { unlink } from "fs/promises";

import { Command } from "./command.js";
import { fsErrorHandler } from "../utils.js";

export class RmCommand extends Command {
  _path;
  _MANDATORY_ARGS_COUNT = 1;

  constructor(manager, args) {
    super(manager, args);
    this.validateArgs();
    this._path = this._args[0];
  }

  async execute() {
    try {
      const pathFile = resolve(this._manager.currDir, this._path);
      return unlink(pathFile);
    } catch (err) {
      fsErrorHandler(err);
    }
  }

  help() {
    return "rm <path_to_file>";
  }
}
