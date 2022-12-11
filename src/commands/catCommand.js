import { resolve } from "path";
import { createReadStream } from "fs";

import { Command } from "./command.js";
import { fsErrorHandler } from "../utils.js";
import { FsNotExistsError } from "../errors/errors.js";

export class CatCommand extends Command {
  _path;
  _writeStream;
  _MANDATORY_ARGS_COUNT = 1;

  constructor(manager, args, writeStream) {
    super(manager, args);
    this.validateArgs();
    this._path = resolve(this._manager.currDir, this._args[0]);
    this._writeStream = writeStream;
  }

  async execute() {
    // console.log("readStream1", readStream);
    return new Promise(async (res, rej) => {
      try {
        if (!(await Command.isFile(this._path))) throw new FsNotExistsError(this._path);
        const readStream = createReadStream(this._path);
        readStream.pipe(this._writeStream);
        readStream.on("end", () => {
          res();
        });
        readStream.on("error", (err) => {
          rej(fsErrorHandler(err));
        });
        this._writeStream.on("error", (err) => {
          rej(fsErrorHandler(err));
        });
      } catch (err) {
        fsErrorHandler(err);
      }
    });
  }

  help() {
    return "cat <file_nm>";
  }
}
