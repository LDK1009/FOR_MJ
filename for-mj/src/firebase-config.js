import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEKEY,
  authDomain: "for-mj-39b53.firebaseapp.com",
  projectId: "for-mj-39b53",
  storageBucket: "for-mj-39b53.appspot.com",
  messagingSenderId: "114908257627",
  appId: "1:114908257627:web:d4b38d34883e5b2c850e7e",
  measurementId: "G-BN06J00X7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
// export 설정해야 다른 파일에서 사용 가능
export const db = getFirestore(app);

