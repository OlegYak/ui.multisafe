import { thunk } from 'easy-peasy';
import { utils } from 'near-api-js';
import qs from 'query-string';
import { spaceToSnake } from '../../../utils/format';
import { config } from '../../../near/config';

const serializeData = ({ name, members, num_confirmations, amount }) => ({
  name: spaceToSnake(name),
  num_confirmations: Number(num_confirmations),
  amount: utils.format.parseNearAmount(amount),
  members: members.map(({ account_id }) => ({ account_id })),
  gas: 1e14,
});

const getCallbackUrl = (queryParams) => `${window.location.href}?${qs.stringify(queryParams)}`;

export const onCreateMultisafe = thunk(async (_, payload, { getStoreState }) => {
  const { data } = payload;
  const store = getStoreState();
  const factoryContract = store.startWork.entities.factoryContract;

  const { name, members, num_confirmations, amount, gas } = serializeData(data);

  try {
    await factoryContract.create({
      payload: {
        name,
        members,
        num_confirmations,
      },
      gas,
      amount,
      callbackUrl: getCallbackUrl({
        name,
        multisafeId: `${name}.${config.multisafeFactory.contractId}`,
      }),
    });
  } catch (error) {
    throw new Error(error);
  }
});
