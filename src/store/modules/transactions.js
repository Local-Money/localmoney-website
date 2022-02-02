import { FACTORY_CONTRACT, PAIR_CONTRACT } from "@/constants";
import { connectExtension } from "@/terra/extension";
import { buildClient } from "@/terra/client";
import {
  getBalance,
  getLBPs,
  getPool,
  getReverseSimulation,
  getSimulation,
  getTokenBalance,
  getTokenInfo,
  getWeights,
} from "@/terra/queries";
import { nativeTokenFromPair, saleAssetFromPair } from "@/helpers/asset_pairs";
import { Dec } from "@terra-money/terra.js";
import {
  dropInsignificantZeroes,
  formatTokenAmount,
} from "@/helpers/number_formatters";
import { NATIVE_TOKEN_SYMBOLS } from "@/helpers/token_info";
import {
  buildSwapFromContractTokenMsg,
  buildSwapFromNativeTokenMsg,
  postMsg,
} from "@/terra/swap";
import { loading, success } from "@/terra/result";

let terrarium = buildClient({
  URL: "http://143.244.190.1:3060",
  chainID: "localterra",
});

let testnet = buildClient({
  URL: "https://bombay-lcd.terra.dev",
  chainID: "columbus-5",
});

let isTestNet = true;
let terra = isTestNet ? testnet : terrarium;

const state = {
  pageLoading: {
    isLoading: false,
    label: undefined,
    transaction: undefined,
  },
  walletAddress: "",
  balance: 0,
  tokenBalance: 0,
  currentPair: null,
  tokenPrice: loading(),
  secondsRemaining: loading(),
  tokensRemaining: loading({ amount: 0, percentage: 0 }),
  currentLbpWeight: loading(),
  pairWeights: {},
  pool: {},
  saleTokenInfo: {},
};

const getters = {
  walletAddress: (state) => state.walletAddress,
  balance: (state) =>
    formatTokenAmount(state.walletAddress.length > 0 ? state.balance : 0, 6),
  tokenBalance: (state) =>
    formatTokenAmount(
      state.walletAddress.length > 0 ? state.tokenBalance : 0,
      6
    ),
  nativeTokenSymbol: (state) => {
    const denom = state.pair ? nativeTokenFromPair(state.pair).denom : "uusd";
    return NATIVE_TOKEN_SYMBOLS[denom];
  },
  tokenPrice: (state) => state.tokenPrice,
  tokensRemaining: (state) => state.tokensRemaining,
  currentLbpWeight: (state) => state.currentLbpWeight,
  pool: (state) => state.pool,
  currentPair: (state) => state.currentPair,
  secondsRemaining: (state) => state.secondsRemaining,
  saleTokenInfo: (state) => state.saleTokenInfo,
  pageLoading: (state) => state.pageLoading,
  priceHistory: (state) => () => {
    return {
      time: state.time,
      price: state.price,
      series: state.series,
    };
  },
  nativeAsset: (state) => {
    return {
      balance: getters.balance(state),
      symbol: getters.nativeTokenSymbol(state),
    };
  },
  tokenAsset: (state) => {
    return {
      balance: getters.tokenBalance(state),
      symbol: state.saleTokenInfo.symbol,
    };
  },
};

