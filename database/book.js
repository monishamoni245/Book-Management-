const mongoose = require ("mongoose");

//create our book schema
//Schema is  blueprint which will having the key value pair where the key and its datatype
//This is the creation of schema---->db will be created in mongodb website
const BookSchema = mongoose.Schema(
  {
    ISBN:String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    author: [Number],
    publications: [Number],
    category: [String]
  }
);

//Creating a Model
//the books is the databasethat we created on mongodb
//we create a model because we cannot use the schema directly so we prepare a model and specify our database

const BookModel = mongoose.model("books",BookSchema);
//we export it so tht we can use it

module.exports = BookModel;
