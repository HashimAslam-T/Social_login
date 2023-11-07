import React, { useEffect,useState } from 'react';
import Navbar from './components/Navbar';
import "./App.css";
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import SignUp from './pages/signup';
import { BrowserRouter,Routes,Route,Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';

const App = () => {
 
  // const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  console.log(user);

  const [auth,setAuth] = useState(false);
  const [message,setMessage] = useState('');
  const [name,setName] = useState('');
  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:5000/auth')
    .then(res=> { console.log(res);
      if(res.data.Status === "Success"){
        setName(res.data.name);
        // navigate('/login');
      }
      else
      {
        setMessage(res.data.Error)
      }
    })
  },[])

  

  return (
    <BrowserRouter>
    <div>
      <Navbar user={user}  message={message} name={name}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={user||name ? <Navigate to='/' /> : <Login/>}/>
        <Route path="/post/:id" element={user||name ? <Post/> : <Navigate to='/login'/>}/>
        <Route path="/signup" element={user||name ? <Navigate to='/' /> : <SignUp/>}/>
      </Routes>
    </div>
      </BrowserRouter>
    // <SignUp/>
    // <Login/>

  )
}

export default App