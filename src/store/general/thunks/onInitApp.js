import { thunk } from 'easy-peasy';
import { connect, keyStores, WalletConnection } from 'near-api-js';

// TODO move configs to config folder
export const onInitApp = thunk(async (_, payload, { getStoreActions }) => {
  const { history } = payload;
  const actions = getStoreActions();
  const initApp = actions.general.initApp;
  const initNear = actions.general.initNear;
  const onRouteChange = actions.general.onRouteChange;

  const near = await connect({
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'http://wallet.testnet.near.org',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  });

  const wallet = new WalletConnection(near, 'multisafe');

  initNear({
    near,
    wallet,
    user: {
      isConnected: wallet.isSignedIn(),
      accountId: wallet.getAccountId(),
    },
  });

  // Handle redirects
  if (history.location.pathname === '/') {
    history.replace('/welcome');
  }

  await onRouteChange({ history, withLoading: false });
  initApp();
});
