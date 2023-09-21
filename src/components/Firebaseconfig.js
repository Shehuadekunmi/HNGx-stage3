import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'process.meta.env.api_key',
    authDomain: "hngx-stage3.firebaseapp.com",
    projectId: "hngx-stage3",
    storageBucket: "hngx-stage3.appspot.com",
    messagingSenderId: "308225879547",
    appId: "1:308225879547:web:d06f8591111a5d8d936f5e",
    measurementId: "G-SP6SXXVHNN"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)