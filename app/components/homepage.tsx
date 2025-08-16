'use client';
import Link from 'next/link';
import Image from 'next/image';

export function Homepage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-orange-500/10" />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-[Carter_One] mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Multi-Chain Wallet Generator
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Generate secure wallets for Solana, Ethereum, and Bitcoin with BIP44 standard
            </p>
            <Link 
              href="/wallet"
              className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-orange-500 text-white font-medium hover:from-purple-600 hover:to-orange-600 transition-all duration-300"
            >
              Generate Wallets
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="relative group p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-orange-500/10">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-200" />
              <div className="relative bg-black/90 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-purple-300 mb-3">Multi-Chain Support</h3>
                <p className="text-gray-400">Generate wallets for multiple blockchains using a single seed phrase</p>
              </div>
            </div>

            <div className="relative group p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-orange-500/10">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-200" />
              <div className="relative bg-black/90 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-purple-300 mb-3">BIP44 Standard</h3>
                <p className="text-gray-400">Industry-standard HD wallet derivation paths for maximum compatibility</p>
              </div>
            </div>

            <div className="relative group p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-orange-500/10">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-200" />
              <div className="relative bg-black/90 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-purple-300 mb-3">Secure Generation</h3>
                <p className="text-gray-400">Client-side wallet generation with no data stored or transmitted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 text-center text-gray-500">
          <p>Built with Next.js and Tailwind CSS • Open Source</p>
        </div>
      </div>
    </div>
  );
}