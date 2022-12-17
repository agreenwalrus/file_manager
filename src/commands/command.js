import { stat } from "fs/promises";
import { ValidaionError } from "../errors/errors.js";

export class Command {
  _args;
  _manager;
  _MANDATORY_ARGS_COUNT = 0;

  constructor(manager, args = []) {
    this._manager = manager;
    this._args = args;
  }

  validateArgs() {
    if (this._args.length < this._MANDATORY_ARGS_COUNT) throw new ValidaionError(this.help());
  }

  async execute() {
    throw new Error("Method is not defined");
  }

  static help() {
    throw new Error("Method is not defined");
  }

  static async isFile(path) {
    try {
      const st = await stat(path);
      return st.isFile();
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
      return false;
    }
  }

  static async isDirectory(path) {
    try {
      const st = await stat(path);
      return st.isDirectory();
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
      return false;
    }
  }
}
