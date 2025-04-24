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
          <div style={{ marginTop: 10, wordBreak: "break-word" }}>{mnemonic}</div>
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

  // mnemonic -> seed (buffer format) -> hexSeed (hex format) -> 

  const solanaHandler = async () => {
    const seed = await mnemonicToSeed(mnemonic); // Buffer
    console.log("Seed :", seed);
    console.log("hexSeed  :", seed.toString("hex"));
  
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derived = derivePath(path, seed.toString());
    const derivedSeed = derived.key;
  
    console.log("path :", path);
    console.log("derived seed :", derivedSeed);
    console.log(" derived hex seed :", Buffer.from(derivedSeed).toString("hex"));
  
    const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secretKey);
  
    console.log("Public Key:", keypair.publicKey.toBase58());
  
    setPublicKeys((prev) => [...prev, keypair.publicKey]);
    setCurrentIndex((prev) => prev + 1);
  };
  
  


  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={solanaHandler}>Add Wallet</button>

      <div style={{ marginTop: 10 }}>
        {publicKeys.map((pk, idx) => (
          <div key={idx}>{pk.toBase58()}</div>
        ))}
      </div>
    </div>
  );
}


function EthWallet({mnemonic}: {mnemonic : string}){
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ addresses, setAddresses ] = useState([]);


    async function handleEth(){
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);

        setCurrentIndex(currentIndex + 1);
        setAddresses([...addresses, wallet.address])
    }

    return <div>
        <button onClick={handleEth}>Add ETH wallet</button>
    </div>
}