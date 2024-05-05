require("dotenv").config();
const express = require ("express");
const mongoose = require ("mongoose");//requiring mongoose
var bodyParser = require("body-parser")
//we should use body parser or we cannot parse our body into json format..so we must use bodyParser
//body parser is a folder in node_modules.bodyParser is one of the dependencies of express and for executing postrequest we need it
//database
const database = require("./database/database");
//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
//Initialize express
const booky = express();
//Initialize bodyParser
booky.use(bodyParser.urlencoded({extended:true}))
booky.use(bodyParser.json());//the bodyParser should use the json format so we are using this code-->optional code line
//urlencoded({extended:true-->it precises that the request which we are parsing will contain any kind of values
mongoose.connect(process.env.MONGO_URL
).then(() => console.log("connection established"));
/*
Route              /
description        Get all the BOOKS
Access             PUBLIC
Parameter          NONE
Methods            GET
*/
booky.get("/",async (req,res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});
/*
Route              /is
description        Get specific book on ISBN
Access             PUBLIC
Parameter          isbn
Methods            GET
*/
booky.get("/is/:isbn",async (req,res)=>{
  const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

/*const getSpecificBook = database.books.filter(
  (book)=> book.ISBN === req.params.isbn
);*/

//mongodb is not a language so it doesnt understand that length===0.....so thays why we r using NULL
//NULL  !0 = 1, !1=0
if(!getSpecificBook){
  return res.json({error:`No book found for the ISBN of ${req.params.isbn} `})
}
return res.json({book:getSpecificBook});
});

/*
Route              /c
description        Get specific book on category
Access             PUBLIC
Parameter          category
Methods            GET
*/
booky.get("/c/:category",async (req,res) => {
  const getSpecificBook = await BookModel.findOne({category: req.params.category});
  /*const getSpecificBook = database.books.filter(
    (book)=> book.category.includes(req.params.category)
  );*/
  //NULL  !0 = 1, !1=0
  if(!getSpecificBook){
    return res.json({error:`No book found for the category of ${req.params.category} `})
  }
  return res.json({book:getSpecificBook});
});
/*
Route              /l
description        Get specific book on language
Access             PUBLIC
Parameter          language
Methods            GET
*/
booky.get("/l/:language",async (req,res) => {
  const getSpecificBook = await BookModel.findOne({language:req.params.language});
  /*const getSpecificBook = database.books.filter(
    (book)=> book.language.includes(req.params.language)
  );*/
  if(!getSpecificBook){
    return res.json({error:`No book found for the language of ${req.params.language} `})
  }
  return res.json({book:getSpecificBook});
});
/*
Route              /authour
description        to get all the authours
Access             PUBLIC
Parameter          NONE
Methods            GET
*/
booky.get("/author",async (req,res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});
/*
Route              /authour/book
description        Get all authours based on book
Access             PUBLIC
Parameter          isbn
Methods            GET
*/
booky.get("/author/book/:isbn",async (req,res)=>{
  const getSpecificAuthor = await AuthorModel.findOne({isbn:req.params.isbn});

/*const getSpecificAuthor = database.author.filter(
  (author)=> author.books.includes(req.params.isbn)
);*/
if(!getSpecificAuthor){
  return res.json({error:`No authors found for the book of ${req.params.isbn} `});
}
return res.json({authors:getSpecificAuthor});
});

/*
Route              /author
description        Get Specific author based on id
Access             PUBLIC
Parameter          id
Methods            GET
*/
booky.get("/author/:id",async (req, res) => {

  const getSpecificAuthor = await AuthorModel.findOne({id:req.params.id});

  /*const authorId = parseInt(req.params.id); // Convert id to integer if it's stored as a string
  const getSpecificAuthor = database.author.filter(
    (author) => author.id === authorId // Use strict equality comparison (===) to match IDs
  );*/
  if (!getSpecificAuthor) { // Use strict equality comparison (===) to compare lengths
    return res.json({ error: `No author found for the ID ${req.params.id}` });
  }
  return res.json({ author: getSpecificAuthor });
});

/*
Route              /publications
description        to get all the publications
Access             PUBLIC
Parameter          NONE
Methods            GET
*/
booky.get("/publications",async (req,res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
});

/*
Route              /authour/book
description        Get all authours based on book
Access             PUBLIC
Parameter          isbn
Methods            GET
*/
booky.get("/publications/book/:isbn",async(req,res)=>{
  const getSpecificPublications = await PublicationModel.findOne({isbn:req.params.isbn});

/*const getSpecificPublications = database.publications.filter(
  (publications)=> publications.books.includes(req.params.isbn)
);*/
if(!getSpecificPublications){
  return res.json({error:`No publications found for the book of ${req.params.isbn} `});
}
return res.json({authors:getSpecificPublications});
});

/*
Route              /publications
description        Get Specific publications based on id
Access             PUBLIC
Parameter          id
Methods            GET
*/
booky.get("/publications/:id",async (req, res) => {
  const getSpecificPublications = await AuthorModel.findOne({id:req.params.id});
  const publicationsId = parseInt(req.params.id); // Convert id to integer if it's stored as a string
  /*const getSpecificPublication = database.publications.filter(
    (publications) => publications.id === publicationsId // Use strict equality comparison (===) to match IDs
  );*/
  if (!getSpecificPublications) { // Use strict equality comparison (===) to compare lengths
    return res.json({ error: `No publication found for the ID ${req.params.id}` });
  }
  return res.json({ publications: getSpecificPublications });
});
//API PROJECT-->2 (Video-22)
//POST METHOD
/*
Route              /book/new
description        Add new BOOKS
Access             PUBLIC
Parameter          NONE
Methods            POST
*/
booky.post("/book/new",async (req,res)=> {
const { newBook } = req.body;
const addNewBook = BookModel.create(newBook);
return res.json({
  books:addNewBook,
  message: "BOOK WAS ADDED"
});
//database.books.push(newBook);
//return res.json({updatedBoks: database.books});
});

