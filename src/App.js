import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'

import './App.css';
import Navbar from './components/Navbar';
import Signin from './components/Routes/Signin';
import Signup from './components/Routes/Signup';
import Profile from './components/Routes/Profile';
import Home from './components/Routes/Home';
import CreatePost from './components/Routes/CreatePost';
import { reducer , initialState} from './reducers/UserReducer';


export const UserContext = createContext()

const Routing=()=>{
  const navigate = useNavigate()
    const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
   if(user){
    // dispatch({type:"USER",payload:user})
    // navigate('/')
   } else{
    navigate('/signin')
   }
  },[])
  return(
    <Routes>
       <Route exact path='/' element={<Home/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create' element={<CreatePost/>}/>
    </Routes>
  )
}
function App() {

  const [state,dispatch]= useReducer(reducer,initialState)

 
  return (
    <>
   <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
       <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
    </>
  );
}

export default App;
