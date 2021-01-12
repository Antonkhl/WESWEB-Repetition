const mongoose = require("mongoose")
const personModel = require("./PersonModel")
const dBModule = require("./dBModule")

const express = require('express')
const app = express()
const port = 3000

const staticDir = __dirname + '\\client\\'
app.use(express.static(staticDir))

app.use(express.json())
app.use(express.urlencoded())

app.use(express.static('client'))
app.use('/css', express.static(__dirname + 'client/css'))
app.use('/scss', express.static(__dirname + 'client/scss'))

app.use(express.static('views'))
app.use('/Bilder', express.static(__dirname + 'views/Bilder'))

app.set('view engine' , 'ejs')

app.get('', (req, res) => {
  res.render(__dirname + '/views/index.ejs')
})

app.get('/login', (req, res) => {
  res.render(__dirname + '/views/login.ejs')
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