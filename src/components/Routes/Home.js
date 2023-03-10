import React,{useEffect, useState,axios, useContext} from 'react'
import { UserContext } from '../../App'
const Home = () => {
    const [data,setData] = useState([])
    const{state,dispatch} = useContext(UserContext)

    // const fetchData=async()=>{
    //         const result = await axios.get("/allPost")
    //         .then((res)=>console.log(res))
            
    //     }
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result);
            setData(result.posts)
        })

       
    },[])

    const likePost=(id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result);
            // setData(result.posts)
            const newData= data.map((item)=>{
                if(item._id==result._id){
                    return result
                } else{
                    return item;
                }
            })
            setData(newData)
        }).catch(err=>console.log(err));

    }
    const unlikePost=(id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            
            // console.log(result);
            // setData(result.posts)
             const newData= data.map((item)=>{
                if(item._id==result._id){
                    return result
                } else{
                   return item;
                }
            })
            setData(newData)
        }).catch(err=>console.log(err));

    }
  return (
    <div className='home' style={{ display:"grid",placeItems:"center",textAlign:"center"}}>
    {
        data.map((item)=>{
          return(
            <div className='card home_card' key={item._id}>
        {/* <h5>{item.postedBy.name}</h5> */}
        <div className='card-image'>
            <img src={item.photo} alt="" />
        </div>
        <div className='card-content'>
        <i className="material-icons"  style={{color:"red"}}>favorite</i>
        
        <i className="material-icons" onClick={()=>likePost(item._id)}>thumb_up</i>
        <i className="material-icons" onClick={()=>unlikePost(item._id)}>thumb_down</i>
            <h5>{item.likes.length} likes</h5>
            <h6>{item.title}</h6>
            <p>{item.body}</p>
            <input type="text" placeholder='add a comment' />
        </div>
       </div>
          )
        })
    }
       
       
    </div>
  )
}

export default Home
