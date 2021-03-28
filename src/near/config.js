const testnet = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  multisafeFactory: {
    contractId: 'dev-1612259671980-4872321',
    methods: {
      viewMethods: [],
      changeMethods: ['create'],
    },
  },
  multisafe: {
    methods: {
      viewMethods: [
        'get_members',
        'get_request',
        'get_num_confirmations',
        'list_request_ids',
        'get_confirmations',
      ],
      changeMethods: ['add_request', 'add_request_and_confirm', 'confirm', 'delete_request'],
    },
  },
  endpoint: {
    jsonrpc: "2.0",
    id: "dontcare",
    method: "query",
    setParams({account_id}) {
      return {...this, params: {request_type: 'view_account', finality: 'final', account_id}}
    }
  }
};

const createHelpers = (config) => ({
  getCheckAccountInExplorerUrl: (accountId) => `${config.explorerUrl}/accounts/${accountId}`,
});

const getNearConfig = () => {
  const config = testnet;
  return {
    ...config,
    ...createHelpers(config),
  };
};

// TODO pass the env variable to get the real config based on the env where it runs
export const config = getNearConfig();
