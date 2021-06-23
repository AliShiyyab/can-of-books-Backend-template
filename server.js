'use strict';
/*********************************************************/
const express = require('express');
const cors = require('cors');
require('dotenv').config();
/*********************************************************/
const server = express();
server.use(cors());
const bodyParser = require('body-parser')
/*********************************************************/
server.use(express.json())
/*********************************************************/
const mongoose = require('mongoose'); // import
mongoose.connect('mongodb://localhost:27017/favBooks', {  //connect with express
    useNewUrlParser: true, useUnifiedTopology: true
});
const BookSchema = new mongoose.Schema({
    name:String,
    description:String,
    status:String,
  });
const BooksSchema = new mongoose.Schema({  // create
    email: String,
    books: [BookSchema],
});
const booksModel = mongoose.model('books', BooksSchema);
/*********************************************************/
let homeHandler = (req, res) => { res.send('Hello World!') }
function booksHandler(req, res) {
    const {email} = req.query ;
  console.log(email);
  booksModel.find({email:email} , (error , data) => {
    if(error) {console.log(error);}
    else{
    res.send(data[0].books);}
  } );
};
const addNewBook = (req, res) => {
    const { bookName, description } = req.body;
    const email = req.query;
    booksModel.find({ email: email }, (error, user) => {
        if (error) res.send(error);
        user[0].books.push({
            name: bookName,
            description: description,
            status: 'Status 200',
        });
        user[0].save();
        res.send(user[0]);
    });
};
const deleteBook = (req, res) => {
    const id = Number(req.params.id);
    console.log('delete test id= ', id);
    const email = req.query;
    booksModel.find({ email: email }, (error, user) => {
        if (error) res.send(error);
        const filterdBooks = user[0].books.filter((book, index) => {
            return book.id !== index;
        });
        user[0].books = filterdBooks;
        user[0].save();
        res.send(user[0].books);
    });
};
/*********************************************************/
const PORT = process.env.PORT;
/*********************************************************/
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT} `)
})
/*********************************************************/
server.get('/books', booksHandler);
server.get('/', homeHandler);
server.delete('/books/:id' , deleteBook);
server.post('/books' , addNewBook);
//////////////////////mongoose////////////////////////////

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
    const user2 = new booksModel({
        email: 'aliakefsh@gmail.com',
        books: [{
            name: 'Sharluk Holmez',
            description: 'A person who searched an another pesron is killed someone',
            status: 'LIFE-CHANGING'
        }, {
            name: 'DeathWar',
            description: 'What happened in the second world War',
            status: 'RECOMMENDED TO ME'
        }],
    });
    console.log(user1);
    console.log(user2); // 'Silence'
    user1.save();
    user2.save();
}
seedBooks();