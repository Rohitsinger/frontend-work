import React,{useState} from 'react'
import '../Style/Signin.css'
import { Link,useNavigate } from 'react-router-dom'
import M from 'materialize-css'
// import { Button } from 'bootstrap'
const Signup = () => {
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const PostData = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html:"invalid email", classes:"#388e3c green darken-2"}) 
      return 
    }
    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
      name,
      email,
      password

    })
    },
    
    ).then((res)=>res.json()).then((data)=>{
      if(data.error){
        M.toast({html:data.error, classes:"#ef5350 red lighten-1"})
      }
      else{
        M.toast({html:data.message, classes:"#388e3c green darken-2"})
        navigate('/signin')
      }
    }).catch(err=>{
      console.log(err);
    })

  
  }
  return (
    <>
    <div>
     <div className='mycard'>
       <div className='card auth-card'>
        <h2>Instagram</h2>
        <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="waves-effect waves-dark btn" onClick={()=>PostData()}>Sign Up</button>
        <h5>
        <Link to ='/signin'>Have an Account?</Link>
     </h5>
       </div>
    </div>
    </div>
    </>
  )
}

export default Signup

