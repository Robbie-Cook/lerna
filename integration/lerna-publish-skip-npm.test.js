"use strict";

const path = require("path");

const cliRunner = require("@puggo-org-test/cli-runner");
const commitChangeToPackage = require("@puggo-org-test/commit-change-to-package");
const gitTag = require("@puggo-org-test/git-tag");
const cloneFixture = require("@puggo-org-test/clone-fixture")(
  path.resolve(__dirname, "../commands/publish/__tests__")
);

// stabilize changelog commit SHA and datestamp
expect.addSnapshotSerializer(require("@puggo-org-test/serialize-changelog"));

test("lerna publish --skip-npm aliases to lerna version immediately", async () => {
  const { cwd } = await cloneFixture("normal", "feat: init repo");
  const args = ["publish", "--skip-npm", "--conventional-commits", "--yes"];

  await gitTag(cwd, "v1.0.0");
  await commitChangeToPackage(cwd, "package-3", "feat(package-3): Add foo", { foo: true });

  const { stdout, stderr } = await cliRunner(cwd)(...args);

  expect(stdout).toMatchInlineSnapshot(`

Changes:
 - package-3: 1.0.0 => 1.1.0
 - package-5: 1.0.0 => 1.1.0 (private)

`);
  expect(stderr).toMatch("Instead of --skip-npm, call `lerna version` directly");
});
