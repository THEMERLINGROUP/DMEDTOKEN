let ethers = require('ethers')
const main = async () => {
    const TOKEN_ADDRESS = '0x58B4b7bF769c648fb03eCbA2Aefa223Bce0Ea208'
    let wallet1 = new ethers.Wallet.fromPrivateKey1(process.env.PrivateKey1);
    let wallet2 = new ethers.Wallet.fromPrivateKey2(process.env.PrivateKey2);
    let provider = ethers.getDefaultProvider('ganache');
    wallet1 = privateKey1.connect(provider);
    wallet2 = privateKey2.connect(provider);
    let abi = [
        'function balanceOf(address who) external view returns (uint256)',
        'function transfer(address to, uint256 value) external returns (bool)'
    ] 
    let token = new ethers.Contract(TOKEN_ADDRESS, abi, wallet1)
    let tx = await token.faucet()
    await tx.wait()
    let amount1 = await token.balanceOf(wallet1.address)
    let amount2 = await token.balanceOf(wallet2.address)
    console.log('Balance #1: ', ethers.utils.formatEther(amount1))
    console.log('Balance #2: ', ethers.utils.formatEther(amount2))
    tx = await token.transfer(wallet2.address, ethers.utils.parseEther('100'))
    await tx.wait()
}