/*
Route              /author/new
description        Add new authors
Access             PUBLIC
Parameter          NONE
Methods            POST
*/
booky.post("/author/new",async (req,res)=>{
  const { newAuthor } = req.body;
  const addNewAuthor = AuthorModel.create(newAuthor);
  return res.json({
    Author:addNewAuthor,
    message: "AUTHOR WAS ADDED"
  });
  //database.author.push(newAuthor);
  //return res.json(database.author);
});

/*
Route              /publications/new
description        Add new publications
Access             PUBLIC
Parameter          NONE
Methods            POST
*/
booky.post("/publications/new",async (req,res)=>{
  const { newPublications } = req.body;
  const addNewPublications = PublicationModel.create(newPublications);
  return res.json({
    publications:addNewPublications,
    message: "PUBLICATIONS WAS ADDED"
  });

  //database.publications.push(newPublications);
  //return res.json(database.publications);
});

//API PROJECT-->3 (Video-23)
//PUT METHOD
/*
Route              /book/update/
description        update book on ISBN
Access             PUBLIC
Parameter          isbn
Methods            PUT
*/
booky.put("/book/update/:isbn",async(req,res)=>{
  const updateBook = await BookModel.findOneAndUpdate(
    {
    ISBN: req.params.isbn
  },
{
  title: req.body.bookTitle  //WE ARE UPDATING THE TITLE BY USING THE ISBN NUMBER
},
{
  new :true  //important --> we must use the new:true
  //this will update the entire newbook title in the backend and also show the newBookbook title in the frontend also
  //like in the MongoDB frontend and the postman frontend
}
);
return res.json({
    books: updateBook,
    message:"UPDATED"

  });
});

/***********UPDATING THE NEW AUTHOR*************/
/*
Route              /book/author/update/
description        update or addnew the author
Access             PUBLIC
Parameter          isbn
Methods            PUT
*/
booky.put("/book/author/update/:isbn",async(req,res)=>{
  //update book database
  const updateBook = await BookModel.findOneAndUpdate(
    {
    ISBN: req.params.isbn
  },
{
  $addToSet: {
    authors:req.body.newAuthor
  }
},
{
  new :true  //important --> we must use the new:true
  //this will update the entire newbook title in the backend and also show the newBookbook title in the frontend also
  //like in the MongoDB frontend and the postman frontend
}
);
//update the author database
const updatedAuthor = await AuthorModel.findOneAndUpdate(
  {
  id:req.body.newAuthor
},
{
  $addToSet: {
  books:req.params.isbn
}
},
{
  new :true  //important --> we must use the new:true
  //this will update the entire newbook title in the backend and also show the newBookbook title in the frontend also
  //like in the MongoDB frontend and the postman frontend
});
return res.json({
    books: updateBook,
    authors:updatedAuthor,
    message:"UPDATED"

  });
});

//DELETE
/*
Route              /book/delete/
description        Delete a book
Access             PUBLIC
Parameter          isbn
Methods            DELETE
*/
booky.delete("/book/delete/:isbn",async (req,res) =>{
//Whichever book that doesnt match with the ISBN just send it to an updatedBookDatabase array and rest will be filtered out
const updatedBookDatabase = await BookModel.findOneAndDelete(
  {
    ISBN: req.params.isbn
  }
);
return res.json({
  books:updatedBookDatabase
});
});

/*
Route              /author/delete/
description        DELETE AUTHOR FROM BOOK
Access             PUBLIC
Parameter          id
Methods            DELETE
*/
  // Assuming you have imported the database module and assigned it to a variable named "database"
  // Route to delete an author by ID
  booky.delete("/author/delete/:id",async (req,res) =>{
  //Whichever book that doesnt match with the ISBN just send it to an updatedBookDatabase array and rest will be filtered out
  const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
    {
      ID: req.params.id
    }
  );
  return res.json({
    author:updatedAuthorDatabase
  });
  });
  /*
    Route              book/delete/author
    description        DELETE AUTHOR FROM BOOK and vice versa
    Access             PUBLIC
    Parameter          isbn, authorId
    Methods            DELETE
  */
  //UPDATE THE BOOK DATABASE
  booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    // Iterate over each book in the database
    database.books.forEach((book) => {
      // Check if the ISBN of the book matches the ISBN provided in the request parameters
      if (book.ISBN === req.params.isbn) {
        // Filter out the author with the provided authorId from the book's author list
        const newAuthorList = book.author.filter(
          (eachAuthor) => eachAuthor !== parseInt(req.params.authorId));
        // Update the book's author list with the filtered list
        book.author = newAuthorList;
        return; // Exit the loop once the author is deleted from the book
      }
    });

    // Iterate over each author in the database
    database.author.forEach((eachAuthor) => {
      // Check if the ID of the author matches the authorId provided in the request parameters
      if (eachAuthor.Id === parseInt(req.params.authorId)) {
        // Filter out the book with the provided ISBN from the author's book list
        const newBookList = eachAuthor.books.filter(
          (book) => book !== req.params.isbn
        );
        // Update the author's book list with the filtered list
        eachAuthor.books = newBookList;
        return; // Exit the loop once the book is deleted from the author
      }
    });
    return res.json({
      book: database.books,
      author: database.author,
      message:"Author was deleted"
    });
  });
booky.listen(3000,()=>{
  console.log("server is running");
});
