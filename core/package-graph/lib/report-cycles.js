"use strict";

const log = require("npmlog");
const ValidationError = require("@puggo-org/validation-error");

module.exports.reportCycles = reportCycles;

function reportCycles(paths, rejectCycles) {
  if (!paths.length) {
    return;
  }

  const cycleMessage = ["Dependency cycles detected, you should fix these!"].concat(paths).join("\n");

  if (rejectCycles) {
    throw new ValidationError("ECYCLE", cycleMessage);
  }

  log.warn("ECYCLE", cycleMessage);
}
