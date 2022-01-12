import { FACTORY_CONTRACT } from "../../constants";
import { connectExtension } from "@/terra/extension";
import { buildClient } from "../../terra/client";
import { getBalance, getLBPs, getReverseSimulation, getSimulation, getTokenBalance, getTokenInfo, getWeights } from "../../terra/queries";
import { PAIR_CONTRACT } from "../../constants";
import { nativeTokenFromPair, saleAssetFromPair } from "../../helpers/asset_pairs";
import { Dec } from "@terra-money/terra.js";
import { dropInsignificantZeroes } from "../../helpers/number_formatters";

let terra = buildClient({
  URL: 'http://143.244.190.1:3060',
  chainID: "localterra"
});

const state = {
  loading: {
    isLoading: false,
    label: "Processing...",
    transaction: "Follow the transaction"
  },
  walletAddress: '',
  balance: 0,
  tokenBalance: 0,
  tokenPrice: 0,
  currentPair: {},
  pairWeights: {},
  saleTokenInfo: {},
};

const getters = {
  walletAddress: (state) => state.walletAddress,
  balance: (state) => state.balance,
  tokenBalance: (state) => state.tokenBalance,
  tokenPrice: (state) => state.tokenPrice,
  pairWeights: (state) => state.pairWeights,
  currentPair: (state) => state.currentPair,
  saleTokenInfo: (state) => state.saleTokenInfo,
  loading: (state) => state.loading,
};

const mutations = {
  setWalletAddress: (state, walletAddress) => (state.walletAddress = walletAddress),
  setBalance: (state, balance) => (state.balance = balance),
  setTokenBalance: (state, tokenBalance) => (state.tokenBalance = tokenBalance),
  setFactoryConfig: (state, factoryConfig) => (state.factoryConfig = factoryConfig),
  setTokenPrice: (state, tokenPrice) => (state.tokenPrice = tokenPrice),
  setPairWeights: (state, pairWeights) => (state.pairWeights = pairWeights),
  setCurrentPair: (state, currentPair) => (state.currentPair = currentPair),
  setSaleTokenInfo: (state, saleTokenInfo) => (state.saleTokenInfo = saleTokenInfo),
};

const actions = {
  async initWallet({ commit, dispatch }) {
    const { wallet, info } = await connectExtension()
    terra = buildClient({
      URL: info.lcd,
      chainID: info.chainID
    })
    commit("setWalletAddress", wallet.address)
    dispatch("fetchCurrentPair")
  },
  async fetchCurrentPair({ commit, dispatch }) {
    const lbps = (await getLBPs(terra, FACTORY_CONTRACT)).filter(
      lbp => lbp.contract_addr == PAIR_CONTRACT
    )
    //const currentTime = Math.floor(Date.now() / 1000);
    const currentPair = lbps.find(
      (lbp) => lbp.contract_addr == PAIR_CONTRACT
      //(lbp) => lbp.start_time <= currentTime && lbp.end_time > currentTime
    )
    commit("setCurrentPair", currentPair)
    dispatch("fetchSaleTokenInfo")
    dispatch("fetchWeights")
    dispatch("fetchTokenBalance")
    dispatch("fetchBalance")
    dispatch("fetchTokenPrice")
  },
  async fetchSaleTokenInfo({ getters, commit }) {
    const saleTokenAddress = saleAssetFromPair(getters.currentPair.asset_infos).info.token.contract_addr
    const saleTokenInfo = await getTokenInfo(terra, saleTokenAddress)
    commit("setSaleTokenInfo", saleTokenInfo)
  },
  async fetchWeights({ getters, commit }) {
    const pair = getters.currentPair
    const nativeToken = nativeTokenFromPair(pair.asset_infos).info.native_token.denom
    const [nativeTokenWeight, saleTokenWeight] = await getWeights(terra, pair.contract_addr, nativeToken)
    commit("setPairWeights", { nativeTokenWeight, saleTokenWeight })
  },
  async fetchBalance({ getters, commit }) {
    const walletAddress = getters.walletAddress
    if (walletAddress.length !== 0) {
      const pair = getters.currentPair
      const nativeToken = nativeTokenFromPair(pair.asset_infos).info.native_token.denom;
      const balance = await getBalance(terra, nativeToken, walletAddress)
      commit("setBalance", balance)
    }
  },
  async fetchTokenBalance({ getters, commit }) {
    const walletAddress = getters.walletAddress
    if (walletAddress.length !== 0) {
      const pair = getters.currentPair
      const tokenAddress = saleAssetFromPair(pair.asset_infos).info.token.contract_addr
      const tokenBalance = await getTokenBalance(terra, tokenAddress, walletAddress)
      commit("setTokenBalance", tokenBalance)
    }
  },
  async fetchTokenPrice({ dispatch, commit }) {
    const oneUst = (new Dec(1)).mul(10 ** 6).toInt()
    const tokenPrice = await dispatch("getReverseSimulation", oneUst)
    // Set token price formatted
    commit("setTokenPrice", dropInsignificantZeroes(tokenPrice.toFixed(6)))
  },
  async getSimulation({ getters }, amount) {
    const pair = getters.currentPair
    const assetInfo = nativeTokenFromPair(pair.asset_infos).info
    const simulation = await getSimulation(terra, pair.contract_addr, amount, assetInfo)
    return Dec.withPrec(simulation['return_amount'], 6)
  },
  async getReverseSimulation({ getters }, amount) {
    const pair = getters.currentPair
    const assetInfo = saleAssetFromPair(pair.asset_infos).info
    const simulation = await getReverseSimulation(terra, pair.contract_addr, amount, assetInfo)
    return Dec.withPrec(simulation['offer_amount'], 6)
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
