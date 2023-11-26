import {  useEffect, useState } from "react"
import ax from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

const navigate=useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
     
      setIsLoading(true)
   setError(null)
   
   const response = await ax.post('https://workout-b.vercel.app/api/user/login' ,{email,password} )
 
  
   navigate('/')
   window.location.reload();
 // save the user to local storage
       localStorage.setItem('user', JSON.stringify(response.data))
  
    
    
  
     // update the auth context
    //  window.location.reload(true);
     // dispatch({type: 'LOGIN', payload: json})

     // update loading state
     setIsLoading(false)

   } catch (error) {
   
      setIsLoading(false)
     setError('please fill out the right credentials')
   }
   
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
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

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login