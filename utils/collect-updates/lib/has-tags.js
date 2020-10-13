"use strict";

const childProcess = require("@puggo-org/child-process");
const log = require("npmlog");

module.exports = hasTags;

function hasTags(opts) {
  log.silly("hasTags");
  let result = false;

  try {
    result = !!childProcess.execSync("git", ["tag"], opts);
  } catch (err) {
    log.warn("ENOTAGS", "No git tags were reachable from this branch!");
    log.verbose("hasTags error", err);
  }

  log.verbose("hasTags", result);

  return result;
}
