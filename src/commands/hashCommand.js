import { readFile } from "node:fs/promises";
import { resolve } from "path";
import { createHash } from "node:crypto";

import { fsErrorHandler } from "../utils.js";
import { Command } from "./command.js";

export class HashCommand extends Command {
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
      const data = await readFile(pathFile, { encoding: "utf8" });
      return createHash("sha256").update(data).digest("hex");
    } catch (err) {
      fsErrorHandler(err);
    }
  }

  help() {
    return "hash <path_to_file>";
  }
}
