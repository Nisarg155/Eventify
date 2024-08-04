import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: import.meta.env.REACT_APP_API_KEY,
    authDomain: import.meta.env.REACT_APP_DOMAIN,
    projectId: import.meta.env.REACT_APP_PROJECTID,
    storageBucket: import.meta.env.REACT_APP_BUCKET,
    messagingSenderId: import.meta.env.REACT_APP_MESSAGESENDERID,
    appId: import.meta.env.REACT_APP_APPID,
    measurementId: import.meta.env.REACT_APP_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

export default app;