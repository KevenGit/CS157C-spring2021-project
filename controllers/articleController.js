const Article = require('../models/article');

const article_search = (req, res) => { //Search Article
    console.log(req.query.abstract);
    Article.find({abstract: { "$regex": req.query.abstract }})
    .then(results => {
        res.send(results)
    });
    
}

 const article_delete = (req, res) => { //Delete Article
    console.log(req.query.abstract);
    Article.findOneAndDelete({abstract: { "$regex": req.query.abstract }})
    .then(results => {
        console.log(results)
    });
}


const articles_get = (req, res) => { //Get All Articles
   Article.find()
    .then(results => {
    res.send(results)
});
}


   

module.exports = {
    article_create,
    article_delete,
    articles_get,
    article_search
    // article_update
}
