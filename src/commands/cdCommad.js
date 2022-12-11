import { resolve } from "path";
import fs from "fs/promises";

import { Command } from "./command.js";
import { FsNotExistsError } from "../errors/errors.js";
import { fsErrorHandler } from "../utils.js";

export class CdCommand extends Command {
  _path;
  _MANDATORY_ARGS_COUNT = 1;

  constructor(manager, args) {
    super(manager, args);
    this.validateArgs();
    this._path = resolve(this._manager.currDir, this._args[0]);
  }

  async execute() {
    try {
      if (!(await Command.isDirectory(this._path))) throw new FsNotExistsError(this._path, "Folder");
      this._manager.currDir = this._path;
    } catch (err) {
      fsErrorHandler(err, "Folder");
    }
  }

  help() {
    return "cd <folder_name>";
  }
}
