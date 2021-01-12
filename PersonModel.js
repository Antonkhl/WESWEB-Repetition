const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    select: String,
});

const Person = mongoose.model('Person', personSchema);


exports.createPerson = (firstname, lastname, country) => {
    var person = new Person({
        firstname: firstname,
        lastname: lastname,
        select: country
    })

    return person
}