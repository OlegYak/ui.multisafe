import { createStore } from 'easy-peasy';
import { thunks } from './thunks';
import { general } from './general';
import { persist } from './persist';
import { startWork } from './startWork';
import { multisafe } from './multisafe';

export const store = createStore(
  {
    general,
    startWork,
    multisafe,
    persist,
    ...thunks,
  },
  {
    name: 'MultiSafe',
  },
);
