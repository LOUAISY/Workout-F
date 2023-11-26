import { useState } from "react"
import ax from 'axios'


const WorkoutForm = ({show,setShow}) => {
  
  
  const users = JSON.parse(localStorage.getItem('user'))
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()

    // if (!users) {
    //   setError('You must be logged in')
    //   return
    // }

    try {
      const workout = {title, load, reps}
      const users = JSON.parse(localStorage.getItem('user'))
  
      const response = await ax.post('https://workout-b.vercel.app/api/workouts/' ,workout,{ headers: {
        'Authorization': `Bearer ${users.token}`
      }})
     
         setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      show?setShow(false):setShow(true)
     
    } catch (error) {
     
      setError('please fill out all fields')
    }
   
  
   
   
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        
      />

      <label>Load (in kg):</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
       
      />

      <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
       
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm