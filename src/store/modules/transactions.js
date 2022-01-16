import { FACTORY_CONTRACT } from "../../constants";
import { connectExtension } from "@/terra/extension";
import { buildClient } from "../../terra/client";
import {
  getBalance,
  getLBPs,
  getPool,
  getReverseSimulation,
  getSimulation,
  getTokenBalance,
  getTokenInfo,
  getWeights,
} from "../../terra/queries";
import { PAIR_CONTRACT } from "../../constants";
import {
  nativeTokenFromPair,
  saleAssetFromPair,
} from "../../helpers/asset_pairs";
import { Dec } from "@terra-money/terra.js";
import { dropInsignificantZeroes, formatTokenAmount } from "../../helpers/number_formatters";
import { NATIVE_TOKEN_SYMBOLS } from "../../helpers/token_info";

let terra = buildClient({
  URL: "http://143.244.190.1:3060",
  chainID: "localterra",
});

const state = {
  loading: {
    isLoading: false,
    label: "Processing...",
    transaction: "Follow the transaction",
  },
  walletAddress: "",
  balance: 0,
  tokenBalance: 0,
  tokenPrice: "0",
  currentPair: {},
  secondsRemaining: 0,
  pairWeights: {},
  pool: {},
  saleTokenInfo: {},
};

const getters = {
  walletAddress: (state) => state.walletAddress,
  balance: (state) => formatTokenAmount(state.walletAddress.length > 0 ? state.balance : 0, 6),
  tokenBalance: (state) => formatTokenAmount(state.walletAddress.length > 0 ? state.tokenBalance : 0, 6),
  nativeTokenSymbol: (state) => {
    const denom = state.pair ? nativeTokenFromPair(state.pair).denom : "uusd"
    return NATIVE_TOKEN_SYMBOLS[denom]
  },
  tokenPrice: (state) => state.tokenPrice,
  pairWeights: (state) => state.pairWeights,
  nativeTokenWeight: (state) => (state.pairWeights.nativeTokenWeight ?? new Dec()).toFixed(0),
  saleTokenWeight: (state) => (state.pairWeights.saleTokenWeight ?? new Dec()).toFixed(0),
  pool: (state) => state.pool,
  coinsRemaining: (state) => {
    if (state.pool.assets) {
      const coinsRemaining = saleAssetFromPair(state.pool.assets).amount
      return coinsRemaining.slice(0, coinsRemaining.length - state.saleTokenInfo.decimals)
    }
    return 0
  },
  coinsRemainingPercentage: (state) => {
    if (state.pool.assets) {
      const coinsRemaining = saleAssetFromPair(state.pool.assets).amount
      const totalSupply = state.saleTokenInfo.total_supply
      return Math.round((coinsRemaining / totalSupply) * 100)
    }
    return 0
  },
  currentPair: (state) => state.currentPair,
  secondsRemaining: (state) => state.secondsRemaining,
  saleTokenInfo: (state) => state.saleTokenInfo,
  loading: (state) => state.loading,
  priceHistory: (state) => () => {
    return {
      time: state.time,
      price: state.price,
      series: state.series
    }
  }
};

const mutations = {
  setWalletAddress: (state, walletAddress) => (state.walletAddress = walletAddress),
  setBalance: (state, balance) => (state.balance = balance),
  setTokenBalance: (state, tokenBalance) => (state.tokenBalance = tokenBalance),
  setFactoryConfig: (state, factoryConfig) => (state.factoryConfig = factoryConfig),
  setTokenPrice: (state, tokenPrice) => (state.tokenPrice = tokenPrice),
  setPairWeights: (state, pairWeights) => (state.pairWeights = pairWeights),
  setPool: (state, pool) => (state.pool = pool),
  setCurrentPair: (state, currentPair) => (state.currentPair = currentPair),
  setSecondsRemaining: (state, secondsRemaining) => (state.secondsRemaining = secondsRemaining),
  setSaleTokenInfo: (state, saleTokenInfo) => (state.saleTokenInfo = saleTokenInfo),
  setPriceHistory: (state, priceHistory) => {
    state.price = priceHistory.price
    state.time = priceHistory.time
    state.series = priceHistory.series
  }
};

