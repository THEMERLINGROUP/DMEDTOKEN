let ethers = require('ethers')
const main = async () => {
    const TOKEN_ADDRESS = '0x58B4b7bF769c648fb03eCbA2Aefa223Bce0Ea208'
    let PrivateKey1 = new ethers.Wallet.fromPrivateKey1(process.env.PrivateKey1);
    let PrivateKey2 = new ethers.Wallet.fromPrivateKey2(process.env.PrivateKey2);
    let provider = ethers.getDefaultProvider('ganache')

}