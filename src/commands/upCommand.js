import { sep } from "path";

import { Command } from "./command.js";

export class UpCommand extends Command {
  execute() {
    const splittedPath = this._manager.currDir.split(sep);
    this._manager.currDir = (splittedPath.length === 1 ? splittedPath : splittedPath.slice(0, -1)).join(sep);
  }

  static help() {
    return "up";
  }
}
