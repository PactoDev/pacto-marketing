import { prefix } from './reducer';
import store from '..';

const getType = (str) => {
  return `${prefix}_#_${str}`;
};

export default {
  signIn: (user) => {
    store.dispatch({
      type: getType('SIGN_IN'),
      user,
    });
  },
  close: () => {
    store.dispatch({ type: getType('SIGN_OUT') });
  },
};
