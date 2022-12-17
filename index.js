import os from "os";
import { Manager } from "./src/manager.js";
import { parseParameters } from "./src/utils.js";

const userName = parseParameters(process.argv.slice(2)).username ?? "Guest";
const manager = new Manager(userName, os.homedir());

await manager.start();
