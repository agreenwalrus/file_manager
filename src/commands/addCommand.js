import { resolve } from "path";
import { writeFile } from "fs/promises";

import { Command } from "./command.js";
import { fsErrorHandler } from "../utils.js";

export class AddCommand extends Command {
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
      return writeFile(pathFile, "", { flag: "wx" });
    } catch (err) {
      fsErrorHandler(err);
    }
  }

  help() {
    return "add <new_file_name>";
  }
}
