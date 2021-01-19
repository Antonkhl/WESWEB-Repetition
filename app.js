if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const mongoose = require("mongoose")
const personModel = require("./PersonModel")
const dBModule = require("./dBModule")
const express = require('express')
const app = express()
const port = 3000
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')
initializePassport(
  passport, 
  username => users.find(user => user.username === username)
)

const staticDir = __dirname + '\\client\\'
app.use(express.static(staticDir))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
secret: process.env.SESSION_SECRET,
resave: false,
saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('client'))
app.use('/css', express.static(__dirname + 'client/css'))
app.use('/scss', express.static(__dirname + 'client/scss'))

app.use(express.static('views'))
app.use('/Bilder', express.static(__dirname + 'views/Bilder'))

const users = []

app.set('view engine' , 'ejs')

app.get('', (req, res) => {
  res.render(__dirname + '/views/index.ejs')
})

app.get('/login', (req, res) => {
  res.render(__dirname + '/views/login.ejs')
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', (req, res) => {
  res.render(__dirname + '/views/register.ejs')
})

app.post('/register', async (req, res) => {
try {
const hashedPassword = await bcrypt.hash(req.body.password, 10)
users.push({
  id: Date.now().toString(),
  name: req.body.name,
  password: hashedPassword
})
res.redirect('/login')
} catch {
res.redirect('/register')
}
})

app.get('/forum', (req, res) => {
  res.render(__dirname + '/views/forum.ejs')
})

app.post('/forum', function (req, res) {
    const person = personModel.createPerson(req.body.firstname, req.body.lastname, req.body.country)
    dBModule.storeElement(person)

    res.redirect('/')
})

getPost = () => {
axios.get('/forum')
.then(() => {
console.log('We got data sir!')
});
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`))