import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { serverTimestamp, Timestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBbnvZgwcJngJeuc4Sp7vLu5RttJaIdiTE",
  authDomain: "escuela-fd3f6.firebaseapp.com",
  projectId: "escuela-fd3f6",
  storageBucket: "escuela-fd3f6.appspot.com",
  messagingSenderId: "455910900291",
  appId: "1:455910900291:web:e218ebd38057290af00af6",
  measurementId: "G-97CZBMW3NM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setStart] = useState("");
  const [dateEnd, setEnd] = useState("");

  const onSave = async () => {
    console.log("start");

    try {
      const docRef = await addDoc(collection(db, "promotions"), {
        title,
        description,
        isSite: true,
        lang: "ru",
        btnLink: "Записаться",
        link: "https://escuela.pro/razgovornyj_klub_ispanskogo_jazyka_onlajn",
        end: Timestamp.fromDate(new Date(dateEnd)),
        start: Timestamp.fromDate(new Date(dateStart)),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    getDocs(collection(db, "promotions")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().title}`);
      });
    });
  }, []);

  return (
    <div className="App">
      <input placeholder="дата старта" type={"date"} value={dateStart} onChange={(e) => setStart(e.target.value)} />
      <input placeholder="дата окончания" type={"date"} value={dateEnd} onChange={(e) => setEnd(e.target.value)} />
      <input placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={onSave}>SAVE</button>
    </div>
  );
}

export default App;