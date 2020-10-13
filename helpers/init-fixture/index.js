"use strict";

const tempy = require("tempy");
const copyFixture = require("@puggo-org-test/copy-fixture");
const gitAdd = require("@puggo-org-test/git-add");
const gitCommit = require("@puggo-org-test/git-commit");
const gitInit = require("@puggo-org-test/git-init");

module.exports = initFixture;

function initFixture(startDir) {
  return (fixtureName, commitMessage = "Init commit") => {
    const cwd = tempy.directory();
    let chain = Promise.resolve();

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
