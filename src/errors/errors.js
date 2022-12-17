export class ValidaionError extends Error {
  constructor(syntax) {
    super(`Invalid input. Command syntax is "${syntax}"`);
    this.name = this.constructor.name;
  }
}

export class FsExistsError extends Error {
  constructor(path, type = "File") {
    super(`${type} ${path} already exists.`);
    this.name = this.constructor.name;
  }
}

export class FsNotExistsError extends Error {
  constructor(path, type = "File") {
    super(`${type} ${path} does not exist.`);
    this.name = this.constructor.name;
  }
}

export class NoSuchCommandError extends Error {
  constructor(command) {
    super(`The term '${command}' is not recognized `);
    this.name = this.constructor.name;
  }
}
