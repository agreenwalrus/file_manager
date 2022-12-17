import { resolve } from "path";
import { rename } from "fs/promises";

import { fsErrorHandler } from "../utils.js";
import { Command } from "./command.js";
import { FsExistsError } from "../errors/errors.js";

export class RnCommand extends Command {
  _oldPath;
  _newPath;
  _MANDATORY_ARGS_COUNT = 2;

  constructor(manager, args) {
    super(manager, args);
    this.validateArgs();
    this._oldPath = resolve(this._manager.currDir, this._args[0]);
    this._newPath = resolve(this._manager.currDir, this._args[1]);
  }

  async execute() {
    try {
      if ((await Command.isFile(this._newPath)) || (await Command.isDirectory(this._newPath))) throw new FsExistsError(this._newPath, "File or Folder");
      return rename(this._oldPath, this._newPath);
    } catch (err) {
      fsErrorHandler(err);
    }
  }

  help() {
    return "rn <path_to_file> <new_filename>";
  }
}
