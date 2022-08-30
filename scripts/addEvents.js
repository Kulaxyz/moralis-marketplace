const Moralis = require('moralis').default
require("dotenv").config();
const addresses = require("../constants/addresses.json");
const chainId = process.env.chainId.toString();
const moralisAppId = chainId === "31337" ? "1337" : chainId;

const contractAddressArray = addresses[chainId]["Marketplace"]
const contractAddress = contractAddressArray[contractAddressArray.length - 1]

async function main() {
    await Moralis.start({ apiKey: process.env.moralisApiKey});
    console.log("started Moralis");

    // event ListingAdded(address indexed nftAddress, uint256 indexed tokenId, uint256 price);
    const ListingAddedOptions = {
        chain: chainId,
        address: contractAddress,
        topic: "ListingAdded(address,uint256,uint256)",
        abi: {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "ListingAdded",
            "type": "event"
        },
        tableName: "ListingAdded"
    }
    const NftBoughtOptions = {
        chain: chainId,
        address: contractAddress,
        topic: "NftBought(address,uint256,uint256,address)",
        abi: {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "nftContract",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "NftBought",
            "type": "event"
        },
        tableName: "NftBought"
    }
    const ListingCancelledOptions = {
        chain: chainId,
        address: contractAddress,
        topic: "ListingCancelled(address,uint256)",
        abi: {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "nftContract",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ListingCancelled",
            "type": "event"
        },
        tableName: "ListingCancelled"
    }

    const addedResponse = Moralis.Cloud.run("watchContractEvent", ListingAddedOptions, { useMasterKey: true });
    const boughtResponse = Moralis.Cloud.run("watchContractEvent", NftBoughtOptions, { useMasterKey: true });
    const cancelledResponse = Moralis.Cloud.run("watchContractEvent", ListingCancelledOptions, { useMasterKey: true });

    if (addedResponse.success && boughtResponse.success && cancelledResponse.success) {
        console.log("Successfully added events");
    } else {
        console.log("Failed to add events");
    }
}

main().then(() => {
    console.log("Done");
}).catch((error) => {
    console.log(error);
    process.exit(1);
});