const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUserByUsername) {
const authenticateUser = async (username, password, done) => {
const user = getUserByUsername(username)
if (user == null) {
    return done(null, false, {message: 'No user with that Username' })
}

try {
 if (await bcrypt.compare(password, user.password)) {
return done(null, user)

 } else {
     return done(null, false, { message: 'Password incorrect' })
 }
} catch(e) {
return done(e)
}
}

passport.use(new localStrategy({usernameField: 'username' },
authenticateUser))
passport.seriallizeUser(function(req, user, done) {
done(null, user.user_id);
});

passport.deseriallizeUser(function(user_id, done) {
  getUserInfo(user_id).then(function(user) {
return done(null, user);
  }, function(err) {
      return done(err,null);
  }); 
});
}

module.exports = initialize;