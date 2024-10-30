import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCyYEskTTQwIH0CoHW0C0mmsWIsCic9qVU",
    authDomain: "datn2024-77f60.firebaseapp.com",
    projectId: "datn2024-77f60",
    storageBucket: "datn2024-77f60.appspot.com",
    messagingSenderId: "1068606234281",
    appId: "1:1068606234281:web:2e754f34027604f209d3b8",
    // measurementId: "G-GKW8EPCZ86"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage()
export default auth