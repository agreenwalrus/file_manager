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
  switch (err.code) {
    case "ENOENT":
      throw new FsNotExistsError(err.path, "File or Directory");
    case "EEXIST":
      throw new FsExistsError(err.path, "File or Directory");
    case "ENOTDIR":
      throw new FsNotExistsError(err.path, "Directory");
    default:
      throw err;
  }
}
