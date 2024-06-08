import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBqWxasez474Y-UDhMUHtk-m-ZY_2ghFLo",
  authDomain: "projeto-iot-3eecd.firebaseapp.com",
  projectId: "projeto-iot-3eecd",
  storageBucket: "projeto-iot-3eecd.appspot.com",
  messagingSenderId: "196875787269",
  appId: "1:196875787269:web:8efda08f6b611db66b906c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()