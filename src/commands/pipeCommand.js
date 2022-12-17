import { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";

import { Command } from "./command.js";
import { fsErrorHandler } from "../utils.js";
import { FsExistsError, FsNotExistsError } from "../errors/errors.js";
import { RmCommand } from "./rmCommand.js";
import { PassThrough } from "stream";

export class PipeCommand extends Command {
  _pathSourse;
  _pathDestination;
  _MANDATORY_ARGS_COUNT = 2;
  _compress;
  _removeSource;

  constructor(manager, args, removeSourse = false, transformStream = new PassThrough()) {
    super(manager, args);
    this._transformStream = transformStream;
    this._removeSource = removeSourse;
    this.validateArgs();
    this._pathSourse = resolve(this._manager.currDir, this._args[0]);
    this._pathDestination = resolve(this._manager.currDir, this._args[1]);
  }
  
  async execute() {
    return new Promise(async (res, rej) => {
      try {
        if (!(await Command.isFile(this._pathSourse))) throw new FsNotExistsError(this._pathSourse);
        if (await Command.isFile(this._pathDestination)) throw new FsExistsError(this._pathDestination);

        const readStream = createReadStream(this._pathSourse);
        const writeStream = createWriteStream(this._pathDestination);

        readStream.pipe(this._transformStream).pipe(writeStream);

        readStream.on("end", async () => {
          if (this._removeSource) await new RmCommand(this._manager, [this._pathSourse]).execute();
          res();
        });

        readStream.on("error", (err) => {
          rej(fsErrorHandler(err));
        });

        writeStream.on("error", (err) => {
          rej(fsErrorHandler(err));
        });
      } catch (err) {
        fsErrorHandler(err);
      }
    });
  }
}
