import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import IMessage from './IMessage'
import {selectUser,login,logout} from './features/userSlice'
import './App.css';
import Login from './Login';
import {auth} from './firebase'
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(authuser=>{
      if(authuser){
        dispatch(login({
          uid:authuser.uid,
          photo:authuser.photoURL,
          email:authuser.email,
          displayName:authuser.displayName
        }))

      }else{
          dispatch(logout());
      }
    })
  
  }, [])
  return (
    <div className="app">   
    {user ? (
      <IMessage/>
    ):(
      <Login />
    )

    
  }  
    </div>
  );
}

export default App;
