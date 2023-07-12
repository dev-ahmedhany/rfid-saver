'use client'
import './firebase'
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, limit, updateDoc } from "firebase/firestore";

export default function Form() {
  return (

      <form onSubmit={async (e)=>{
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const input = form.elements[0] as HTMLInputElement
        if(!input.value) return
        const wristband_id = input.value
        const place = (form.elements[1] as HTMLSelectElement).value
        input.value = ''
        //send to firestore
        try {
          const db = getFirestore();
          const q = query(collection(db, "checkinandout"), where("wristband_id", "==", wristband_id),
           orderBy("checkintime", "desc"), limit(1));

          const querySnapshot = await getDocs(q);
          if(querySnapshot.docs.length > 0){
            const last = querySnapshot.docs[0]
            const checkouttime = last.data().checkouttime
            if(!checkouttime){
              await updateDoc(last.ref, {
                checkouttime: serverTimestamp(),
                isIn : false
              });
              return
            }
          }
          await addDoc(collection(db, "checkinandout"), {
            wristband_id,
            place,
            checkintime: serverTimestamp(),
            isIn : true
          });
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
      </form>
  )
}
