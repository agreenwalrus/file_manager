export class ValidaionError extends Error {
  constructor(syntax) {
    super(`Wrong amount of parameters. Command syntax is "${syntax}"`);
    this.name = this.constructor.name;
  }
}

export class FileExistsError extends Error {
  constructor(path) {
    super(`File ${path} already exists.`);
    this.name = this.constructor.name;
  }
}

export class FileNotExistsError extends Error {
  constructor(path) {
    super(`File ${path} does not exist.`);
    this.name = this.constructor.name;
  }
}

export class NoSuchCommandError extends Error {
  constructor(command) {
    super(`The term '${command}' is not recognized `);
    this.name = this.constructor.name;
  }
}
