import {atom} from 'recoil';
export const walletState = atom({
  key: 'walletState',
  default: {
    mnemonic: '',
    seed: '',
    publicKey: '',
    privateKey: '',
  },
});