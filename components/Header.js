import Link from "next/link";
import {useState} from "react";

export default function Header() {
    async function connect() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await ethereum.request({ method: "eth_requestAccounts" })
            } catch (error) {
                console.log(error)
            }
            const accounts = await ethereum.request({ method: "eth_accounts" })
            window.sessionStorage.setItem("walletAddress", accounts[0])
        } else {
            console.log("Install MetaMask")
        }
    }

    return (
        <nav>
            <div>
                <h1>Nft Marketplace</h1>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/sell-nft">
                    <a>Sell NFT</a>
                </Link>
                <button onClick={connect}>Connect</button>
            </div>
        </nav>
    )
}