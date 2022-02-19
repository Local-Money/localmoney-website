import {
  getChainOptions,
  WalletController,
} from "@terra-money/wallet-provider";

let instance = null;

export async function initController() {
  if (instance == null) {
    const chainOptions = await getChainOptions();
    console.log(chainOptions);
    instance = new WalletController({
      ...chainOptions,
    });
  }
}

export function getController() {
  return instance;
}
