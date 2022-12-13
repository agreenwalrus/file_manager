import { resolve, basename, dirname } from "path";
import fs from "fs/promises";

import { fsErrorHandler } from "../utils.js";
import { Command } from "./command.js";
import { PipeCommand } from "./pipeCommand.js";

export class CpCommand extends Command {
  _pathSourse;
  _pathDestination;
  _MANDATORY_ARGS_COUNT = 2;
  #removeSrc;

  constructor(manager, args, removeSrc = false) {
    super(manager, args);
    this.validateArgs();
    this._pathSourse = resolve(this._manager.currDir, this._args[0]);
    this._pathDestination = resolve(this._manager.currDir, this._args[1]);
    this.#removeSrc = removeSrc;
  }

  async execute() {
    try {
      await this.#copyDirectoryDeep(this._pathSourse, this._pathDestination);
    } catch (err) {
      fsErrorHandler(err);
    }
  }

  async #copyDirectoryDeep(srcPath, destPath) {
    let files;
    if (await Command.isFile(srcPath)) {
      files = [{ name: basename(srcPath), isDirectory: () => false }];
      srcPath = dirname(srcPath);
    } else {
      files = await fs.readdir(srcPath, { withFileTypes: true });
    }

    await fs.mkdir(destPath).catch((err) => {
      if (err.code !== "EEXIST") throw err;
    });
    
    return Promise.all(
      files.map(async (file) => {
        const srcFilePath = resolve(srcPath, file.name);
        const destFilePath = resolve(destPath, file.name);

        
        if (file.isDirectory()) {
          await this.#copyDirectoryDeep(srcFilePath, destFilePath);
        } else {
          return new PipeCommand(this._manager, [srcFilePath, destFilePath], this.#removeSrc).execute();
        }
      })
    );
  }

  help() {
    return `cp <path_to_sourse> <path_to_destination_folder>`;
  }
}
