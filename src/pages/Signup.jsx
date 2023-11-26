import { useState } from "react"
import { useNavigate } from "react-router-dom";
import ax from 'axios'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
     
      setIsLoading(true)
   setError(null)
  //  https://bvc-46jr.onrender.com
   const response = await ax.post('https://workout-b.vercel.app/api/user/signup' ,{email,password} )
 
  
 // save the user to local storage
     localStorage.setItem('user', JSON.stringify(response.data))

     // update the auth context
     navigate('/')
     window.location.reload();
     // dispatch({type: 'LOGIN', payload: json})
    
     // update loading state
     setIsLoading(false)

   } catch (error) {
   
      setIsLoading(false)
     setError('please fill out all fields')
   }
    
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup