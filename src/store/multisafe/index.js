import { initState } from './initState';
import { computed } from './computed';
import { actions } from './actions';
import { thunks } from './thunks';

export const multisafe = {
  ...initState,
  ...actions,
  ...thunks,
  computed,
};
