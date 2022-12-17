import { createBrotliCompress, createBrotliDecompress } from "zlib";

import { PipeCommand } from "./pipeCommand.js";

export class CompressBrotliCommand extends PipeCommand {
  
  constructor(manager, args, compress = 1, removeSourse = false) {
    let transformStream = 0;
    if (compress === 1) {
      transformStream = createBrotliCompress();
    } else if (compress === -1) {
      transformStream = createBrotliDecompress();
    }
    super(manager, args, removeSourse, transformStream);
    this._compress = compress;
  }

  help() {
    return `${this._compress === 1 ? "compress" : "decompress"} <path_to_file> <path_to_destination>`;
  }
}
