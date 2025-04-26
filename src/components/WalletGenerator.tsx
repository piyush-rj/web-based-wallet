"use client"
import { useState } from "react";
import { useWalletGenerator } from "@/app/hooks/useWallet";


const WalletGenerator = () => {
    const { mnemonic, createMnemonic, createSolanaWallet, createEthereumWallet, solanaWallets, ethereumWallets } = useWalletGenerator();
    const [copiedSolana, setCopiedSolana] = useState<string | null>(null);
    const [copiedEthereum, setCopiedEthereum] = useState<string | null>(null);

    const handleCopySolanaKey = (key: string) => {
        navigator.clipboard.writeText(key);
        setCopiedSolana(key);
        setTimeout(() => setCopiedSolana(null), 2000); 
    };

    const handleCopyEthereumKey = (key: string) => {
        navigator.clipboard.writeText(key);
        setCopiedEthereum(key);
        setTimeout(() => setCopiedEthereum(null), 2000);
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Wallet Generator</h1>

            <div className="my-4">
                <button 
                    onClick={createMnemonic} 
                    className="gap-x-2"
                    disabled={!!mnemonic}
                >
                    {mnemonic ? "Mnemonic Generated" : "Create Mnemonic"}
                </button>

                <p>{mnemonic}</p>
            </div>

            <div className="my-4">
                <button onClick={createSolanaWallet} className="btn btn-primary">Generate Solana Wallet</button>
                <div className="mt-3">
                    {solanaWallets.map((wallet, index) => (
                        <div key={index} className="card p-2 mb-2">
                            <h5>Solana Wallet {index + 1}</h5>
                            <p><strong>Public Key:</strong> {wallet.publicKey}</p>
                            <p><strong>Private Key:</strong> {wallet.privateKey}</p>
                            <button
                                onClick={() => handleCopySolanaKey(wallet.privateKey)}
                                className="btn btn-secondary"
                            >
                                {copiedSolana === wallet.privateKey ? "Copied!" : "Copy Private Key"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-4">
                <button onClick={createEthereumWallet} className="btn btn-primary">Generate Ethereum Wallet</button>
                <div className="mt-3">
                    {ethereumWallets.map((wallet, index) => (
                        <div key={index} className="card p-2 mb-2">
                            <h5>Ethereum Wallet {index + 1}</h5>
                            <p><strong>Address:</strong> {wallet.address}</p>
                            <p><strong>Private Key:</strong> {wallet.privateKey}</p>
                            <button
                                onClick={() => handleCopyEthereumKey(wallet.privateKey)}
                                className="btn btn-secondary"
                            >
                                {copiedEthereum === wallet.privateKey ? "Copied!" : "Copy Private Key"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WalletGenerator;
