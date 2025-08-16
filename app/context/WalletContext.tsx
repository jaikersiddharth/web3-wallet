'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  mnemonic: string;
  seed: string;
  setMnemonic: (mnemonic: string) => void;
  setSeed: (seed: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

function WalletProvider({ children }: { children: ReactNode }) {
  const [mnemonic, setMnemonic] = useState('');
  const [seed, setSeed] = useState('');

  return (
    <WalletContext.Provider value={{ mnemonic, seed, setMnemonic, setSeed }}>
      {children}
    </WalletContext.Provider>
  );
}

function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

export { WalletProvider, useWallet };
