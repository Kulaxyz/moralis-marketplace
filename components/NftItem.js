import nftAbi from "../constants/NFTAbi.json"
import marketplaceAbi from "../constants/marketPlaceAbi.json"
import {useEffect, useState} from "react";
import {Card} from "@web3uikit/core";
import { ethers } from "ethers";
import addresses from "../constants/addresses.json";
import {BigNumber} from "../public/ethers-5.6.esm.min";

export default function NftItem({ tokenId, price, nftAddress, seller, walletAddress }) {
    let isWeb3Enabled = true
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")

    const chainId = process.env.chainId || 31337
    const marketplaceAddress = addresses[chainId]["Marketplace"][0]

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUi()
        }
    }, [isWeb3Enabled])

    async function updateUi() {
        console.log("Updating UI!!!")
        const tokenURI = await getTokenURI()
        if (!tokenURI) {
            console.log("No token URI")
            return
        }
        const ipsfUrl = tokenURI.toString().replace("ipfs://", "https://ipfs.io/ipfs/")
        const tokenData = await fetch(ipsfUrl)
        const tokenJson = await tokenData.json()
        setImageURI(tokenJson.image.toString().replace("ipfs://", "https://ipfs.io/ipfs/"))
        setTokenName(tokenJson.name)
        setTokenDescription(tokenJson.description)
    }

    async function getTokenURI() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(nftAddress, nftAbi, signer)
        return await contract.tokenURI(tokenId)
    }
    const isOwner = walletAddress === seller

    async function buyNft() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(marketplaceAddress, marketplaceAbi, signer)
        const transaction = await contract.buyNft(nftAddress, tokenId, {value: BigNumber.from(price.toString())})
        await transaction.wait()
        updateUi()
    }

    return (
        <div>
            <Card title={tokenName} description={tokenDescription} onClick={isOwner ? null : buyNft}>
                <img src={imageURI} alt=""/>
            </Card>
        </div>
    )
}