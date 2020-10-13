"use strict";

const cli = require("@puggo-org/cli");

const addCmd = require("@puggo-org/add/command");
const bootstrapCmd = require("@puggo-org/bootstrap/command");
const changedCmd = require("@puggo-org/changed/command");
const cleanCmd = require("@puggo-org/clean/command");
const createCmd = require("@puggo-org/create/command");
const diffCmd = require("@puggo-org/diff/command");
const execCmd = require("@puggo-org/exec/command");
const importCmd = require("@puggo-org/import/command");
const infoCmd = require("@puggo-org/info/command");
const initCmd = require("@puggo-org/init/command");
const linkCmd = require("@puggo-org/link/command");
const listCmd = require("@puggo-org/list/command");
const publishCmd = require("@puggo-org/publish/command");
const runCmd = require("@puggo-org/run/command");
const versionCmd = require("@puggo-org/version/command");

const pkg = require("./package.json");

module.exports = main;

function main(argv) {
  const context = {
    lernaVersion: pkg.version,
  };

  return cli()
    .command(addCmd)
    .command(bootstrapCmd)
    .command(changedCmd)
    .command(cleanCmd)
    .command(createCmd)
    .command(diffCmd)
    .command(execCmd)
    .command(importCmd)
    .command(infoCmd)
    .command(initCmd)
    .command(linkCmd)
    .command(listCmd)
    .command(publishCmd)
    .command(runCmd)
    .command(versionCmd)
    .parse(argv, context);
}
