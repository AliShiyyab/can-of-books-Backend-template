'use strict';
/*********************************************************/
const express = require('express');
const cors = require('cors');
require('dotenv').config();
/*********************************************************/
const server = express();
server.use(cors());
/*********************************************************/
server.use(express.json())
/**************************** MONGO ******************************/
const mongoose = require('mongoose'); // import
mongoose.connect(process.env.MONGO_URL, {  
    useNewUrlParser: true, useUnifiedTopology: true
});
const BookSchema = new mongoose.Schema({
    name:String,
    description:String,
    status:String,
  });
const BooksSchema = new mongoose.Schema({  
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
        console.log(data[0].books);
    res.send(data[0].books);}
  } );
};
const addNewBook = (req, res) => {
    const {email , bookName, description } = req.body;
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
    const {email} = req.query;
    booksModel.find({ email: email }, (error, user) => {
        if (error){ res.send(error);}
        const filterdBooks = user[0].books.filter((book, index) => {
            if (id !== index){
                return book;
            }
        });
        user[0].books = filterdBooks;
        user[0].save();
        console.log(user[0].books);
        res.send(user[0].books);
    });
};
const updateBook = (req , res) => {
    const index = Number(req.params.index) ;
    const {email , bookName , bookDescription} = req.body ;
    booksModel.find({email:email} , (error , user) => {
      if(error) res.send(error);
      user[0].books[index].name = bookName ;
      user[0].books[index].description = bookDescription ;
      console.log(user[0]);
      user[0].save();
      res.send(user[0].books);
    });
  
    console.log(email);
  };
  
/*********************************************************/
const PORT = process.env.PORT;
/*********************************************************/
server.listen(PORT, () => {
    console.log(`Listening on PORT : ${PORT} `);
})
/*********************************************************/
server.get('/books', booksHandler);
server.get('/', homeHandler);
server.post('/books' , addNewBook);
server.delete('/books/:id' , deleteBook);
server.put('/books/:index' , updateBook );

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
    console.log(user2);
    user1.save();
    user2.save();
}
seedBooks();