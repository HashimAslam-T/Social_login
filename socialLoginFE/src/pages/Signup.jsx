import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';


const SignUp = () => {

   const [values,setValues] = useState({
        name:'',
        email:'',
        password:''
    })
   
    
    const navigate = useNavigate();
    const handleSubmit = (event) =>
    {
        event.preventDefault();
        // console.log(values)
     
        axios.post('http://localhost:5000/auth/register',values)
        .then(res => {
          if (res.data.Status === 'Success')
          {
            navigate('/login')
          }
          else{
            alert("Error")
          }
        })
        .catch(err => console.log(err))
    }  

    const google = () =>{
      window.open('http://localhost:5000/auth/google','_self')
     }

  return (
    <div className="signup">
      <h1 className="signupTitle">Sign Up Here</h1>
      <div className="signupWrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" >
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" >
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <form onSubmit={handleSubmit} className="signupRight">
          <input type="text" placeholder="Username" name='name'
           onChange={e => setValues({...values, name:e.target.value})}/>
          <input type="email" placeholder="Email"  name='email'
           onChange={e => setValues({...values, email:e.target.value})}/>
          <input type="text" placeholder="Password" name='password'
           onChange={e => setValues({...values, password:e.target.value})}/>
          <button type='submit' className="submit">Sign Up</button><br />
          <span>Or if already have an account</span>
          <Link to = "/login"><button className="submit">Log In</button></Link>
        </form>
      </div>
    </div>
  )
}

export default SignUp