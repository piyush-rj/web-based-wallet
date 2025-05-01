"use client"
import { useState, useEffect, useRef } from "react";
import { useWalletGenerator } from "@/app/hooks/useWallet";
import { WalletCardComponent } from "./ui/WalletCard";
import { GeneratePhraseButton } from "./ui/GeneratePhraseButton";
import { CopyMnemonicButton } from "./ui/CopyMnemonicButton";
import { DeleteMnemonicButton } from "./ui/DeleteMnemonicButton";
import { CreateSolWalletButton } from "./ui/CreateSolanaWalletButton";
import Link from "next/link";
import { RevealWalletsButton } from "./ui/RevealWalletsButton";
import { ReactNode } from "react";
import toast from "react-hot-toast";


type AnimatedSectionProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
  };

const LoadingAnimation = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 transition-opacity duration-500">
            <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    {/* Outer ring */}
                    <div className="absolute inset-0 border-4 border-t-[#6e9e75] border-r-[#6394d4] border-b-[#6287b6] border-l-[#709375] rounded-full animate-spin"></div>
                    
                    {/* Inner rings with staggered animations */}
                    <div className="absolute inset-2 border-3 border-t-[#709375] border-r-[#6287b6] border-b-[#6e9e75] border-l-[#6394d4] rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
                    <div className="absolute inset-4 border-2 border-t-[#6394d4] border-r-[#709375] border-b-[#6287b6] border-l-[#6e9e75] rounded-full animate-spin" style={{ animationDuration: '1.2s' }}></div>
                    
                    {/* Center pulse */}
                    <div className="absolute inset-8 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="mt-6 text-lg sm:text-xl font-bold text-white tracking-wider">
                    <span className="animate-pulse">LOADING NexWallet</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-gray-400">
                    Initializing secure environment...
                </div>
            </div>
        </div>
    );
};

