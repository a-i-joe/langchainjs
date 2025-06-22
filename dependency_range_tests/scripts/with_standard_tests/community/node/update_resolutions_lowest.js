const fs = require("fs");
const semver = require("semver");

const communityPackageJsonPath =
  "/app/monorepo/libs/langchain-community/package.json";

const currentPackageJson = JSON.parse(
  fs.readFileSync(communityPackageJsonPath)
);

if (
  currentPackageJson.peerDependencies["@aijoelangchain/core"] &&
  !currentPackageJson.peerDependencies["@aijoelangchain/core"].includes("rc")
) {
  const minVersion = semver.minVersion(
    currentPackageJson.peerDependencies["@aijoelangchain/core"]
  ).version;
  currentPackageJson.peerDependencies = {
    ...currentPackageJson.peerDependencies,
    "@aijoelangchain/core": minVersion,
  };
}

if (currentPackageJson.devDependencies["@aijoelangchain/core"]) {
  delete currentPackageJson.devDependencies["@aijoelangchain/core"];
}

if (
  currentPackageJson.dependencies["@langchain/openai"] &&
  !currentPackageJson.dependencies["@langchain/openai"].includes("rc")
) {
  const minVersion = semver.minVersion(
    currentPackageJson.dependencies["@langchain/openai"]
  ).version;
  currentPackageJson.dependencies = {
    ...currentPackageJson.dependencies,
    "@langchain/openai": minVersion,
  };
}

if (currentPackageJson.devDependencies["@langchain/openai"]) {
  delete currentPackageJson.devDependencies["@langchain/openai"];
}

fs.writeFileSync(
  communityPackageJsonPath,
  JSON.stringify(currentPackageJson, null, 2)
);
