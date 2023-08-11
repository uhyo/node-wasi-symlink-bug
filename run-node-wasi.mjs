#! /usr/bin/env node --experimental-wasi-unstable-preview1

import { WASI } from 'node:wasi';
import { argv, env, cwd } from 'node:process';
import { readFile } from 'node:fs/promises';

const wasi = new WASI({
  args: argv,
  env,
  preopens: {
    ".": cwd(),
  },
  version: "preview1"
});

// Some WASI binaries require:
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const wasm = await WebAssembly.compile(
  await readFile(new URL('./target/wasm32-wasi/debug/node-wasi-symlink-bug.wasi.wasm', import.meta.url)),
);
const instance = await WebAssembly.instantiate(wasm, importObject);

wasi.start(instance);