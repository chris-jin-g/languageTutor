export default(state = [], action) => {
 const {type, payload} = action;
 switch (type) {
  case 'ONLINE_USERS_SET':
   return payload;
  case 'ONLINE_USERS_ADDED':
   return [
    payload, ...state
   ];
  case 'ONLINE_USERS_UPDATED':
   return state.map(item => (item.id === payload.id
    ? payload
    : item));
  case 'ONLINE_USERS_REMOVED':
   return state.filter(item => item.id !== payload.id);
  default:
   return state;
 }
};
