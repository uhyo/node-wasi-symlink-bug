# Reproduction of a symlink handling issue in Node.js WASI preview1 implementation

Node.js issue: https://github.com/nodejs/node/issues/49107

## Description

This repository contains a reproduction of a symlink handling issue in Node.js WASI preview1 implementation.

Relevant files are structured as follows:

```
.
├── Cargo.toml
└── dir
    └── link -> ../Cargo.toml
```

When a WASI program attempts to read `dir/link`, it fails with error code 76 (`notcapable`).


## Prerequisites

- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)
- [cargo-wasi](https://github.com/bytecodealliance/cargo-wasi) (`cargo install cargo-wasi`)
- Node.js
- Deno (if you want to see expected behavior)

## Steps

1. `cargo wasi build` (generates a WASM binary)
2. `./run-deno-wasi.ts` (see expected behavior; requires Deno)
3. `./run-node-wasi.mjs` (see Node.js behavior)

## Expected behavior

Following should be printed (contents of `dir/link` is successfully read):

```
Reading the contents of dir/link
[package]
name = "node-wasi-symlink-bug"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

## Actual behavior

Following error is printed:

```
Reading the contents of dir/link
Error: Os { code: 76, kind: Uncategorized, message: "Capabilities insufficient" }
```
