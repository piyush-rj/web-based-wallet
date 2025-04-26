import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed } from "bip39"
import { publicDecrypt } from "crypto";
import { derivePath } from "ed25519-hd-key";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import nacl from "tweetnacl";

export class WalletGenerator {

    private mnemonic: string = ""
    private seed!: Buffer;
    private solanaIndex: number = 0;
    private ethereumIndex: number = 0;
    private solanaKeyPair: Map<string, Keypair>;
    private ethereumKeyPair: Map<string, string>;


    constructor(){
        this.solanaKeyPair = new Map();
        this.ethereumKeyPair = new Map()
    }

    public async init(){
        this.mnemonic = generateMnemonic()
        this.seed = await mnemonicToSeed(this.mnemonic)
    }

    // solana wallet logic
    public solanaWallet(){
        const path = `m/44'/501'/${this.solanaIndex}'/0'`;
        const derived = derivePath(path, this.seed.toString())
        const derivedKey = derived.key // private key

        const secretKey = nacl.sign.keyPair.fromSeed(derivedKey).secretKey;
        const keypair = Keypair.fromSecretKey(secretKey); // public key

        const currentSolanaWallet = {
            publicKey: keypair.publicKey.toString(),
            privateKey: Buffer.from(secretKey).toString("hex")
        }

        this.solanaKeyPair.set(Buffer.from(derivedKey).toString("hex"), keypair)
        this.solanaIndex++;

        return currentSolanaWallet;

    }


    // ethereum wallet logic
    public ethereumWallet(){
        const path = `m/44'/60'/${this.ethereumIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(this.seed);
        const child = hdNode.derivePath(path);
        const wallet = new Wallet(child.privateKey);
        const publicKey = wallet.signingKey.publicKey;

        const currentEthWallet = {
            privateKey: wallet.privateKey,
            address: wallet.address
        }

        this.ethereumKeyPair.set(wallet.address, wallet.privateKey);
        this.ethereumIndex++;

        return currentEthWallet;
    }

    public solanaKeys(){
        return this.solanaKeyPair;
    }

    public ethereumKeys(){
        return this.ethereumKeyPair;
    }

    public getMnemonic(){
        return this.mnemonic;
    }

}