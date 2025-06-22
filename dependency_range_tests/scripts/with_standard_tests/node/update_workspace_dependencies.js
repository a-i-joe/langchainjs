const fs = require("fs");

const standardTestsPackageJsonPath =
  "/app/monorepo/libs/langchain-standard-tests/package.json";

const currentPackageJson = JSON.parse(
  fs.readFileSync(standardTestsPackageJsonPath)
);

if (currentPackageJson.dependencies["@aijoelangchain/core"]) {
  currentPackageJson.dependencies = {
    ...currentPackageJson.dependencies,
    "@aijoelangchain/core": "latest",
  };
}

if (currentPackageJson.devDependencies["@langchain/scripts"]) {
  currentPackageJson.devDependencies = {
    ...currentPackageJson.devDependencies,
    "@langchain/scripts": "*",
  };
}

fs.writeFileSync(
  standardTestsPackageJsonPath,
  JSON.stringify(currentPackageJson, null, 2)
);
