import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEKEY,
  authDomain: "for-mj-bc3bb.firebaseapp.com",
  projectId: "for-mj-bc3bb",
  storageBucket: "for-mj-bc3bb.appspot.com",
  messagingSenderId: "784291556788",
  appId: "1:784291556788:web:019785f64dd4c4213856e1",
  measurementId: "G-JVHBKDYW13"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
// export 설정해야 다른 파일에서 사용 가능
export const db = getFirestore(app);

