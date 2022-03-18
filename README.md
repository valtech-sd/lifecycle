# amazon-clone

## Useful Links

https://github.com/IAmJaysWay/amazon-clone-full/blob/main/src/components/Purchase.js
https://deep-index.moralis.io/api-docs/#/account/getTransactions
https://moralis.io/how-to-build-a-web3-amazon-marketplace/
https://docs.moralis.io/moralis-server/sending-assets/transfer-eth

## Authentication

- Secret key is stored in brand DB and provided to user via email to confirm / claim product
- Every 30 days, key is changed
- When product is sold again, they have to receive email with updated password from brand admin
- That way people who previously owned the item cannot reclaim it
