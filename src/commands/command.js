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
}