const ScrambleText = () => {
    const [displayText, setDisplayText] = useState("");
    const finalText = "CREATE YOUR OWN WALLET";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const iterations = useRef(0);
    const animationComplete = useRef(false);

    useEffect(() => {
        // Generate initial random text
        let initialText = "";
        for (let i = 0; i < finalText.length; i++) {
            initialText += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setDisplayText(initialText);

        // Start animation after a short delay
        setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayText(prev => {
                    if (animationComplete.current) {
                        clearInterval(interval);
                        return finalText;
                    }

                    let newText = "";
                    for (let i = 0; i < finalText.length; i++) {
                        if (i < iterations.current && prev[i] === finalText[i]) {
                            // Keep correct characters
                            newText += finalText[i];
                        }
                        else if (Math.random() < 0.15 && prev[i] !== finalText[i]) {
                            // Slightly higher chance to randomly get correct character
                            newText += finalText[i];
                        }
                        else {
                            // Random character
                            newText += chars.charAt(Math.floor(Math.random() * chars.length));
                        }
                    }

                    // Increase iteration counter more frequently for smoother progression
                    if (Math.random() < 0.3) {
                        iterations.current += 1;
                    }

                    if (newText === finalText) {
                        animationComplete.current = true;
                    }

                    return newText;
                });
            }, 50);

            setTimeout(() => {
                clearInterval(interval);
                setDisplayText(finalText);
                animationComplete.current = true;
            }, 1200);

            return () => clearInterval(interval);
        }, 30);
    }, []);

    return (
        <p className="text-[#6f6f6f] font-semibold text-xl sm:text-2xl md:text-3xl tracking-wider font-sans">
            {displayText}
        </p>
    );
};
  
  const AnimatedSection = ({ children, delay = 0, className = "" }: AnimatedSectionProps) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
  
      return () => clearTimeout(timer);
    }, [delay]);
  
    return (
      <div
        className={`transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${className}`}
      >
        {children}
      </div>
    );
  };

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
    const [isLoading, setIsLoading] = useState(true);
    const [contentReady, setContentReady] = useState(false);


    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
            
            setTimeout(() => {
                setContentReady(true);
            }, 100); 
        }, 2200); 
        
        return () => clearTimeout(loadingTimer);
    }, []);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
        toast.success("copied")
    };

    const handleDeleteMnemonic = () => {
        if (confirm("Are you sure you want to delete your mnemonic? This action cannot be undone.")) {
            setMnemonic("");
            setShowMnemonic(false);
            setSolanaWallets([])
            setEthereumWallets([])
        }
        toast.success("Mnemonic deleted")
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
        toast.success("Wallet deleted")
    };

    if (!contentReady) {
        return (
            <div className="relative min-h-screen py-4 sm:py-8 z-10 overflow-hidden">
                {isLoading && <LoadingAnimation />}
            </div>
        );
    }

    return (
        <div className="relative min-h-screen py-4 sm:py-8 z-10 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-15">
                <AnimatedSection delay={0} className="mb-6 sm:mb-10 text-center">
                    <ScrambleText />
                </AnimatedSection>

                {/* Mnemonic Section */}
                <AnimatedSection delay={200}>
                    <div className="bg-[#121212] rounded-xl border border-[#000] hover:border-[#2c2c2c] shadow-xl p-4 sm:p-6 md:p-8 md:px-10 mb-6 sm:mb-10 transition-all duration-300 hover:shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <h2 className="text-xl sm:text-2xl font-semibold text-[#e4e4e4] mb-4 md:mb-0">Recovery Phrase</h2>
                            <div className="flex gap-3 w-full md:w-auto justify-center md:justify-end">
                                {!mnemonic ? (
                                    <GeneratePhraseButton text="Generate Phrase" onClick={createMnemonic} />
                                    
                                ) : (
                                    <GeneratePhraseButton
                                        onClick={() => setShowMnemonic(!showMnemonic)}
                                        text={showMnemonic ? "Hide Phrase" : "Show Phrase"}
                                    />
                                )}
                            </div>
                        </div>

                        {mnemonic && showMnemonic && (
                            <div className="mt-6 border border-gray-800 rounded-xl p-3 sm:p-4 md:p-6 bg-black transition-all duration-300 hover:border-gray-700">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
                                    {mnemonic.split(" ").map((word, index) => (
                                        <div
                                            key={index}
                                            className="py-2 sm:py-2.5 px-2 sm:px-3 bg-[#1d1d1d] shadow-sm transition-all duration-200 hover:bg-gray-750"
                                        >
                                            <span className="text-gray-400 text-xs sm:text-sm mr-1 sm:mr-2">{index + 1}.</span>
                                            <span className="font-medium text-[#e4e4e4] text-sm sm:text-base">{word}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* mnemonic phrase display box */}
                                <div className="flex flex-col sm:flex-row justify-between">
                                    <p className="flex justify-center sm:justify-start items-center text-xs sm:text-sm text-red-500 mb-3 sm:mb-0">
                                        Never share this mnemonic phrase with anyone!
                                    </p>
                                    <div className="flex justify-center sm:justify-end">
                                        <CopyMnemonicButton
                                            onClick={() => handleCopy(mnemonic)}
                                            copyLogicBefore={copiedText === mnemonic ? "opacity-0" : ""}
                                            copyLogicAfter={copiedText === mnemonic ? "opacity-100" : "opacity-0"}
                                            textBefore="Copy"
                                            textAfter="Copied"
                                        />
                                        <DeleteMnemonicButton
                                            text="Delete"
                                            onClick={handleDeleteMnemonic}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    {/* solana wallets */}
                    <AnimatedSection delay={400}>
                        <div className="bg-[#151515] rounded-xl sm:rounded-2xl shadow-xl border border-[#191919] p-4 sm:p-6 md:p-8 transition-all duration-250 hover:shadow-2xl hover:border-[#2c2c2c]">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 sm:mb-8">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-semibold text-[#e4e4e4]">Solana Wallets</h2>
                                    <p className="text-gray-400 text-xs sm:text-sm mt-1">SOL addresses and keys</p>
                                </div>

                                <div className="mt-3 sm:mt-0 w-full sm:w-auto">
                                    <CreateSolWalletButton 
                                        text="Create Wallet" 
                                        onClick={createSolanaWallet} 
                                        disabled={!mnemonic} 
                                        logic={!mnemonic ? 'opacity-50 cursor-not-allowed w-full sm:w-auto' : 'w-full sm:w-auto'} 
                                    />    
                                </div>
                            </div>

                            {solanaWallets.length > 0 && (
                                <div className="mb-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs sm:text-sm text-gray-400">
                                            {solanaWallets.length} wallet{solanaWallets.length > 1 ? 's' : ''} created
                                        </span>

                                        <RevealWalletsButton 
                                            text={showSolanaWallets ? "Hide Details" : "Show Details"} 
                                            onClick={() => setShowSolanaWallets(!showSolanaWallets)} 
                                        />
                                    </div>

                                    {showSolanaWallets && (
                                        <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
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
                                <div className="text-center py-8 sm:py-12 text-gray-400 rounded-xl bg-[#434343]">
                                    <p className="text-[#b0b0b0] text-sm sm:text-base">No Solana wallets created yet.</p>
                                    <p className="text-xs sm:text-sm mt-1 text-[#56707c]">Click {"Create Wallet"} to get started.</p>
                                </div>
                            )}

                            {!mnemonic && (
                                <div className="text-center py-8 sm:py-12 text-gray-400 border border-[#626262] rounded-xl bg-[#393939]">
                                    <p className="text-sm sm:text-base">Generate a recovery phrase first</p>
                                    <p className="text-xs sm:text-sm mt-1 text-[#56707c]">to create Solana wallets.</p>
                                </div>
                            )}
                        </div>
                    </AnimatedSection>

                    {/* ethereum wallets */}
                    <AnimatedSection delay={600}>
                        <div className="bg-[#151515] rounded-xl sm:rounded-2xl shadow-xl border border-[#191919] p-4 sm:p-6 md:p-8 transition-all duration-250 hover:shadow-2xl hover:border-[#2c2c2c]">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 sm:mb-8">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-semibold text-[#e4e4e4]">Ethereum Wallets</h2>
                                    <p className="text-gray-400 text-xs sm:text-sm mt-1">ETH addresses and keys</p>
                                </div>

                                <div className="mt-3 sm:mt-0 w-full sm:w-auto">
                                    <CreateSolWalletButton 
                                        text="Create Wallet" 
                                        onClick={createEthereumWallet} 
                                        disabled={!mnemonic} 
                                        logic={!mnemonic ? 'opacity-50 cursor-not-allowed w-full sm:w-auto' : 'w-full sm:w-auto'} 
                                    />
                                </div>
                            </div>

                            {ethereumWallets.length > 0 && (
                                <div className="mb-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs sm:text-sm text-gray-400">
                                            {ethereumWallets.length} wallet{ethereumWallets.length > 1 ? 's' : ''} created
                                        </span>

                                        <RevealWalletsButton 
                                            text={showEthereumWallets ? 'Hide Details' : 'Show Details'} 
                                            onClick={() => setShowEthereumWallets(!showEthereumWallets)} 
                                        />
                                    </div>

                                    {showEthereumWallets && (
                                        <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
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
                                <div className="text-center py-8 sm:py-12 text-gray-400 rounded-xl bg-[#434343]">
                                    <p className="text-sm sm:text-base">No Ethereum wallets created yet.</p>
                                    <p className="text-xs sm:text-sm mt-1 text-[#56707c]">Click {"Create Wallet"} to get started.</p>
                                </div>
                            )}

                            {!mnemonic && (
                                <div className="text-center py-8 sm:py-12 text-gray-400 border border-[#626262] rounded-xl bg-[#393939]">
                                    <p className="text-sm sm:text-base">Generate a recovery phrase first</p>
                                    <p className="text-xs sm:text-sm mt-1 text-[#56707c]">to create Ethereum wallets.</p>
                                </div>
                            )}
                        </div>
                    </AnimatedSection>
                </div>

                <AnimatedSection delay={800}>
                    <div className="mt-6 sm:mt-10 text-center text-sm border-t border-gray-800 pt-6 sm:pt-8">
                        <p className="mt-2 text-sm sm:text-base md:text-lg text-[#b7b7b7] transition-all transform duration-300">
                            Designed and Developed by <Link href="https://github.com/piyush-rj" className="hover:text-[#e4e4e4] transition-all transform duration-300">Piyush</Link>
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default WalletGenerator;