const prefix = 'AUTHENTICATION'; // Better be unique!!!

const getInitialState = () => ({ user: null });

const getNewState = (prevState, action) => {
  let state = prevState;
  if (state === undefined) { state = getInitialState(); }
  if (!action) { return state; }
  switch (action.type.replace(`${prefix}_#_`, '')) {
  case 'SIGN_IN':
    return { user: action.user };
  case 'SIGN_OUT':
    return { user: null };
  default:
    return state;
  }
};

export default getNewState;
export { prefix };
