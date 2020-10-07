export default(state = null, action) => {
  const {type, payload} = action;
  switch (type) {

    case 'USER_SET':
      return payload;
    case 'USER_CREATE':
      return [
        payload, ...state
      ];
    case 'USER_UPDATE':
      return state.map(item => (item.id === payload.id
        ? payload
        : item));
    case 'USER_DELETE':
      return state.filter(item => item.id !== payload.id);
    default:
      return state;
  }
};
