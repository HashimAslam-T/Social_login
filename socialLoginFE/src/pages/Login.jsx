import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';


const Login = () => {

  const [values,setValues] = useState({
    email:'',
    password:''
})


const navigate = useNavigate();
axios.defaults.withCredentials = true;
const handleSubmit = (event) =>
{
    event.preventDefault();
    // console.log(values)
 
    axios.post('http://localhost:5000/auth/login',values)
    .then(res => {
      if (res.data.Status === 'Success')
      {
        navigate('/')
        window.location.reload()
      }
      else{
        alert(res.data.Error)
      }
    })
    .catch(err => console.log(err))
}  

  const google = () =>{
    window.open('http://localhost:5000/auth/google','_self')
  }

  const github = () =>{
    window.open('http://localhost:5000/auth/github','_self')
  }

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" >
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <form onSubmit={handleSubmit} className="right">
        <input type="email" placeholder="Email" name='email'
         onChange={e => setValues({...values, email:e.target.value})}/>
        <input type="password" placeholder="Password" name='password'
         onChange={e => setValues({...values, password:e.target.value})}/>
          <button type='submit' className="submit">Login</button><br />
          <span>Or create an account</span>
         <Link to="/signup"> <button className="submit">Sign In</button></Link>
        </form>
      </div>
    </div>
  )
}

export default Login