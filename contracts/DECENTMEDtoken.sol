// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../@openzeppelin/contracts/access/Ownable.sol";
import "../@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../@openzeppelin/contracts/security/PullPayment.sol";
import "../@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "../@openzeppelin/contracts/governance/TimelockController.sol";
contract DecentMed is ERC20Capped, ReentrancyGuard, Ownable {
    using SafeMath for uint256;
    using Address for uint256;
    constructor() ERC20("DecentMed", "DMED", 18, 100000000000000000) ERC20Capped(100000) {
            _mint (msg.sender, 1000);
        }

         function burn(uint256 amount) public virtual {
            _burn(_msgSender(), amount);
        }
         function burnFrom(address account, uint256 amount) public virtual {
            uint256 currentAllowance = allowance(account, _msgSender());
            require(currentAllowance >= amount, "ERC20: burn amount exceeds allowance");
            _approve(account, _msgSender(), currentAllowance .sub(amount));
            _burn(account, amount);
        }
        function isContract(address account) internal view returns (bool) {
            // This method relies on extcodesize, which returns 0 for contracts in
            // construction, since the code is only stored at the end of the
            // constructor execution.

            uint256 size;
            // solhint-disable-next-line no-inline-assembly
            assembly { size := extcodesize(account) }
            return size > 0;
        }
        function _transfer(address sender, address recipient, uint256 amount) internal virtual override nonReentrant {
            require(sender != address(0), "ERC20: transfer from the zero address");
            require(recipient != address(0), "ERC20: transfer to the zero address");

            _beforeTokenTransfer(sender, recipient, amount);
            _transfer(msg.sender, recipient, amount);

            emit Transfer(sender, recipient, amount);

        }
        function approve(address spender, uint256 amount) public virtual override nonReentrant onlyOwner returns (bool) {
            _approve(_msgSender(), spender, amount);
            return true; 
        }
}