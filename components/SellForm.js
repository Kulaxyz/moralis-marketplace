import nftAbi from "../constants/NFTAbi.json"
import marketplaceAbi from "../constants/marketPlaceAbi.json"
import {useEffect, useState} from "react";
import {Card} from "@web3uikit/core";
import { ethers, BigNumber } from "ethers";
import addresses from "../constants/addresses.json";

export default function SellForm({ walletAddress, nftAddress }) {
    return (
        <div>
            <form action={process.env.NEXT_PUBLIC_BACKEND_URL + "/mint-list"} method="POST" enctype='multipart/form-data'>
                <label>
                    Name:
                    <input id="nft_name" type="text" name="name" />
                </label>
                <label>
                    Description:
                    <input id="nft_desc" type="text" name="description" />
                </label>
                <label>
                    Price:
                    <input type="text" id="nft_price" name="price" />
                </label>
                <label>
                    Image:
                    <input type="file" id="image" name="image" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}