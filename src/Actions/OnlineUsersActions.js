import firebase from 'firebase';
import {
 browserHistory
} from 'react-router-dom';
import history from '../Lib/browserHistory';

export const onlineUsersSet = usersList => ({
 type: 'ONLINE_USERS_SET',
 payload: usersList
});
export const onlineUsersAdd = usersList => ({
 type: 'ONLINE_USERS_UPDATE',
 payload: usersList
});
export const onlineUsersUpdate = usersList => ({
 type: 'ONLINE_USERS_ADDED',
 payload: usersList
});
export const onlineUsersRemove = usersList => ({
 type: 'ONLINE_USERS_REMOVED',
 payload: usersList
});

// export const  = user => ({type: 'USER_UPDATE', payload: user}); export const
// setFirebaseUserToRedux = user => dispatch => new Promise((resolve, reject) =>
// {  // console.log(user);  firebase   .database()   .ref('users/' + user.uid)
// .once('value')   .then((snapshot) => {    const userProfile = snapshot.val();
//    // console.log(userProfile);    firebase .database() .ref('onlineUsers/' +
// user.uid) .set(userProfile.account); resolve(dispatch(userSet(userProfile)));
//   }) .then(() => { history.push('/dashboard');   }); });

export const setOnlineUsersToStore = list => dispatch => new Promise((resolve, reject) => {
 console.log('recieved list in setonlinuserstostore actions', list)
 resolve(dispatch(onlineUsersSet(list)))
})