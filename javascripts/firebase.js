 
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
  import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"


  const firebaseConfig = {
    apiKey: "AIzaSyB2kLx9qStFXAxRliW-sqckuzNkFK3KlS0",
    authDomain: "bonsaishop-c0c40.firebaseapp.com",
    projectId: "bonsaishop-c0c40",
    storageBucket: "bonsaishop-c0c40.appspot.com",
    messagingSenderId: "942908854192",
    appId: "1:942908854192:web:19f71924adb7def08c9075"
  }

  const app = initializeApp(firebaseConfig);

  const dataBase= getFirestore(app);


  export const getProducts = async ()=> {
  
  const querySnapshot = await getDocs(collection(dataBase,"Productos"));

const products = []

  querySnapshot.forEach((doc) => {

    products.push(doc);

});
    
    return products;

} 

export const getProduct = async (id) => {

    const docRef = doc(dataBase,"Productos", id);

    const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  return docSnap;
} else {

  console.log("No such document!");
}

}
