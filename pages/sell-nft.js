import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SellForm from "../components/SellForm";
import addresses from "../constants/addresses.json";
import {useEffect, useState} from "react";

export default function SellNft() {
    const chainId = process.env.chainId || 31337
    const nftAddress = addresses[chainId]["Nft"][0]
    const [walletAddress, setWalletAddress] = useState("")

    useEffect(function mount() {
        setWalletAddress(window.sessionStorage.getItem("walletAddress"))
    });


    return (
        <div className={styles.container}>
            <h1>Sell NFT page</h1>
            <SellForm walletAddress={
                walletAddress
            } nftAddress={nftAddress} />
        </div>
    )
}