const mutations = {
  setPageLoading: (state, pageLoading) => (state.pageLoading = pageLoading),
  setWalletAddress: (state, walletAddress) =>
    (state.walletAddress = walletAddress),
  setBalance: (state, balance) => (state.balance = balance),
  setTokenBalance: (state, tokenBalance) => (state.tokenBalance = tokenBalance),
  setTokenPrice: (state, tokenPrice) => (state.tokenPrice = tokenPrice),
  setTokensRemaining: (state, tokensRemaining) =>
    (state.tokensRemaining = tokensRemaining),
  setCurrentLbpWeight: (state, currentLbpWeight) =>
    (state.currentLbpWeight = currentLbpWeight),
  setPairWeights: (state, pairWeights) => (state.pairWeights = pairWeights),
  setPool: (state, pool) => (state.pool = pool),
  setCurrentPair: (state, currentPair) => (state.currentPair = currentPair),
  setSecondsRemaining: (state, secondsRemaining) =>
    (state.secondsRemaining = secondsRemaining),
  setSaleTokenInfo: (state, saleTokenInfo) =>
    (state.saleTokenInfo = saleTokenInfo),
  setPriceHistory: (state, priceHistory) => {
    state.price = priceHistory.price;
    state.time = priceHistory.time;
    state.series = priceHistory.series;
  },
};

