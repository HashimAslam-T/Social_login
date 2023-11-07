const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const GOOGLE_CLIENT_ID = "348490951523-aq5qd0gfpko4t5ft6kk84dio47rki3d0.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = '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';
const GITHUB_CLIENT_ID = '6acbca43c1b2e744fccf';
const GITHUB_CLIENT_SECRET = '346282bf138340106057b05ac5ac05af4e999ce0';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   
    done(null,profile)
   
  }
));

passport.use(new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
 
  done(null,profile)
 
}
));

passport.serializeUser((user, done) => {
    done(null,user);
});

passport.deserializeUser((user, done) => {
    done(null,user);
});