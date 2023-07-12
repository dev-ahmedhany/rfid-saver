'use client'
import './firebase'
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Form() {
  return (

      <form onSubmit={async (e)=>{
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const input = form.elements[0] as HTMLInputElement
        if(!input.value) return
        const sensor_id = input.value
        form.reset()
        //send to firestore
        const db = getFirestore();
        try {
          const docRef = await addDoc(collection(db, "checkinandout"), {
            sensor_id,
            place: "bus",
            timestamp: serverTimestamp()
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }}>
      <input className="rfid-input" name='rfid' autoFocus type="text" placeholder="RFID" />
      </form>
  )
}
