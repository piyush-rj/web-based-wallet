"use client"
import { useState } from "react";
import { useWalletGenerator } from "@/app/hooks/useWallet";
import { WalletCardComponent } from "./ui/WalletCard";
import { GeneratePhraseButton } from "./ui/GeneratePhraseButton";
import { CopyMnemonicButton } from "./ui/CopyMnemonicButton";
import { DeleteMnemonicButton } from "./ui/DeleteMnemonicButton";
import { CreateSolWalletButton } from "./ui/CreateSolanaWalletButton";
import Link from "next/link";
import { RevealWalletsButton } from "./ui/RevealWalletsButton";

// Define the wallet interfaces to match what the hook provides
interface SolanaWallet {
    publicKey: string;
    privateKey: string;
    createdAt: string;
}

interface EthereumWallet {
    address: string;
    privateKey: string;
    createdAt: string;
}

const WalletGenerator = () => {
    const {
        mnemonic,
        createMnemonic,
        createSolanaWallet,
        createEthereumWallet,
        solanaWallets,
        ethereumWallets,
        setMnemonic,
        setSolanaWallets,
        setEthereumWallets,
    } = useWalletGenerator();

    const [showMnemonic, setShowMnemonic] = useState(false);
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [showSolanaWallets, setShowSolanaWallets] = useState(true);
    const [showEthereumWallets, setShowEthereumWallets] = useState(true);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
    };

    const handleDeleteMnemonic = () => {
        if (confirm("Are you sure you want to delete your mnemonic? This action cannot be undone.")) {
            setMnemonic("");
            setShowMnemonic(false);
        }
    };

    const handleDeleteWallet = (
        index: number, 
        type: 'solana' | 'ethereum'
    ) => {
        if (confirm(`Are you sure you want to delete this ${type === 'solana' ? 'Solana' : 'Ethereum'} wallet?`)) {
            if (type === 'solana') {
                setSolanaWallets(prev => prev.filter((_, i) => i !== index));
            } else {
                setEthereumWallets(prev => prev.filter((_, i) => i !== index));
            }
        }
    };

  return (
    <div className="relative min-h-screen py-8 z-10 overflow-hidden">

        <div className="max-w-5xl mx-auto px-4">
            <div className="mb-10 text-center">
                <p className="text-gray-400 text-2xl tracking-wider font-sans">A Wallet Generator</p>
            </div>

            {/* Mnemonic Section */}
            <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-8 mb-10 transition-all duration-300 hover:shadow-2xl hover:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-[#e4e4e4] mb-4 md:mb-0">Recovery Phrase</h2>
                <div className="flex gap-3">
                    {!mnemonic ? (
                    
                    <GeneratePhraseButton text="Generate Phrase" onClick={createMnemonic} />
                    ) : (
                    <>
                        <GeneratePhraseButton onClick={() => setShowMnemonic(!showMnemonic)} text={showMnemonic ? "Hide Phrase" : "Show Phrase"} /> 
                        
                        <CopyMnemonicButton onClick={() => handleCopy(mnemonic)} copyLogicBefore={copiedText === mnemonic ? "opacity-0" : ""} copyLogicAfter={copiedText === mnemonic ? "opacity-100" : "opacity-0"} textBefore="Copy" textAfter="Copied" />

                        <DeleteMnemonicButton text="Delete" onClick={handleDeleteMnemonic} />
                    </>
                )}
                </div>
            </div>

            {mnemonic && showMnemonic && (
                <div className="mt-6 border border-gray-800 rounded-xl p-6 bg-gray-950 transition-all duration-300 hover:border-gray-700">
                    <p className="mb-4 text-sm text-gray-400">
                        Remember this phrase to recover your wallet
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {mnemonic.split(" ").map((word, index) => (
                        <div 
                            key={index} 
                            className="py-2.5 px-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm transition-all duration-200 hover:bg-gray-750 hover:border-gray-600"
                        >
                            <span className="text-gray-400 text-sm mr-2">{index + 1}.</span>
                            <span className="font-medium text-white">{word}</span>
                        </div>
                        ))}
                    </div>

                </div>
            )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* solana wallets */}
                <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-8 transition-all duration-300 hover:shadow-2xl hover:border-gray-700">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#e4e4e4]">Solana Wallets</h2>
                            <p className="text-gray-400 text-sm mt-1">SOL addresses and keys</p>
                        </div>

                        <CreateSolWalletButton text="Create Wallet" onClick={createSolanaWallet} disabled={!mnemonic} logic={!mnemonic ? 'opacity-50 cursor-not-allowed' : ''
                        } />    

                    </div>

                {solanaWallets.length > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">
                            {solanaWallets.length} wallet{solanaWallets.length > 1 ? 's' : ''} created
                            </span>

                            <RevealWalletsButton text={showSolanaWallets ? "Hide Details" : "Show Details"} onClick={() => setShowSolanaWallets(!showSolanaWallets)} />
                        </div>

                        {showSolanaWallets && (
                            <div className="mt-6 space-y-5">
                                {solanaWallets.map((wallet, index) => (
                                <WalletCardComponent
                                key={index}
                                title={`Solana Wallet ${index + 1}`}
                                createdAt={wallet.createdAt || new Date().toLocaleString()}
                                fields={[
                                { label: "Public Key", value: wallet.publicKey },
                                { label: "Private Key", value: wallet.privateKey },
                                ]}
                                onCopy={() => handleCopy(wallet.privateKey)}
                                isCopied={copiedText === wallet.privateKey}
                                onDelete={() => handleDeleteWallet(index, 'solana')}
                                />
                            ))}
                        </div>
                        )}
                    </div>
                )}

                {solanaWallets.length === 0 && mnemonic && (
                    <div className="text-center py-12 text-gray-400 border border-gray-800 rounded-xl bg-gray-950">
                        <p>No Solana wallets created yet.</p>
                        <p className="text-sm mt-2 text-gray-500">Click "Create Wallet" to get started.</p>
                    </div>
                )}

                {!mnemonic && (
                    <div className="text-center py-12 text-gray-400 border border-gray-800 rounded-xl bg-gray-950">
                        <p>Generate a recovery phrase first</p>
                        <p className="text-sm mt-2 text-gray-500">to create Solana wallets.</p>
                    </div>
                )}
                </div>

                {/* ethereum wallets */}
                <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-8 transition-all duration-300 hover:shadow-2xl hover:border-gray-700">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#e4e4e4]">Ethereum Wallets</h2>
                            <p className="text-gray-400 text-sm mt-1">ETH addresses and keys</p>
                        </div>

                        <CreateSolWalletButton text="Create Wallet" onClick={createEthereumWallet} disabled={!mnemonic} logic={
                        !mnemonic ? 'opacity-50 cursor-not-allowed' : ''
                        } />
                    </div>

                    {ethereumWallets.length > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">
                                {ethereumWallets.length} wallet{ethereumWallets.length > 1 ? 's' : ''} created
                            </span>

                            <RevealWalletsButton text={showEthereumWallets ? 'Hide Details' : 'Show Details'} onClick={() => setShowEthereumWallets(!showEthereumWallets)} />

                        </div>

                        {showEthereumWallets && (
                            <div className="mt-6 space-y-5">
                                {ethereumWallets.map((wallet, index) => (
                                <WalletCardComponent
                                    key={index}
                                    title={`Ethereum Wallet ${index + 1}`}
                                    createdAt={wallet.createdAt || new Date().toLocaleString()}
                                    fields={[
                                    { label: "Address", value: wallet.address },
                                    { label: "Private Key", value: wallet.privateKey },
                                    ]}
                                    onCopy={() => handleCopy(wallet.privateKey)}
                                    isCopied={copiedText === wallet.privateKey}
                                    onDelete={() => handleDeleteWallet(index, 'ethereum')}
                                />
                            ))}
                            </div>
                        )}
                        </div>
                    )}

                    {ethereumWallets.length === 0 && mnemonic && (
                    <div className="text-center py-12 text-gray-400 border border-gray-800 rounded-xl bg-gray-950">
                        <p>No Ethereum wallets created yet.</p>
                        <p className="text-sm mt-2 text-gray-500">Click "Create Wallet" to get started.</p>
                    </div>
                    )}

                    {!mnemonic && (
                    <div className="text-center py-12 text-gray-400 border border-gray-800 rounded-xl bg-gray-950">
                        <p>Generate a recovery phrase first</p>
                        <p className="text-sm mt-2 text-gray-500">to create Ethereum wallets.</p>
                    </div>
                    )}
                </div>
            </div>

            <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-800 pt-8">
                <p className="mt-2 text-[22px] text-[#e4e4e4] hover:text-[#b7b7b7] transition-all transform duration-300">Designed and Developed by <Link href="https://github.com/piyush-rj" className="text-[#e4e4e4]">Piyush</Link> </p>
            </div>
        </div>
    </div>
  );
};

export default WalletGenerator;