import {
  Extension,
  LCDClient,
  MsgExecuteContract,
  StdSignature,
  StdSignMsg,
  StdTx,
} from "@terra-money/terra.js";
import {FACTORY_CONTRACT} from "@/constants";

const lcdOptions = {
  URL: 'http://143.244.190.1:3060',
  chainID: 'localterra',
}
let terra = new LCDClient(lcdOptions);
const ext = new Extension()

const state = {
  loading: {
    isLoading: false,
    label: "Processing...",
    transaction: "Follow the transaction"
  },
  walletAddress: '',
  factoryConfig: {},
};

// eslint-disable-next-line no-unused-vars
function prepareTransaction(signedMsg) {
  const {public_key, signature, stdSignMsgData} = signedMsg;
  const sig = StdSignature.fromData({
    signature,
    pub_key: {
      type: "tendermint/PubKeySecp256k1",
      value: public_key,
    },
  });

  const stdSignMsg = StdSignMsg.fromData(stdSignMsgData);
  return new StdTx(stdSignMsg.msgs, stdSignMsg.fee, [sig], stdSignMsg.memo);
}

const getters = {
  walletAddress: (state) => state.walletAddress,
  loading: (state) => state.loading,
};

const actions = {
  async initWallet({commit, dispatch}) {
    const ext = new Extension()
    const res = await ext.request('connect')
    const info = await ext.request('info')
    terra = new LCDClient({
      URL: info.payload.lcd,
      chainID: info.payload.chainID
    })
    const walletAddress = res.payload.address
    commit('setWalletAddress', walletAddress)
    dispatch('fetchFactoryConfig')
  },
  /**
   * Fetch Factory Contract config
   */
  async fetchFactoryConfig({commit, dispatch}) {
    const cfgQuery = {config: {}};
    const factoryConfig = await terra.wasm.contractQuery(
      FACTORY_CONTRACT,
      cfgQuery
    );
    commit("setFactoryConfig", factoryConfig);
    dispatch("fetchOffers");
    dispatch("fetchTradeInfos")
  },
  async swap({commit, getters, dispatch}) {
    const swapMsg = {
      offer_asset: {
        info: {
          native_token: {
            denom: "uusd"
          }
        },
        amount: 5 * 1_000_000,
      },
      max_spread: 0.01
    }
    const msg = new MsgExecuteContract(getters.walletAddress, getters.poolAddr, swapMsg)
    await executeMsg(commit, getters, dispatch, msg)
    console.log('swapped')
  }
};

async function executeMsg(commit, getters, dispatch, msg) {
  if (getters.walletAddress === "") {
    dispatch('initWallet')
    return
  }
  return new Promise((resolve) => {
    ext.once('onPost', async (res) => {
      if (res.success) {
        commit("setLoadingTransaction", res.result.txhash)
        commit("setIsLoading", true)
      }
      let interval = setInterval(async () => {
        let txInfo = await terra.tx.txInfo(res.result.txhash)
        if (txInfo) {
          resolve(txInfo)
          clearInterval(interval)
          commit("setIsLoading", false)
        }
      }, 1000)
    })
    ext.post({
      msgs: [msg]
    })
    /*
    //Suddenly stopped working (at least on Terrarium, needs to be tested on TestNet, MainNet.
    //Or hopefully we'll be able to use the "auto" fee option.
    terra.tx.estimateFee(getters.walletAddress, [msg]).then((stdFee) => {
      ext.post({
        fee: stdFee,
        msgs: [msg]
      })
    })
     */
  })
}

const mutations = {
  setWalletAddress: (state, walletAddress) => (state.walletAddress = walletAddress),
  setFactoryConfig: (state, factoryConfig) => (state.factoryConfig = factoryConfig)
};

export default {
  state,
  getters,
  actions,
  mutations,
};
