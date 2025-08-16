import { atom } from 'recoil';

interface WalletState {
  mnemonic: string;
  seed: string;
  publicKey: string;
  privateKey: string;
}

export const walletState = atom<WalletState>({
  key: 'walletState', // unique ID
  default: {
    mnemonic: '',
    seed: '',
    publicKey: '',
    privateKey: ''
  },
});
