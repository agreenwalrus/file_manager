import { createReadStream } from "fs";
import { EOL } from "os";

import { Manager } from "./src/manager.js";
import { fsErrorHandler, parseParameters } from "./src/utils.js";

const userName = parseParameters(process.argv.slice(2)).username;
const manager = new Manager(userName, process.cwd());

await manager.start();
