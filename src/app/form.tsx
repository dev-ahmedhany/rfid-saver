'use client'

export default function Form() {
  return (

      <form onSubmit={(e)=>{
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const input = form.elements[0] as HTMLInputElement
        if(!input.value) return
        console.log(input.value)
        //TODO: send to server
        
        form.reset()
      }}>
      <input className="rfid-input" name='rfid' autoFocus type="text" placeholder="RFID" />
      </form>
  )
}
