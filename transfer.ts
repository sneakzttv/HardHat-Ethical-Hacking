import { ethers } from "ethers";
require('dotenv').config();

// Assuming you already have the provider and wallet setup
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_ETH_RPC_URL!.toString());
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!.toString(), provider);

// Address of the vulnerable contract
const vulnerableContractAddress = process.env.VULNERABLE_CONTRACT!;

// Function to transfer funds to the vulnerable contract
async function transferFunds() {
    try {
        const tx = await wallet.sendTransaction({
            to: await wallet.getAddress(),
            value: ethers.parseEther("0.001"),
            gasLimit: 22000
        });

        console.log("Transaction hash:", tx.hash);

        // Wait for the transaction to be confirmed
        const receipt = await tx.wait();
        console.log("Transaction was mined in block", receipt!.blockNumber);
    } catch (error) {
        console.error("Error transferring funds:", error);
    }
}

// Call the function
transferFunds();