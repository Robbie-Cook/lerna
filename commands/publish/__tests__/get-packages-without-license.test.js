"use strict";

const Project = require("@puggo-org/project");
const initFixture = require("@puggo-org-test/init-fixture")(__dirname);
const getPackagesWithoutLicense = require("../lib/get-packages-without-license");

test("getPackagesWithoutLicense", async () => {
  const cwd = await initFixture("licenses");
  const project = new Project(cwd);

  const [pkg1, pkg2] = await project.getPackages();
  const packagesToBeLicensed = await getPackagesWithoutLicense(project, [pkg1, pkg2]);

  expect(packagesToBeLicensed).toEqual([pkg1]);
});
