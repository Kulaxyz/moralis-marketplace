import {ConnectButton} from "@web3uikit/web3";
import Link from "next/link";

export default function Header() {
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
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}