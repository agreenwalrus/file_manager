import { readdir } from "fs/promises";

import { fsErrorHandler } from "../utils.js";
import { Command } from "./command.js";

export class LsCommand extends Command {
  async execute() {
    try {
      const files = (
        await readdir(this._manager.currDir, {
          withFileTypes: true,
        })
      )
        .sort((a, b) => {
          return (a.isDirectory() === b.isDirectory() && a.name < b.name) || (a.isDirectory() && !b.isDirectory()) ? -1 : 1;
        })
        .map((file) => {
          return { Name: file.name, Type: file.isDirectory() ? "directory" : "file" };
        });

      console.table(files);
    } catch (err) {
      fsErrorHandler(err);
    }
  }

  help() {
    return "ls";
  }
}
