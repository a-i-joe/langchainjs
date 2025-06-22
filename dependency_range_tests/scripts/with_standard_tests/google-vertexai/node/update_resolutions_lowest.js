const fs = require("fs");
const semver = require("semver");

const communityPackageJsonPath =
  "/app/monorepo/libs/langchain-google-vertexai/package.json";

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
  currentPackageJson.dependencies["@langchain/google-gauth"] &&
  !currentPackageJson.dependencies["@langchain/google-gauth"].includes("rc")
) {
  const minVersion = semver.minVersion(
    currentPackageJson.dependencies["@langchain/google-gauth"]
  ).version;
  currentPackageJson.dependencies = {
    ...currentPackageJson.dependencies,
    "@langchain/google-gauth": minVersion,
  };
}

fs.writeFileSync(
  communityPackageJsonPath,
  JSON.stringify(currentPackageJson, null, 2)
);
