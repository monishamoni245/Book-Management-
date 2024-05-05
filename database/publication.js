const mongoose = require ("mongoose");
//create our PUBLICATION schema
//Schema is  blueprint which will having the key value pair where the key and its datatype
//This is the creation of schema---->db will be created in mongodb website
const PublicationSchema = mongoose.Schema(
  {
    id:Number,
    name: String,
    books: [String]
  }
);
//Creating a Model
//we create a model because we cannot use the schema directly so we prepare a model and specify our database
//the books is the database that we created on mongodb
const PublicationModel = mongoose.model("publications",PublicationSchema);
//we export it so tht we can use it

module.exports = PublicationModel;
