"use client";
import { useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Wallet, HDNodeWallet } from "ethers";

export function MnemonicGenerator() {
  const [mnemonic, setMnemonic] = useState<string | null>(null);

  const handleMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  };

  return (
    <div>
      <button onClick={handleMnemonic} disabled={mnemonic !== null}>
        {mnemonic ? "Mnemonic Created" : "Create Mnemonic"}
      </button>

      {mnemonic && (
        <>
          <div className="mt-10">{mnemonic}</div>
          <SolanaWallet mnemonic={mnemonic} />
        </>
      )}
    </div>
  );
}

// solana component
function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);

  const solanaHandler = async () => {
    const seed = await mnemonicToSeed(mnemonic); // Buffer
    
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derived = derivePath(path, seed.toString());
    const derivedSeed = derived.key; // this is my private key

    // generating the public key
    const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secretKey); // public key

    setPublicKeys((prev) => [...prev, keypair.publicKey]);
    setCurrentIndex(currentIndex + 1);  
  };
  
  return (
    <div className="mt-10">
      <button onClick={solanaHandler}>Add Wallet</button>

      <div className="mt-10">
        {publicKeys.map((pk, idx) => (
          <div key={idx}>{pk.toBase58()}</div>
        ))}
      </div>
    </div>
  );
}


function EthWallet({mnemonic}: {mnemonic : string}){
    const [ currentIndex, setCurrentIndex ] = useState<number>(0);
    const [ addresses, setAddresses ] = useState<string[]>([]);


    async function handleEth(){
        const seed = await mnemonicToSeed(mnemonic); // buffer

        const derivationPath = `m/44'/60'/${currentIndex}/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed.toString("hex")); // links the account to the seed

        const child = hdNode.derivePath(derivationPath); // 

        const wallet = new Wallet(child.privateKey); // public key

        // inheritance -> child ko pata hai ki wallet ke pas kya values hai par wallet ko kuch ni pata child ke baarein me

        setCurrentIndex(currentIndex + 1);
        setAddresses((prev) => [...prev, wallet.address])
    }

    return <div className="mt-10">
        <button onClick={handleEth}>Add ETH wallet</button>
        <div className="mt-10">
        {addresses.map((addr, idx) => (
          <div key={idx}>{addr}</div>
        ))}
      </div>
    </div>
}