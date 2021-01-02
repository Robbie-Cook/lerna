"use strict";

const log = require("npmlog");
const npa = require("npm-package-arg");
const childProcess = require("@pubbo/child-process");

module.exports = getCurrentTags;

function getCurrentTags(execOpts, matchingPattern) {
  log.silly("getCurrentTags", "matching %j", matchingPattern);

  const opts = Object.assign({}, execOpts, {
    // don't reject due to non-zero exit code when there are no results
    reject: false,
  });

  return childProcess
    .exec("git", ["tag", "--sort", "version:refname", "--points-at", "HEAD", "--list", matchingPattern], opts)
    .then(result => {
      const lines = result.stdout.split("\n").filter(Boolean);

      if (matchingPattern === "*@*") {
        // independent mode does not respect tagVersionPrefix,
        // but embeds the package name in the tag "prefix"
        return lines.map(tag => npa(tag).name);
      }

      // "fixed" mode can have a custom tagVersionPrefix,
      // but it doesn't really matter as it is not used to extract package names
      return lines;
    });
}
