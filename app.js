const mongoose = require("mongoose")
const io = require('socket.io')(3000)
const personModel = require("./PersonModel")
const dBModule = require("./dBModule")
const express = require('express')
const app = express()
const port = 3000

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
  users[socket.id] = name
  socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
   socket.broadcast.emit('chat-message', { message: message, name:
    user[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
   })
})

const staticDir = __dirname + '\\client\\'
app.use(express.static(staticDir))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(express.static('client'))
app.use('/css', express.static(__dirname + 'client/css'))
app.use('/scss', express.static(__dirname + 'client/scss'))

app.use(express.static('views'))
app.use('/Bilder', express.static(__dirname + 'views/Bilder'))


app.set('view engine' , 'ejs')

app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.ejs')
})

app.get('/form', (req, res) => {
  res.render(__dirname + '/views/form.ejs')
})

app.get('/livechat', (req, res) => {
  res.render(__dirname + '/views/livechat.ejs')
})

app.post('/form', function (req, res) {
    const person = personModel.createPerson(req.body.firstname, req.body.lastname, req.body.country)
    dBModule.storeElement(person)

    res.redirect('/')
})

getPost = () => {
axios.get('/form')
.then(() => {
console.log('We got data sir!')
});
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`))