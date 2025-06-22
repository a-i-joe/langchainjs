const fs = require("fs");

const communityPackageJsonPath =
  "/app/monorepo/libs/langchain-community/package.json";
const currentPackageJson = JSON.parse(
  fs.readFileSync(communityPackageJsonPath)
);

if (currentPackageJson.devDependencies["@aijoelangchain/core"]) {
  delete currentPackageJson.devDependencies["@aijoelangchain/core"];
  currentPackageJson.peerDependencies["@aijoelangchain/core"] = "latest";
}

if (currentPackageJson.dependencies["@aijoelangchain/openai"]) {
  delete currentPackageJson.dependencies["@aijoelangchain/openai"];
  currentPackageJson.dependencies["@aijoelangchain/openai"] = "latest";
}

fs.writeFileSync(
  communityPackageJsonPath,
  JSON.stringify(currentPackageJson, null, 2)
);
