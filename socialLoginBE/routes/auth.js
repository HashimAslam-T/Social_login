const router = require('express').Router();
const passport = require("passport");
const db = require('../database');
const bcrypt = require('bcrypt')
const CLIENT_URL = 'http://localhost:5173/';
const jwt = require('jsonwebtoken')
const salt=10;

const verifyUser = (req,res,next) => 
{
  const token = req.cookies.token;
  if(!token)
  {
    return res.json({Error:"You are not authenticated"});
  }
  else{
    jwt.verify(token,"12345",(err,decoded) =>{
        if(err){
            return res.json({Error:"Error in Token"})
        }
        else{
            req.name = decoded.name;
            next();
        }
    })
  }
}

router.get('/',verifyUser,(req,res)=>{
    return res.json({Status:"Success", name:req.name})
})

router.post('/register',(req,res) => {
   
    const sql = "insert into login(name,email,password) values(?)";
    bcrypt.hash(req.body.password.toString(), salt, (err,hash) => {
        if(err) return res.send(err);
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql,[values],(err,result) => {
            if(err) return res.send(err);
            return res.json({Status:'Success'});
        })
        
    })
})


router.post('/login',(req,res) => {
    const sql = 'select * from login where email = ?';
    db.query(sql,[req.body.email],(err, data) => {
        if(err) return res.send("login server error");
        if(data.length > 0)
        {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err,response) => {
                if(err) return res.send("Password compare error");
                if(response)
                {
                    const name = data[0].name;
                    const token = jwt.sign({name}, '12345',{expiresIn:'1d'})
                    res.cookie('token',token);
                    return res.json({Status:"Success"});
                }
                else
                {
                    return res.json({Error:"Incorrect Password or Email"});
                }
            })
        } else {
            return res.send("No email exist");
        }
    })
})

router.get("/login/success",(req,res) => {
    if (req.user)
    {
        res.status(200).json({
            success:true,
            message:"successful",
            user: req.user,
            cookies:req.cookies
        })
        // console.log(req.user)
    }
})

router.get("/login/failed",(req,res) => {
    res.status(401).json({
        success:false,
        message:"failure",
    });
});

router.get("/logout", (req,res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get('/out',(req,res) => {
    res.clearCookie('token');
    return res.json({Status:"Success"});
})

router.get("/google", passport.authenticate("google",{scope: ['profile']}));
 
router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: '/login/failed',
    })
);

router.get("/github", passport.authenticate("github",{scope: ['profile']}));
 
router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: CLIENT_URL,
        failureRedirect: '/login/failed',
    })
);

module.exports = router;