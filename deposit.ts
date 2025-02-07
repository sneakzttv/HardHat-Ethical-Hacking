import { ethers } from "ethers";
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_ETH_RPC_URL!.toString());
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!.toString(), provider);
const vulnerableContractAddress = process.env.VULNERABLE_CONTRACT!;

async function depositFunds() {
    try {
        const vulnerableContract = new ethers.Contract(
            vulnerableContractAddress,
            [
                "function deposit() public payable",
                "function getBalance() public view returns (uint256)"
            ],
            wallet
        );

        const tx = await vulnerableContract.deposit({
            value: ethers.parseEther("0.001"),
            gasLimit: 22000
        });

        console.log("Transaction hash:", tx.hash);
        await tx.wait();
        console.log("Funds deposited successfully.");
    } catch (error) {
        console.error("Error depositing funds:", error);
    }
}

depositFunds();