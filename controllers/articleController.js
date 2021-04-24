const Article = require("../models/article");

// Get a specific article and show its details
const article_details = (req, res) => {
  console.log(req.params.id);
  Article.findById(req.params.id)
  .then(result => {
    res.render('details', {article: result});
  })
  .catch(err => {
    res.send(err);
  });
}

//Search Article by the Abstract
const article_search = (req, res) => {
  console.log(req.query.abstract);

  Article.find({ abstract: { $regex: req.query.abstract } }).then((results) => {
    res.render("searchpage", { results: results });
  });
};

//Delete Article
const article_delete = (req, res) => {
  console.log(req.params.id);

  Article.findByIdAndDelete(req.params.id)
  .then(results => {
      res.json({redirect: '/'});
    }).catch(err => {
      res.send(err);
    });
};

//Insert One New Article
const article_create = (req, res) => {

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
      original: doc.byline_original,
      organization: doc.byline_organization,
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

// Bookmark one article
const article_bookmark = (req, res) => {};

module.exports = {
  article_details,
  article_create,
  article_delete,
  article_search,
  article_bookmark,
};
