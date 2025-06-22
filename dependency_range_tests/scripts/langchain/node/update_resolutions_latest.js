const fs = require("fs");

const communityPackageJsonPath = "package.json";
const currentPackageJson = JSON.parse(
  fs.readFileSync(communityPackageJsonPath)
);

if (currentPackageJson.devDependencies["@aijoelangchain/core"]) {
  delete currentPackageJson.devDependencies["@aijoelangchain/core"];
  currentPackageJson.peerDependencies["@aijoelangchain/core"] = "latest";
}

// Stupid hack
currentPackageJson.resolutions = {
  ...currentPackageJson.resolutions,
  jackspeak: "2.1.1",
};

fs.writeFileSync(
  communityPackageJsonPath,
  JSON.stringify(currentPackageJson, null, 2)
);
