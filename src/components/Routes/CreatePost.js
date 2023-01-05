import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'
const CreatePost = () => {
  const navigate = useNavigate()
  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [image,setImage] = useState("")
const [url,setUrl] = useState("")


  const postDetails =()=>{

    const data = new  FormData()
    data.append("file",image)
    data.append("upload_preset", "instaclone")
    data.append("cloud_name", "dljovfltn")
    fetch("https://api.cloudinary.com/v1_1/dot0pk1dh/image/upload",{
      method:"post",
      body:data
    }).then((res)=>res.json()).then(data=>{setUrl(data.url)}).catch(err=>console.log(err))

    

  }

useEffect(()=>{
  if(url){
  fetch("/createpost",{
    method:"post",
    headers:{
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("jwt")
  },
  body:JSON.stringify({
   
    title,
    body,
    pic:url
  })
  },
  
  ).then((res)=>res.json()).then((data)=>{
    console.log(data);
    if(data.error){
      M.toast({html:data.error, classes:"#ef5350 red lighten-1"})
    }
    else{
      M.toast({html:"created post successfully", classes:"#388e3c green darken-2"})
      navigate('/')
    }
  }).catch(err=>{
    console.log(err);
  })
}
},[url])

  return (
    <div className='card input_field' style={{margin:"10px auto", marginTop:"70px", maxWidth:"500px", padding:"20px", textAlign:"center"}}>
   
      <input type="text" placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input type="text" placeholder='body' value={body} onChange={(e)=>setBody(e.target.value)}/>
      <div className="file-field input-field">
      <div className="btn">
        <span>Upload Image</span>
        <input type="file"   onChange={(e)=>setImage(e.target.files[0])} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
        
      </div>
    </div>
    
    <button className="waves-effect waves-dark btn" onClick={()=>postDetails()}>Login</button>
    </div>
  )
}

export default CreatePost
