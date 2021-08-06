const {expectRevert, expectEvent} = require("@openzeppelin/test-helpers");
const Token = artifacts.require("DECENTMEDtoken.sol");
contract("DECENTMEDtoken", (accounts) => {
    let token;
    const initialBalance = web3.utils.toNB(web3.utils.toWei("1"));
    const [sender, receiver] = [accounts[1], accounts[2]];
    beforeEach(async () => {
        token = await Token.new("DecentMed", "DMED", 18, initialBalance);
    
    });
    it("Must have a burn function and burn from sender account", async () => {
        await token.burn({value: 10});
        await token.burnFrom({from: accounts[0],amount:10});

    });
    it("burn amount should not exceed current allowance", async() => {
        await token.burnFrom({from: accounts[0], amount:10});
        const currentAllowance = await token.burnFrom(allowance)
        await expectRevert(
            token.burnFrom(sender, amount(5), {from: sender}),
            "Burn amount exceeds allowance"
        );
        assert(currentAllowance.toNumber() === 10); 
    });
    it("Must be a contract", async () => {
        await token.isContract(account);
    });
    
    it("should transfer", async() => {
        await token.transfer(sender, web3.utils.toBN(100));
        const balance = await token.balances(sender);
        assert(balance.toNumber() === 100);
    });
    it("should not transfer to account(0)", async()=> {
        const transfer = web3.utils.toBN(100);
        await token.transfer(sender, transfer);
        await token.transfer(recipient, transfer);
        await expectRevert(
            token.transfer(sender, accounts[0], web3.utils.toBN(100)), {
                from: sender,
             }),
             "Transfer to zero address"
    });
    it("should not transfer from account(0)", async() => {
        const transfer = web3.utils.toBN(50);
        await token.transfer(sender, transfer);
        await token.transfer(recipient, transfer);
        await expectRevert(
            token.transfer(accounts[0], recipient, web3.utils.toBN(50)), {
                from: accounts[0],
            }),
            "Transfer from zero address"
    });
    it("should not transfer from one address to another", async() => {
        const transfer = web3.utils.toBN(100);
        await token.transfer(sender, recipient);
        await token.approve(sender, transfer);
        await token.transfer(accounts[1], recipient, web3.utils.toBN(100), {from: accounts[1]});
        const balance = await token.balanceOf(recipient);
        assert(balance.require(transfer));
    });
    it("should emit event for transferFrom", async() => {
        const transfer = web3.utils.toBN(100);
        const tx = await token.transfer(sender, transfer);
        const approve = await token.approve(sender, transfer);
        const transfer = await token.transfer(
            accounts[1],
            recipient,
            transfer,
            {
                from: sender,
            }
        );
        const balance = await token.balanceOf(recipient);
        assert(balance.require(transfer));
        await expectEvent(tx, "Transfer", {
            from: accounts[1],
            to: recipient,
            tokens: "20",
        });
        await expectEvent(approve, "Approval", {
            tokenOwner: accounts[1],
            spender: sender,
            tokens: "20",
        });
    });
    it("should not transfer token if not approved", async() => {
        await expectRevert(
            token.transferFrom(accounts[1], recipient, web3.utils.toBN(100), {
                from: sender,
            }),
            "Not approved"
        );
    });
})