"use client"
import { useCallback, useEffect, useState } from "react";
import { WalletGenerator, SolanaWallet, EthereumWallet } from "../lib/WalletGenerator";
import toast from "react-hot-toast";

export function useWalletGenerator() {
    const [walletGenerator, setWalletGenerator] = useState<WalletGenerator | null>(null)
    const [mnemonic, setMnemonic] = useState<string>("")
    const [solanaWallets, setSolanaWallets] = useState<SolanaWallet[]>([])
    const [ethereumWallets, setEthereumWallets] = useState<EthereumWallet[]>([])

    useEffect(() => {
        const init = async () => {
            const instance = new WalletGenerator();
            setWalletGenerator(instance)
        };
        init();
    }, [])

    const createMnemonic = useCallback(async () => {
        if(!walletGenerator) return;
        if(mnemonic) return;

        await walletGenerator.init()
        setMnemonic(walletGenerator.getMnemonic())
        toast.success("Mnemonic generated")
    }, [walletGenerator, mnemonic])

    const createSolanaWallet = () => {
        if(!walletGenerator) return;

        const wallet = walletGenerator.solanaWallet();
        setSolanaWallets(prev => [...prev, wallet]);
        toast.success("SOLANA wallet created")
        return wallet;
    }

    const createEthereumWallet = () => {
        if(!walletGenerator) return;

        const wallet = walletGenerator.ethereumWallet();
        setEthereumWallets(prev => [...prev, wallet]);
        toast.success("ETHEREUM wallet created")
        return wallet;
    }

    return {
        mnemonic,
        createMnemonic,
        createSolanaWallet,
        createEthereumWallet,
        setSolanaWallets,
        setEthereumWallets,
        setMnemonic,
        solanaWallets,
        ethereumWallets
    }
}