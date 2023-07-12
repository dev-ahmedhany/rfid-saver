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
        const wristband_id = input.value
        const place = (form.elements[1] as HTMLSelectElement).value
        const isIn = (form.elements[2] as HTMLInputElement).checked
        input.value = ''
        //send to firestore
        const db = getFirestore();
        try {
          const docRef = await addDoc(collection(db, "checkinandout"), {
            wristband_id,
            place,
            isIn,
            timestamp: serverTimestamp()
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }}>
      <input className="rfid-input" name='rfid' autoFocus type="text" placeholder="RFID" />
      <br />
      <br />
      <br />
      <br />
      <select className="place-input" name="place">
        <option value="class">Class</option>
        <option value="bus">Bus</option>
      </select>
      <br />
      <br />
      <br />
      <br />
      <input type='checkbox' name='isIn' value='true' defaultChecked />
      <label htmlFor='isIn'>In</label>
      </form>
  )
}
