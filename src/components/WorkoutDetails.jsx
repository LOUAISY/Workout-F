

import ax from 'axios'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout,show,setShow }) => {

 
  const users = JSON.parse(localStorage.getItem('user'))
  const handleClick = async () => {
    if (!users) {
      return
    }
   await ax.delete('https://workout-b.vercel.app/api/workouts/' + workout._id,{ headers: {
      'Authorization': `Bearer ${users.token}`
    }})
  
     show?setShow(false):setShow(true)
  
   
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails