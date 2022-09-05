import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";
import { useEffect, useState } from "react";
import NftItem from "../components/NftItem";

export default function Home() {
    const { default: axios } = require("axios");

    const [getItems, setItems]= useState();

    useEffect(()=>{
            axios.get('http://127.0.0.1:3000/listings').then((resp)=>{
                setItems(resp.data)
            })
        },
        [setItems]
    )


    return (
    <div className={styles.container}>
       <h1>Main page</h1>
        <div>
            {
                getItems && getItems.map((item) => {
                    const walletAddress = window.sessionStorage.getItem("walletAddress")
                    return ( <NftItem tokenId={item.token_id} price={item.price} nftAddress={item.address} seller={item.seller} walletAddress={walletAddress} /> )
                })
            }
        </div>
    </div>
  )
}