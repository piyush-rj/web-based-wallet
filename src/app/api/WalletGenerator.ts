import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed } from "bip39"
import { derivePath } from "ed25519-hd-key";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import nacl from "tweetnacl";

class WalletGenerator {

    private mnemonic: string = ""
    private seed: any;
    private solanaIndex: number = 0;
    private ethereumIndex: number = 0;
    private solanaKeyPair: Map<Buffer<ArrayBufferLike>, Keypair>;
    private ethereumKeyPair: Map<Wallet, string>;



    constructor(){
        this.generateMnemonic();
        this.solanaKeyPair = new Map<Buffer<ArrayBufferLike>, Keypair>();
        this.ethereumKeyPair = new Map<Wallet, string>()
    }

    private generateMnemonic(){
        this.mnemonic = generateMnemonic();
        this.generateSeed()
    }

    private generateSeed(){
        this.seed = mnemonicToSeed(this.mnemonic)
    }

    // solana wallet logic
    public solanaWallet(){
        const path = `m/44/501/${this.solanaIndex}'/0'`;
        const derived = derivePath(path, this.seed.toString())
        const derivedKey = derived.key // private key

        const secretKey = nacl.sign.keyPair.fromSeed(derivedKey).secretKey;
        const keypair = Keypair.fromSecretKey(secretKey); // public key

        this.solanaIndex++;
        this.solanaKeyPair.set(derivedKey, keypair)

    }

    public solanaKeys(){
        return this.solanaKeyPair;
    }


    // ethereum wallet logic
    public ethereumWallet(){
        const path = `m/44'/60'/${this.ethereumIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(this.seed.toString());
        const child = hdNode.derivePath(path);
        const wallet = new Wallet(child.privateKey);
        const publicKey = wallet.signingKey.publicKey;

        this.ethereumIndex++;
        this.ethereumKeyPair.set(wallet, publicKey);
    }

    public ethereumKeys(){
        return this.ethereumKeyPair;
    }


}