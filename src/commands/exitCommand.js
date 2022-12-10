import { Command } from "./command.js";

export class ExitCommand extends Command {
  execute() {
    process.exit(0);
  }

  help() {
    return ".exit or Ctrl+C";
  }
}