const actions = {
  async initWallet({ commit, dispatch }) {
    const { wallet, info } = await connectExtension();
    terra = buildClient({
      URL: info.lcd,
      chainID: info.chainID,
    });
    commit("setWalletAddress", wallet.address);
    dispatch("fetchCurrentPair");
  },
  async fetchBalance({ getters, commit }) {
    const walletAddress = getters.walletAddress;
    if (walletAddress.length !== 0) {
      const pair = getters.currentPair;
      const nativeToken = nativeTokenFromPair(pair.asset_infos).info
        .native_token.denom;
      const balance = await getBalance(terra, nativeToken, walletAddress);
      commit("setBalance", balance);
    }
  },
  async fetchTokenBalance({ getters, commit }) {
    const walletAddress = getters.walletAddress;
    if (walletAddress.length !== 0) {
      const pair = getters.currentPair;
      const tokenAddress = saleAssetFromPair(pair.asset_infos).info.token.contract_addr;
      const tokenBalance = await getTokenBalance(
        terra,
        tokenAddress,
        walletAddress
      );
      commit("setTokenBalance", tokenBalance);
    }
  },
  async fetchCurrentPair({ commit, dispatch }) {
    const lbps = (await getLBPs(terra, FACTORY_CONTRACT)).filter(
      (lbp) => lbp.contract_addr == PAIR_CONTRACT
    );
    //const currentTime = Math.floor(Date.now() / 1000);
    const currentPair = lbps.find(
      (lbp) => lbp.contract_addr == PAIR_CONTRACT
      //(lbp) => lbp.start_time <= currentTime && lbp.end_time > currentTime
    );
    commit("setCurrentPair", currentPair);
    dispatch("fetchSaleTokenInfo");
    dispatch("fetchWeights");
    dispatch("fetchPool");
    dispatch("fetchSecondsRemaining");
    dispatch("fetchTokenBalance");
    dispatch("fetchBalance");
    dispatch("fetchTokenPrice");
  },
  async fetchSecondsRemaining({ getters, commit }) {
    const pair = getters.currentPair;
    const secondsRemaining = pair.end_time - Math.floor(Date.now() / 1000);
    commit("setSecondsRemaining", secondsRemaining > 0 ? secondsRemaining : 0);
  },
  async fetchSaleTokenInfo({ getters, commit }) {
    const pair = getters.currentPair;
    const saleTokenAddress = saleAssetFromPair(pair.asset_infos).info.token
      .contract_addr;
    const saleTokenInfo = await getTokenInfo(terra, saleTokenAddress);
    commit("setSaleTokenInfo", saleTokenInfo);
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
    commit("setPairWeights", { nativeTokenWeight, saleTokenWeight });
  },
  async fetchPool({ getters, commit }) {
    const pair = getters.currentPair;
    const pool = await getPool(terra, pair.contract_addr);
    commit("setPool", pool);
  },
  async fetchTokenPrice({ dispatch, commit }) {
    const oneUst = new Dec(1).mul(10 ** 6).toInt();
    const tokenPrice = await dispatch("getReverseSimulation", oneUst);
    // Set token price formatted
    // TODO round up/down price
    commit("setTokenPrice", dropInsignificantZeroes(tokenPrice.toFixed(3)));
  },
  async fetchPriceHistory({ commit }) {
    //TODO: Cleanup
    let res = await fetch('http://143.244.190.178/');
    let data = await res.json();
    let time = [];
    let price = [];
    let series = [];
    data.forEach(d => {
      time.push(new Date(d.time))
      price.push((d.offer_amount / 1000000).toFixed(3))
      series.push([d.time, (d.offer_amount / 1000000).toFixed(3)])
    })
    commit("setPriceHistory", { time, price, series })
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
