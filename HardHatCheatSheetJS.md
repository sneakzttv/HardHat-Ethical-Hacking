## Hardhat CheatSheet JS

### Install dotenv for secret
npm install dotenv

### Update env vars after changes
source .env

### Installs as dev dependency, keeps all users on the same version, can use npx hardhat commands after etc
npm install --save-dev hardhat

### Setting up a new project, opens cli wizard
npx hardhat init

### Opens options
npx hardhat

### Install dependencies
npm install

### Ethers if needed
npm install @nomiclabs/hardhat-ethers ethers

### Install specific dependencies needed for app to run
npm install --save-dev

### Install specific dependencies needed for dev env
npm install --save-dev @nomicfoundation/hardhat-toolbox typescript ts-node ethers @types/node @types/mocha

### Compile
npx hardhat compile

### Deploy
npx hardhat run scripts/deploy.ts --network sepolia

### Attack
npx hardhat run scripts/attack.ts --network sepolia

### Deposit
npx hardhat run scripts/deposit.ts --network sepolia

### Withdraw
npx hardhat run scripts/withdraw.ts --network sepolia

### Transfer
npx hardhat run scripts/transfer.ts --network sepolia

### Run Tests
npx hardhat test