
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import "firebase/auth"; //for authentication
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut  } from "firebase/auth";

import { ref as storageRef , uploadBytesResumable } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 
import { collection, query, orderBy, startAfter, limit, addDoc,getDocs,limitToLast,setDoc,startAt ,doc,endBefore,where,endAt  } from "firebase/firestore";  


const firebaseConfig = {
  apiKey: "AIzaSyBbil2ybdX8vAFNU5KAxVCy27V2rpxHYUI",
  authDomain: "testtask-2397c.firebaseapp.com",
  projectId: "testtask-2397c",
  storageBucket: "testtask-2397c.appspot.com",
  messagingSenderId: "279144141474",
  appId: "1:279144141474:web:dc7e0e35cf5cc70f457dfb",
  databaseURL: "https://testtask-2397c.firebaseio.com/"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

export const signUpEmailPwd=(email,password)=>{
 return createUserWithEmailAndPassword(auth,email, password);
}
export const  signInEmailPwd= (email,password)=>{
 return signInWithEmailAndPassword(auth, email, password);
}

export const signOutApp=()=>{
  return signOut(auth);
}

export const imageupload = (userId, banner) =>{
    if (!banner) return;
        const sotrageRef = storageRef(storage, `files/${banner.name}`);
        return uploadBytesResumable(sotrageRef, banner);
}

export async function writeEventData(userId,bannerPath,name,price,description,category) {
  try {
    await addDoc(collection(db, "events"), {
          userId:userId,
          bannerPath:bannerPath,
          name:name,
          price:price,
          description:description,
          category:category
        });
      // console.log("Document written with ID: ", docRef.id);
      const count = await getCountEvent();
      await setDoc(doc(db, "eventCount","Count"), {
              count: count+1,
            });
      return 'success';
       
    } catch (e) {
      return 'error';
      console.error("Error adding document: ", e);
    }
}

// export const getEventdata = async () =>{
//   const querySnapshot = await getDocs(collection(db, "events"));
//   return querySnapshot;  

// }

export const getFirstdata = async () =>{
  // const querySnapshot = await getDocs(collection(db, "events"));
  // return querySnapshot;  
  const first = query(collection(db, "events"), orderBy("name"),
               limit(3));
  const documentSnapshots = await getDocs(first);
  return documentSnapshots;

}

export const getFilterCategory = async (category) =>{
  const first = query(collection(db, "events"),
    where("category", "==", category),
   );
  const documentSnapshots = await getDocs(first);
  return documentSnapshots;
}
export const getSearchCategory = async (category) =>{
  const first = query(collection(db, "events"),
    orderBy("name"),
    startAt(category), endAt(category+'\uf8ff'),
   );
  const documentSnapshots = await getDocs(first);
  return documentSnapshots;
}


export const getNextdata = async (documentSnapshots) =>{
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  const next = query(collection(db, "events"),
      orderBy("name"),
      startAfter(lastVisible),
      limit(3));
 const docSnapshotsNext = await getDocs(next);
return docSnapshotsNext;
}
export const getPrevdata = async (documentSnapshots) =>{

  const lastVisible = documentSnapshots.docs[0];
  const next = query(collection(db, "events"),
      orderBy("name"),
      endBefore(lastVisible),
      limitToLast(3));
 const docSnapshotsNext = await getDocs(next);
return docSnapshotsNext;
}

export const getCountEvent = async () =>{
      const querySnapshot = await getDocs(collection(db, "eventCount"));
      let count=0;
      if(querySnapshot.docs.length !== 0){
        const res = querySnapshot.docs.map((value) =>  [{id: value.id,...value.data()}][0]);
        count=res[0]['count'];
      }
            return count;

}

