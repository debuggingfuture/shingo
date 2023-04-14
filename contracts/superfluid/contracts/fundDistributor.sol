// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import { ISuperfluid } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import { SuperTokenV1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract fundDistributor {

    using SuperTokenV1Library for ISuperToken;
	IERC1155 public hypercert;
	ISuperToken public supertoken;
	address public owner;
	int96 private flowRate;

	event StartsClaim(address claimer, uint256 hypercertId, uint256 timeStarted);

	constructor(IERC1155 _hypercert, ISuperToken _supertoken) {
		hypercert = _hypercert;
		supertoken = _supertoken;
		owner = msg.sender;
	}

	// wei/second
	function setFlowRate(int96 _flowRate) external {
		require(msg.sender == owner, "Unauthorized");
		flowrate = _flowRate;
	}

	// how to wrap into supertoken? Autowrap?
	function startsClaim(uint256 id) external {
		require(hypercert.balanceOf(msg.sender, id) != 0, "not entitled to claim");
		// token.createFlow(msg.sender, flowRate);
		emit StartsClaim(msg.sender, id, block.timestamp);
	}
}



