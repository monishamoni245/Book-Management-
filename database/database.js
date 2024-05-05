const books = [
  {
    ISBN:"12345Book",
    title: "TESLA!!!",
    pubDate: "2021-08-05",
    language: "en",
    numPage: 250,
    author: [1,2],
    publications: [1],
    category: ["tech", "space", "education"]
  }
]
const author = [
  {
    id:1,
    name: "Monisha",
    books: ["12345Book", "secretBook"]
  },
  {
    id:2,
    name: "Roshan",
    books: ["12345Book"]
  }
]
const publications = [
  {
    id:1,
    name: "writex",
    books: ["12345Book"]
  },
  {
    id:2,
    name: "writey",
    books: []
  }

]
module.exports ={books, author, publications};
/*due to security reason we cant just export this database so we use module
 to export all the database so that we can access this in any js file*/





























































































































//....
