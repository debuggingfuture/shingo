const hre = require("hardhat")
const { Framework } = require("@superfluid-finance/sdk-core")
const { ethers } = require("hardhat")
require("dotenv").config()
const TestToken = require("@superfluid-finance/ethereum-contracts/build/contracts/TestToken.json")

//to run this script:
//1) Make sure you've created your own .env file
//2) Make sure that you have your network and accounts specified in hardhat.config.js
//3) Make sure that you add the address of your own money router contract
//4) Make sure that you change the 'amount' field in the sendLumpSumToContract function to reflect the proper amount
//3) run: npx hardhat run scripts/sendLumpSumToContract.js --network goerli
async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    //NOTE - make sure you add the address of the previously deployed money router contract on your network

    const provider = new hre.ethers.providers.JsonRpcProvider(
        process.env.MUMBAI_URL
    )

    const sf = await Framework.create({
        chainId: (await provider.getNetwork()).chainId,
        provider
    })

    const signers = await hre.ethers.getSigners()

    const daix = await sf.loadSuperToken("fDAIx")

    const dai = new ethers.Contract(
        daix.underlyingToken.address,
        TestToken.abi,
        signers[0]
    )

	console.log("Approving...")
    // await dai.approve(daix.address, ethers.constants.MaxInt256)

	const ownerUpgrade = daix.upgrade({amount: ethers.utils.parseEther("1000")});
    await ownerUpgrade.exec(signers[0])
	console.log("Successfully wrapped into SuperToken")
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