const actions = {
  async initWallet({ commit, dispatch }) {
    const { wallet, info } = await connectExtension();
    terra = buildClient({
      URL: info.lcd,
      chainID: info.chainID,
    });

    commit("setPageLoading", { isLoading: true });
    commit("setWalletAddress", wallet.address);
    const balance = await dispatch("fetchBalance");
    const tokenBalance = await dispatch("fetchTokenBalance");
    commit("setBalance", balance);
    commit("setTokenBalance", tokenBalance);
    commit("setPageLoading", { isLoading: false });

    dispatch("fetchCurrentPair");
  },
  async updateBalance({ dispatch, commit }) {
    const balance = await dispatch("fetchBalance");
    const tokenBalance = await dispatch("fetchTokenBalance");
    commit("setBalance", balance);
    commit("setTokenBalance", tokenBalance);
  },
  async fetchBalance({ getters }) {
    const walletAddress = getters.walletAddress;
    if (walletAddress.length !== 0) {
      const pair = getters.currentPair;
      const nativeToken = nativeTokenFromPair(pair.asset_infos).info
        .native_token.denom;
      return await getBalance(terra, nativeToken, walletAddress);
    }
  },
  async fetchTokenBalance({ getters }) {
    const walletAddress = getters.walletAddress;
    if (walletAddress.length !== 0) {
      const pair = getters.currentPair;
      const tokenAddress = saleAssetFromPair(pair.asset_infos).info.token
        .contract_addr;
      return await getTokenBalance(terra, tokenAddress, walletAddress);
    }
  },
  async fetchCurrentPair({ commit, dispatch }) {
    const lbps = (await getLBPs(terra, FACTORY_CONTRACT)).filter(
      (lbp) => lbp.contract_addr === PAIR_CONTRACT
    );
    const currentTime = Math.floor(Date.now() / 1000);
    const currentPair = lbps.find(
      (lbp) => lbp.start_time <= currentTime && lbp.end_time > currentTime
    );

    commit("setCurrentPair", currentPair);
    if (currentPair != null) {
      dispatch("fetchSaleTokenInfo");
      dispatch("fetchWeights");
      dispatch("fetchSecondsRemaining");
      dispatch("fetchTokenPrice");
    }
  },
  async fetchSecondsRemaining({ getters, commit }) {
    const pair = getters.currentPair;
    const secondsRemaining = pair.end_time - Math.floor(Date.now() / 1000);

    commit(
      "setSecondsRemaining",
      success(secondsRemaining > 0 ? secondsRemaining : 0)
    );
  },
  async fetchSaleTokenInfo({ getters, commit, dispatch }) {
    const pair = getters.currentPair;
    const saleTokenAddress = saleAssetFromPair(pair.asset_infos).info.token
      .contract_addr;
    const saleTokenInfo = await getTokenInfo(terra, saleTokenAddress);
    commit("setSaleTokenInfo", saleTokenInfo);
    dispatch("fetchPool");
  },
  async fetchWeights({ getters, commit }) {
    const pair = getters.currentPair;
    const nativeToken = nativeTokenFromPair(pair.asset_infos).info.native_token
      .denom;
    const [nativeTokenWeight, saleTokenWeight] = await getWeights(
      terra,
      pair.contract_addr,
      nativeToken
    );
    const currentLbpWeight =
      nativeTokenWeight.toFixed(0) + " : " + saleTokenWeight.toFixed(0);

    commit("setPairWeights", { nativeTokenWeight, saleTokenWeight });
    commit("setCurrentLbpWeight", success(currentLbpWeight));
  },
  async fetchPool({ getters, commit }) {
    const pair = getters.currentPair;
    const pool = await getPool(terra, pair.contract_addr);
    commit("setPool", pool);

    const coinsRemaining = saleAssetFromPair(pool.assets).amount;
    const amount = coinsRemaining.slice(
      0,
      coinsRemaining.length - getters.saleTokenInfo.decimals
    );
    const totalSupply = getters.saleTokenInfo.total_supply;
    const percentage = Math.round((coinsRemaining / totalSupply) * 100);
    commit("setTokensRemaining", success({ amount, percentage }));
  },
  async fetchTokenPrice({ dispatch, commit }) {
    const oneToken = new Dec(1).mul(10 ** 6).toInt();
    const tokenPrice = await dispatch("getReverseSimulation", oneToken);
    // Set token price formatted
    // TODO round up/down price
    commit(
      "setTokenPrice",
      success(dropInsignificantZeroes(tokenPrice.toFixed(3)))
    );
  },
  async fetchPriceHistory({ commit }) {
    //TODO: Cleanup
    let res = await fetch("http://143.244.190.178/");
    let data = await res.json();
    let time = [];
    let price = [];
    let series = [];
    data.forEach((d) => {
      time.push(new Date(d.time));
      price.push((d.offer_amount / 1000000).toFixed(3));
      series.push([d.time, (d.offer_amount / 1000000).toFixed(3)]);
    });
    commit("setPriceHistory", { time, price, series });
  },
  async getSimulation({ getters }, amount) {
    const pair = getters.currentPair;
    const assetInfo = nativeTokenFromPair(pair.asset_infos).info;
    const simulation = await getSimulation(
      terra,
      pair.contract_addr,
      amount,
      assetInfo
    );
    return Dec.withPrec(simulation["return_amount"], 6);
  },
  async getReverseSimulation({ getters }, amount) {
    const pair = getters.currentPair;
    const assetInfo = saleAssetFromPair(pair.asset_infos).info;
    const simulation = await getReverseSimulation(
      terra,
      pair.contract_addr,
      amount,
      assetInfo
    );
    return Dec.withPrec(simulation["offer_amount"], 6);
  },
  async swapTokens({ getters, dispatch, commit }, swapInfo) {
    let msg;
    let buildSwapOptions = {
      pair: getters.currentPair,
      walletAddress: getters.walletAddress,
      intAmount: swapInfo.fromAmount,
    };
    if (
      swapInfo.fromSymbol.toLowerCase() ===
      getters.nativeTokenSymbol.toLowerCase()
    ) {
      msg = buildSwapFromNativeTokenMsg(buildSwapOptions);
    } else if (
      swapInfo.fromSymbol.toLowerCase() ===
      getters.saleTokenInfo.symbol.toLowerCase()
    ) {
      msg = buildSwapFromContractTokenMsg(buildSwapOptions);
    } else {
      throw "Swapping from ?";
    }

    commit("setPageLoading", { isLoading: true });
    postMsg(terra, { msg }).then(
      (result) => {
        const txInterval = setInterval(async () => {
          commit("setPageLoading", {
            isLoading: true,
            transaction: result.txhash,
          });

          let txInfo = await terra.tx.txInfo(result.txhash);
          if (txInfo) {
            clearInterval(txInterval);
            dispatch("updateBalance");
            dispatch("fetchCurrentPair");
            commit("setPageLoading", { isLoading: false });
          }
        }, 1000);
      },
      () => {
        commit("setPageLoading", { isLoading: false });
      }
    );
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
