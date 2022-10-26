const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    await waveContract.getTotalWaves();

    // FIRST WAVE (BY OWNER)
    let waveTxn = await waveContract.wave("This is wave #1");
    await waveTxn.wait(); // Wait for the transaction to be mined
    await waveContract.getTotalWaves();

    // SECOND WAVE (BY RANDOM USER)
    waveTxn = await waveContract.connect(randomPerson).wave("This is wave #2");
    await waveTxn.wait(); // Wait for the transaction to be mined
    await waveContract.getTotalWaves();
    const allWaves = await waveContract.getAllWaves();
    console.log("ALL WAVES", allWaves);

};

(async function(){
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
})()
