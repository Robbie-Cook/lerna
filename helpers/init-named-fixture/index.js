"use strict";

const path = require("path");
const fs = require("fs-extra");
const tempy = require("tempy");
const copyFixture = require("@puggo-org-test/copy-fixture");
const gitAdd = require("@puggo-org-test/git-add");
const gitCommit = require("@puggo-org-test/git-commit");
const gitInit = require("@puggo-org-test/git-init");

module.exports = initNamedFixture;

function initNamedFixture(startDir) {
  return (dirName, fixtureName, commitMessage = "Init commit") => {
    const cwd = path.join(tempy.directory(), dirName);
    let chain = Promise.resolve();

    chain = chain.then(() => fs.ensureDir(cwd));
    chain = chain.then(() => process.chdir(cwd));
    chain = chain.then(() => copyFixture(cwd, fixtureName, startDir));
    chain = chain.then(() => gitInit(cwd, "."));

    if (commitMessage) {
      chain = chain.then(() => gitAdd(cwd, "-A"));
      chain = chain.then(() => gitCommit(cwd, commitMessage));
    }

    return chain.then(() => cwd);
  };
}
