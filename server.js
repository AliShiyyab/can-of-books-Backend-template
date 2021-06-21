'use strict';
/*********************************************************/
const express = require('express');
const cors = require('cors');
require('dotenv').config();
/*********************************************************/
const server = express();
server.use(cors());
/*********************************************************/
let homeHandler = (req, res) => { res.send('Hello World!') }
function booksHandler(req, res) {
    const { email, description, status, name } = req.query;
    booksModel.find({ email: email }, (err, userData) => {
        userData[0].books.push({
            name: name,
            description: description,
            status: status,
            email: email,
        })
        // userData[0].save();
        res.send(userData[0].books);
    });
}
server.get('/books', booksHandler);
server.get('/', homeHandler);
/*********************************************************/
const PORT = process.env.PORT;
/*********************************************************/
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT} `)
})
/*********************************************************/
//////////////////////mongoose////////////////////////////
const mongoose = require('mongoose'); // import
mongoose.connect('mongodb://localhost:27017/testBooks', {  //connect with express
    useNewUrlParser: true, useUnifiedTopology: true
});
const BooksSchema = new mongoose.Schema({  // create
    email: String,
    books: Array,
});
const booksModel = mongoose.model('books', BooksSchema);
function seedBooks() {
    const user1 = new booksModel({
        email: 'aboood.banyissa.94@gmail.com',
        books: [{
            name: 'The Silent Patient',
            description: 'a women may or may not have killed her husband and a theapist is determind to make her talk to discover her secrets.',
            status: 'LIFE-CHANGING'
        }, {
            name: 'The Hitchhickers Guide To The Gallaxy.',
            description: 'earth is destroyed and folks try to determine the ultimate question to the universe and everything',
            status: 'RECOMMENDED TO ME'
        }],
    });
    const user2 =  new booksModel({
        email: 'aliakefsh@gmail.com',
        books: [{
            name: 'Sharluk Holmez',
            description: 'a women may or may not have killed her husband and a theapist is determind to make her talk to discover her secrets.',
            status: 'LIFE-CHANGING'
        }, {
            name: 'DeathWar',
            description: 'earth is destroyed and folks try to determine the ultimate question to the universe and everything',
            status: 'RECOMMENDED TO ME'
        }],
    });
    console.log(user1);
    console.log(user2); // 'Silence'
    user1.save();
    user2.save();
}
// seedBooks();
