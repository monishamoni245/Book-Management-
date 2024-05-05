const mongoose = require ("mongoose");
//create our AUTHOR schema
//Schema is  blueprint which will having the key value pair where the key and its datatype
//This is the creation of schema---->db will be created in mongodb website
const AuthorSchema = mongoose.Schema(
  {
    id:Number,
    name: String,
    books: [String]
  }
);
//Creating a Model
//the books is the databasethat we created on mongodb
//we create a model because we cannot use the schema directly so we prepare a model and specify our database
const AuthorModel = mongoose.model("authors",AuthorSchema);
//we export it so tht we can use it
module.exports = AuthorModel;
