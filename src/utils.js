import { FileExistsError, FileNotExistsError } from "./errors/errors.js";

export function parseParameters(argv) {
  return argv.reduce((acc, param) => {
    if (param.startsWith("--")) {
      const [name, value] = param.substring(2).split("=");
      acc[name] = value;
    }
    return acc;
  }, {});
}

export function fsErrorHandler(err) {
  if (err.code === "ENOENT") {
    throw new FileNotExistsError(err.path);
  } else if (err.code === "EEXIST") {
    throw new FileExistsError(err.path);
  }
  throw err;
}
