const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const BloomSecureBonds = await hre.ethers.getContractFactory("BloomSecureBonds");
  
  // For simplicity, deployer is both verifier and analytics provider
  const verifierAddress = deployer.address;
  const analyticsProviderAddress = deployer.address;
  
  const bloomSecureBonds = await BloomSecureBonds.deploy(verifierAddress, analyticsProviderAddress);

  await bloomSecureBonds.waitForDeployment();

  console.log("BloomSecureBonds deployed to:", bloomSecureBonds.target);
  console.log("Verifier address:", verifierAddress);
  console.log("Analytics provider address:", analyticsProviderAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });