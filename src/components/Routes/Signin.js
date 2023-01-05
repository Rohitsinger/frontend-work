import React,{useState,useContext} from 'react'
import '../Style/Signin.css'
import { Link,useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'
const Signin = () => {
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const PostData = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html:"invalid email", classes:"#388e3c green darken-2"}) 
      return 
    }
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
     
      email,
      password
   })
    },
    
    ).then((res)=>res.json()).then((data)=>{
      console.log(data);
      if(data.error){
        M.toast({html:data.error, classes:"#ef5350 red lighten-1"})
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html:"signedin successfully", classes:"#388e3c green darken-2"})
        navigate('/')
      }
    }).catch(err=>{
      console.log(err);
    })

  
  }
  return (
    <div className='mycard'>
       <div className='card auth-card'>
        <h2>Instagram</h2>
        <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="waves-effect waves-light btn" onClick={()=>PostData()}>Login</button>
     <h5>
        <Link to ='/signup' >Don't Have an Account</Link>
     </h5>
       </div>
    </div>
  )
}

export default Signin
