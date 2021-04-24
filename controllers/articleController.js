const Article = require("../models/article");

// const article_search = (req, res) => {
//   //Search Article
//   console.log(req.query.abstract, req.query.news_desk);
//   Article.find({
//     $and: [
//       { abstract: { $regex: req.query.abstract } },
//       { news_desk: { $regex: req.query.news_desk } },
//     ],
//   }).then((results) => {
//     res.send(results);
//   });
// };

const article_search = (req, res) => {
  //Search Article
  console.log(req.query.abstract);
  Article.find({ abstract: { $regex: req.query.abstract } }).then((results) => {
    res.send(results);
  });
};

const article_delete = (req, res) => {
  //Delete Article
  console.log(req.query.abstract);
  Article.findOneAndDelete({ abstract: { $regex: req.query.abstract } }).then(
    (results) => {
      console.log(results);
    }
  );
};

const article_create = (req, res) => {
  //Insert New Articles
  const doc = req.body;

  const obj = {
    abstract: doc.abstract,
    web_url: doc.web_url,
    snippet: doc.snippet,
    lead_paragraph: doc.lead_paragraph,
    source: doc.source,

    headline: {
      main: doc.headline_main,
      kicker: doc.headline_kicker,
      print_headline: doc.headline_print_headline,
    },

    keywords: [
      {
        name: doc.keywords_name,
        value: doc.keywords_value,
      },
    ],

    pub_date: Date.now().toString,
    document_type: doc.document_type,
    news_desk: doc.news_desk,
    section_name: doc.section_name,
    subsection_name: doc.subsection_name,

    byline: {
      original: doc.byline.original,
      organization: doc.byline.organization,
    },
    type_of_material: doc.type_of_material,
    word_count: doc.word_count,
  };

  const article = new Article(obj);
  article
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

const article_bookmark = (req, res) => {};

module.exports = {
  article_create,
  article_delete,
  article_search,
  article_bookmark,
};
