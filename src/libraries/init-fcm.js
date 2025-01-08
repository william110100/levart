import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/database';
import { firebaseConfig } from '../secrets/firebase';

const { REACT_APP_VAPID_KEY } = process.env;
const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);
const messaging = initializedFirebaseApp.messaging();
const database = initializedFirebaseApp.database();
// messaging.getToken({
//   vapidKey: REACT_APP_VAPID_KEY
// });
export { messaging, database };
