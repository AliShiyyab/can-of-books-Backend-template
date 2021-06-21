'use strict';
/*********************************************************/
const express = require('express');
const cors = require('cors');
require('dotenv').config();
/*********************************************************/
const server = express();
server.use(cors());
/*********************************************************/
let homeHandler = (req,res) => {res.send('Hello World!')}

function booksHandler(req,res){
    let userEmail = req.query.email;
    booksModel.find({email:userEmail},function(err,userData){
        if(err){
            console.log('something went wrong');
        }
        else
        {
            console.log(userData[0].books);
            res.send(userData[0].books);
        }
    })
}
server.get('/books',booksHandler)
server.get('/',homeHandler)

/*********************************************************/
const PORT = process.env.PORT;
/*********************************************************/
server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT} `)
})
/*********************************************************/
//////////////////////mongoose////////////////////////////
const mongoose = require('mongoose'); // import


mongoose.connect('mongodb://localhost:27017/favBooks', {  //connect with express
    useNewUrlParser: true, useUnifiedTopology: true
});


const BooksSchema = new mongoose.Schema({  // create
    email: String,
    books:Array,
  });

const booksModel = mongoose.model('Books', BooksSchema);

function seedBooks(){
    const user = new booksModel({
        email: 'aboood.banyissa.94@gmail.com',
        books: [{
            name: 'The Silent Patient', 
            description: 'a women may or may not have killed her husband and a theapist is determind to make her talk to discover her secrets.', 
            status: 'LIFE-CHANGING'
        },{
            name: 'The Hitchhickers Guide To The Gallaxy.',
            description: 'earth is destroyed and folks try to determine the ultimate question to the universe and everything',
            status: 'RECOMMENDED TO ME'
        }], 
       });
       console.log(user); // 'Silence'
       user.save();
    }

    // seedBooks();


