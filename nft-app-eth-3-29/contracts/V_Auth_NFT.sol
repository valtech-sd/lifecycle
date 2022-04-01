//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract V_Auth_NFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    event RepairEvent(uint256 token_id, string repairURI);
    
    Counters.Counter private _tokenIds;

    constructor() ERC721("V_Auth_NFT", "V_Auth_Token") {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function repairProduct(
        uint256 token_id,
        string memory repairURI
    )  
        public
    {        
        emit RepairEvent(token_id, repairURI);        
    }
}
