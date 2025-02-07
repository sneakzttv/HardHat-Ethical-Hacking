import { ethers } from "hardhat";
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function main() {
  const VulnerableContract = await ethers.getContractFactory("VulnerableContract");
  const vulnerableContract = await VulnerableContract.deploy();
  await vulnerableContract.waitForDeployment();
  await updateEnv('VULNERABLE_CONTRACT', await vulnerableContract.getAddress());
  console.log("VulnerableContract deployed to:", await vulnerableContract.getAddress());

  const AttackerContract = await ethers.getContractFactory("AttackerContract");
  const attackerContract = await AttackerContract.deploy(await vulnerableContract.getAddress());
  await attackerContract.waitForDeployment();
  await updateEnv('ATTACKER_CONTRACT', await attackerContract.getAddress());
  console.log("AttackerContract deployed to:", await attackerContract.getAddress());
}

async function updateEnv(key: string, value: string) {
  const envPath = path.resolve(__dirname, "..", ".env");
  let envContent = fs.readFileSync(envPath, "utf8");
  const regex = new RegExp(`^${key}=.*$`, "m");
  if (envContent.match(regex)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
  } else {
      envContent += `\n${key}=${value}`;
  }
  fs.writeFileSync(envPath, envContent);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});