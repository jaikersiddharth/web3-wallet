'use client';

import { atom } from 'recoil';

export interface WalletState {
  mnemonic: string;
  seed: string;
  derivedWallets: {
    path: string;
    publicKey: string;
    privateKey: string;
  }[];
}

export const walletState = atom<WalletState>({
  key: 'walletState', // unique ID
  default: {
    mnemonic: '',
    seed: '',
    derivedWallets: []
  },
});
