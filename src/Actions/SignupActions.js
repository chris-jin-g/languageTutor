import firebase from 'firebase';
import {userSet} from '../Actions/UserActions';

export const handleStudentSignup = (student, history) => (dispatch) => {
  // console.log('INSIDE SIGNUP ACTIONS, INCOMING STUDENT FOR SINGUP', student);
  // ******** The signup actions only trigger for first time users, no need to
  // check database ********
  firebase
    .auth()
    .createUserWithEmailAndPassword(student.email, student.password)
    .then((authData) => {

      const account = {};
      account.uid = authData.uid;
      account.email = student
        .email
        .toLowerCase();
      account.name = student.name;
      account.username = student.username;
      account.nativeLanguage = student.nativeLanguage;
      account.age = student.age;
      account.timeZone = student.timeZone;
      account.location = student.location;
      account.isTeacher = student.isTeacher;

      //   return new Promise((resolve, reject) => { resolve(dispatch(userSet(user)));
      firebase
        .database()
        .ref(`users/${authData.uid}`)
        .set({account})
        .then(() => {
          firebase
            .database()
            .ref(`users/${authData.uid}`)
            .once('value')
            .then((snapshot) => {
              // this will either be null or populated with vehicles.
              const userProfile = snapshot.val();
              //console.log('USERPROFILE IN SIGNUP ACTIONS', userProfile);
              dispatch(userSet(userProfile));
              history.push('/dashboard');
            });
        })
        // .then(() => { });
        .catch(err => console.log(err));
    });
};
