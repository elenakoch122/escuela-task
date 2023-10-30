#### Ссылка на [деплой версию](https://escuela-fd3f6.web.app/)
## Задание:
Ниже дан код сохранения событий в базу firebase firestore.
0) Установить нужные зависимости. Запустить
1) Добавить данные от своего firebase проекта, чтобы данные сохранялись.
2) Переписать код на redux. Можно добавлять компоненты если надо будет.
3) Сделай деплой на firebase hosting.

Приложить как результат публичную ссылку на деплой версию и ссылку на гитхаб проект.

Код:

```
import logo from './logo.svg';
import './App.css';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { serverTimestamp, Timestamp } from 'firebase/firestore'



const firebaseConfig = {
  apiKey: // take it from your firebase project
  // ...another code
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {

const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
const [dateStart, setStart] = useState("")
const [dateEnd, setEnd] = useState("")

const onSave = async () => {
  console.log("start")

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
}

useEffect(() => {
  getDocs(collection(db, "promotions")).then((querySnapshot)=>{
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().title}`);
    });
  });
},[])

return (
  <div className="App">
    <input placeholder="дата старта" type={"date"} value={dateStart} onChange={(e) => setStart(e.target.value)}/>
    <input placeholder="дата окончания" type={"date"} value ={dateEnd} onChange={(e) => setEnd(e.target.value)}/>
    <input placeholder="Название" value = {title} onChange={(e) => setTitle(e.target.value)}/>
    <input placeholder="Описание" value = {description} onChange={(e) => setDescription(e.target.value)}/>
    <button onClick={onSave}>SAVE</button>
  </div>
);
}

export default App;
```
