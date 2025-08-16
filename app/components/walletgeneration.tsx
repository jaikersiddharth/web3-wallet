'use client';
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useState, useEffect } from 'react';
import * as ed25519 from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';

interface DerivedWallet {
  path: string;
  chain: string;
  publicKey: string;
  privateKey: string;
}

export default function Wallet() {
  const [mnemonic, setMnemonic] = useState('');
  const [seed, setSeed] = useState('');
  const [derivedWallets, setDerivedWallets] = useState<DerivedWallet[]>([]);
  const [copied, setCopied] = useState<{type: string, index: number} | null>(null);

  const generateWallets = () => {
    const newMnemonic = generateMnemonic();
    const seedBuffer = mnemonicToSeedSync(newMnemonic);
    const seedHex = seedBuffer.toString('hex');

    const wallets: DerivedWallet[] = [
      // Solana - m/44'/501'/0'/0'
      {
        chain: "Solana",
        path: "m/44'/501'/0'/0'",
        ...deriveWallet(seedHex, "m/44'/501'/0'/0'")
      },
      // Solana - m/44'/501'/0'/0'/0'
      {
        chain: "Solana (Alt)",
        path: "m/44'/501'/0'/0'/0'",
        ...deriveWallet(seedHex, "m/44'/501'/0'/0'/0'")
      },
      // Ethereum - m/44'/60'/0'/0/0
      {
        chain: "Ethereum",
        path: "m/44'/60'/0'/0/0",
        ...deriveWallet(seedHex, "m/44'/60'/0'/0/0")
      },
      // Bitcoin - m/44'/0'/0'/0/0
      {
        chain: "Bitcoin",
        path: "m/44'/0'/0'/0/0",
        ...deriveWallet(seedHex, "m/44'/0'/0'/0/0")
      }
    ];

    setMnemonic(newMnemonic);
    setSeed(seedHex);
    setDerivedWallets(wallets);
  };

  const deriveWallet = (seedHex: string, path: string): { publicKey: string; privateKey: string } => {
    try {
      const derivedSeed = ed25519.getMasterKeyFromSeed(seedHex);
      const keypair = Keypair.fromSeed(Uint8Array.from(derivedSeed.key));
      
      return {
        publicKey: keypair.publicKey.toString(),
        privateKey: Buffer.from(keypair.secretKey).toString('hex')
      };
    } catch (error) {
      console.error(`Error deriving wallet for path ${path}:`, error);
      return {
        publicKey: 'Error deriving key',
        privateKey: 'Error deriving key'
      };
    }
  };

  const copyToClipboard = async (type: string, index?: number) => {
    let text = '';
    if (type === 'mnemonic') {
      text = mnemonic;
    } else if (type === 'seed') {
      text = seed;
    } else if (type === 'publicKey' || type === 'privateKey') {
      if (index !== undefined && derivedWallets[index]) {
        text = derivedWallets[index][type];
      }
    }
    
    await navigator.clipboard.writeText(text);
    setCopied({ type, index: index ?? -1 });
    setTimeout(() => setCopied(null), 2000);
  };

  useEffect(() => {
    generateWallets();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-[Carter_One] mb-4 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
          Generated Wallet
        </h1>
        <p className="text-gray-400">Save your mnemonic phrase in a secure location</p>
      </div>

      {/* Card Container */}
      <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-purple-500/10 to-orange-500/10 p-[1px]">
        <div className="bg-black/90 rounded-2xl p-8">
          {/* Mnemonic Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-purple-300">Mnemonic Phrase</h2>
              <button
                onClick={() => copyToClipboard('mnemonic')}
                className="px-4 py-2 rounded-lg bg-black border border-purple-500/30 text-white text-sm font-medium hover:bg-purple-500/10 transition-all duration-300"
              >
                {copied?.type === 'mnemonic' ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {mnemonic.split(' ').map((word, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative bg-black rounded-lg p-4 flex items-center space-x-3">
                    <span className="text-purple-400 font-mono">{idx + 1}.</span>
                    <span className="text-gray-200 font-mono">{word}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seed Section */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-300">Seed</h2>
              <button
                onClick={() => copyToClipboard('seed')}
                className="px-4 py-2 rounded-lg bg-black border border-purple-500/30 text-white text-sm font-medium hover:bg-purple-500/10 transition-all duration-300"
              >
                {copied?.type === 'seed' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-black rounded-lg p-6">
                <p className="font-mono text-sm break-all text-gray-300">
                  {seed}
                </p>
              </div>
            </div>
          </div>

          {/* Derived Wallets Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-purple-300">Derived Wallets</h2>
            <div className="space-y-6">
              {derivedWallets.map((wallet, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative bg-black rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-1">{wallet.chain}</h3>
                        <p className="text-gray-400 text-sm font-mono">{wallet.path}</p>
                      </div>
                      <div className="bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                        <span className="text-purple-300 text-sm">BIP44</span>
                      </div>
                    </div>

                    {/* Public Key */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Public Key</span>
                        <button
                          onClick={() => copyToClipboard('publicKey', index)}
                          className="px-3 py-1 rounded-md bg-black border border-purple-500/30 text-white text-xs font-medium hover:bg-purple-500/10 transition-all duration-300"
                        >
                          {copied?.type === 'publicKey' && copied.index === index ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <p className="font-mono text-xs break-all text-gray-300">{wallet.publicKey}</p>
                    </div>

                    {/* Private Key */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Private Key</span>
                        <button
                          onClick={() => copyToClipboard('privateKey', index)}
                          className="px-3 py-1 rounded-md bg-black border border-purple-500/30 text-white text-xs font-medium hover:bg-purple-500/10 transition-all duration-300"
                        >
                          {copied?.type === 'privateKey' && copied.index === index ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <p className="font-mono text-xs break-all text-gray-300">{wallet.privateKey}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={generateWallets}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-orange-500 text-white font-medium hover:from-purple-600 hover:to-orange-600 transition-all duration-300"
            >
              Generate New Wallets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
