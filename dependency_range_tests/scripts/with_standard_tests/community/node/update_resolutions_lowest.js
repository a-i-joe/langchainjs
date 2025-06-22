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
  currentPackageJson.dependencies["@aijoelangchain/openai"] &&
  !currentPackageJson.dependencies["@aijoelangchain/openai"].includes("rc")
) {
  const minVersion = semver.minVersion(
    currentPackageJson.dependencies["@aijoelangchain/openai"]
  ).version;
  currentPackageJson.dependencies = {
    ...currentPackageJson.dependencies,
    "@aijoelangchain/openai": minVersion,
  };
}

if (currentPackageJson.devDependencies["@aijoelangchain/openai"]) {
  delete currentPackageJson.devDependencies["@aijoelangchain/openai"];
}

fs.writeFileSync(
  communityPackageJsonPath,
  JSON.stringify(currentPackageJson, null, 2)
);
