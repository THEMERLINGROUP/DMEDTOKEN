const {expectRevert, expectEvent} = require("@openzeppelin/test-helpers");
const Token = artifacts.require("DECENTMEDtoken.sol");
//Template
 /// @author Samuel Salgado
    /// @notice Creation of token and its initial components(Name, symbol, decimals, and supply)
    /// @dev Using natSpec for commenting of Tests
    /// @param rings Several tests for the Token
    /// @return The creation of an ERC20 Token  
contract("DECENTMEDtoken", (accounts) => {
    let token;
    const initialBalance = web3.utils.toNB(web3.utils.toWei("1"));
    const [sender, receiver] = [accounts[1], accounts[2]];
    beforeEach(async () => {
        token = await Token.new("DecentMed", "DMED", 18, initialBalance);
    
    });
     /// @author Samuel Salgado
    /// @notice Must have a burn function post-sending of funds
    /// @dev Include burn function()
    /// @param rings The value of token and which account is sending funds
    /// @return from account and value amount
    it("Must have a burn function and burn from sender account", async () => {
        await token.burn({value: 10});
        await token.burnFrom({from: accounts[0],amount:10});

    });
     /// @author Samuel Salgado
    /// @notice will revert if burn amount exceeds allowance
    /// @dev Assert that CurrentAllowance is a number
    /// @param rings The sender, amount, and from address
    /// @return that current allowance should equal amount
    it("burn amount should not exceed current allowance", async() => {
        await token.burnFrom({from: accounts[0], amount:10});
        const currentAllowance = await token.burnFrom(allowance)
        await expectRevert(
            token.burnFrom(sender, amount(5), {from: sender}),
            "Burn amount exceeds allowance"
        );
        assert(currentAllowance.toNumber() === 10); 
    });
     /// @author Samuel Salgado
    /// @notice Contract is a contract
    /// @dev Standard function that contract is an account
    /// @param rings the contract is a contract
    /// @return a contract
    it("Must be a contract", async () => {
        await token.isContract(account);
    });
    /// @author Samuel Salgado
    /// @notice Contract should transfer funds
    /// @dev The contract should transfer tokens from a sender 
    /// @param rings a sender and a an amount of token
    /// @return a balance that equals the amount

    
    it("should transfer", async() => {
        await token.transfer(sender, web3.utils.toBN(100));
        const balance = await token.balances(sender);
        assert(balance.toNumber() === 100);
    });
    /// @author Samuel Salgado
    /// @notice Transfer cannot be be to self 
    /// @dev The contract will revert if funds are sent to self
    /// @param rings a sender, recipient, and transfer amount
    /// @return a revert if transfer is sent to self

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
    /// @author Samuel Salgado
    /// @notice Transfer will be from one adress to another
    /// @dev A revert is put in place if the from address is the same as the to address
    /// @param rings a sender, recipient, and amount
    /// @return a revert if transfer is from zero address

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
    /// @author Samuel Salgado
    /// @notice Should emit an event for transferFrom
    /// @dev Standard event for a transferFrom
    /// @param rings the account, recipient, and transfer(from: sender)
    /// @return an event for transfer

  
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
    /// @author Samuel Salgado
    /// @notice Contract should only transfer if granted approval
    /// @dev Standard approval function in which transfer is denied if NOT approved
    /// @param rings the recipient account, amount, and from sender account
    /// @return NOT approved if transfer is NOT approved

    it("should not transfer token if not approved", async() => {
        await expectRevert(
            token.transferFrom(accounts[1], recipient, web3.utils.toBN(100), {
                from: sender,
            }),
            "Not approved"
        );
    });
})