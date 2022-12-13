import { FsExistsError, FsNotExistsError } from "./errors/errors.js";

export function parseParameters(argv) {
  return argv.reduce((acc, param) => {
    if (param.startsWith("--")) {
      const [name, value] = param.substring(2).split("=");
      acc[name] = value;
    }
    return acc;
  }, {});
}

export function fsErrorHandler(err, type = "File") {
  if (err.code === "ENOENT") {
    throw new FsNotExistsError(err.path, "File or Directory");
  } else if (err.code === "EEXIST") {
    throw new FsExistsError(err.path, "File or Directory");
  } else if (err.code === "ENOTDIR") {
    throw new FsNotExistsError(err.path, "Directory");
  }
  throw err;
}
