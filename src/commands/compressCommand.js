import { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";

import { Command } from "./command.js";
import { fsErrorHandler } from "../utils.js";
import { FsExistsError, FsNotExistsError } from "../errors/errors.js";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { RmCommand } from "./rmCommand.js";

export class CompressCommand extends Command {
  _pathSourse;
  _pathDestination;
  _MANDATORY_ARGS_COUNT = 2;
  #comress;

  constructor(manager, args, compress) {
    super(manager, args);
    this.#comress = compress;
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
        const compressStream = this.#comress === 1 ? createBrotliCompress() : createBrotliDecompress();

        readStream.pipe(compressStream).pipe(writeStream);

        readStream.on("end", async () => {
          await new RmCommand(this._manager, [this._pathSourse]).execute();
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

  help() {
    return `${this.#comress === 1 ? "compress" : "decompress"} <path_to_sourse> <path_to_destination>`;
  }
}
