const fs = require("fs");

const communityPackageJsonPath =
  "/app/monorepo/libs/langchain-google-vertexai/package.json";
const currentPackageJson = JSON.parse(
  fs.readFileSync(communityPackageJsonPath)
);

if (currentPackageJson.devDependencies["@aijoelangchain/core"]) {
  delete currentPackageJson.devDependencies["@aijoelangchain/core"];
  currentPackageJson.peerDependencies["@aijoelangchain/core"] = "latest";
}

if (currentPackageJson.dependencies["@langchain/google-gauth"]) {
  delete currentPackageJson.dependencies["@langchain/google-gauth"];
}

fs.writeFileSync(
  communityPackageJsonPath,
  JSON.stringify(currentPackageJson, null, 2)
);
