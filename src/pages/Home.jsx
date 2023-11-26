import { useEffect, useState }from 'react'



// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import ax from 'axios'
const Home = () => {
  const [workouts, setWorkouts] = useState(null)
  const [show, setShow] = useState(false)

  const users = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // https://bvc-46jr.onrender.com
        let response = await ax.get("https://workout-b.vercel.app/api/workouts", {
          headers: {'Authorization': `Bearer ${users.token}`},
        });
        console.log(response.data)
        setWorkouts(response.data)

      } catch (err) {
        console.log(`ERROR! ${err}`);
      }
     
  
    }

    if (users) {
      fetchWorkouts()
    }
  }, [show])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
            <WorkoutDetails workout={workout} setShow={setShow} show={show} key={workout._id} />
        ))}
      </div>
      <WorkoutForm setShow={setShow} show={show} />
    </div>
  )
}

export default Home