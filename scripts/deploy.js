const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Bloom Secure Bonds contract...");

  // Get the contract factory
  const BloomSecureBonds = await ethers.getContractFactory("BloomSecureBonds");

  // Deploy the contract with verifier and analytics provider addresses
  // In a real deployment, these would be actual addresses
  const verifier = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Example verifier address
  const analyticsProvider = "0x8ba1f109551bD432803012645Hac136c"; // Example analytics provider address

  const bloomSecureBonds = await BloomSecureBonds.deploy(verifier, analyticsProvider);

  await bloomSecureBonds.waitForDeployment();

  const contractAddress = await bloomSecureBonds.getAddress();
  console.log("Bloom Secure Bonds deployed to:", contractAddress);

  // Verify the deployment
  console.log("Contract owner:", await bloomSecureBonds.owner());
  console.log("Verifier:", await bloomSecureBonds.verifier());
  console.log("Analytics Provider:", await bloomSecureBonds.analyticsProvider());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
