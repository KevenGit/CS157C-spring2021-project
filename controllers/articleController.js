const Article = require("../models/article");

// Get everthing for testing
const article_index = (req, res) => {
  Article.find()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 1. Read the Details of an Article
const article_details = (req, res) => {
  console.log(`_id: ${req.params.id}`);

  Article.findById(req.params.id)
    .then((result) => {
      res.render("details", { article: result });
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 3. Search by Abstract
const article_search = (req, res) => {
  console.log(`Abstract: ${req.query.abstract}`);

  Article.find({ abstract: { $regex: req.query.abstract } })
    .then((results) => {
      res.render("searchpage", { results: results, limit: 10});
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 8: All Articles with a Certain Byline (Author)
const article_search_author = (req, res) => {
  console.log(`Author: ${req.query.byline}`);

  Article.find({ "byline.original": { $regex: req.query.byline } })
    .then((results) => {
      res.render("searchpage", { results: results, limit: 10});
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 9: All articles that are bookmarked
const article_search_bookmark = (req, res) => {
  Article.find({ bookmark: Boolean("req.query.bookmark") })
    .then((results) => {
      res.render("searchpage", { results: results, limit: 10});
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 2: Total Word Count of a month/year
const article_search_wordcount = (req, res) => {
  Article.aggregate([
    { $match: { pub_date: { $regex: String(req.query.date) } } },
    { $group: { _id: null, total: { $sum: "$word_count" } } },
  ])
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 4: Total number of articles in a month/year
const article_search_numofarticles = (req, res) => {
  results = Article.find({ pub_date: { $regex: String(req.query.date) } })
    .count()
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 5: List All Keywords

// QUERY 7: Articles by Section/Subsection Name
// const article_search_section = (req, res) => {
//   console.log(``)
// }

// QUERY 6: Search All Articles from a Certain Word Count
const article_search_rangewordcount = (req, res) => {
  results = Article.find({
    word_count: { $gt: req.query.min, $lt: req.query.max },
  })
    .then((results) => {
      res.render("searchpage", { results: results, limit: 10});
    })
    .catch((err) => {
      res.send(err);
    });
};

// DELETE 1: Delete an Article
const article_delete = (req, res) => {
  console.log(req.params.id);

  Article.findByIdAndDelete(req.params.id)
    .then((results) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      res.send(err);
    });
};

// DELETE 2: Delete Articles Before a Certain Date
const article_delete_date = (req, res) => {
  Article.deleteMany({ pub_date: { $regex: String(req.query.date) } })
    .then((results) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      res.send(err);
    });
};

//CREATE 1: Add an Article
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

    pub_date: new Date().toJSON(),
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

// UPDATE 1: Bookmark Article
const article_bookmark = (req, res) => {
  console.log(`Bookmarking ${req.params.id}`);

  Article.findByIdAndUpdate(
    req.params.id,
    { $set: { bookmark: true } },
    { strict: false }
  )
    .then((results) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      res.send(err);
    });
};

// UPDATE 2: Add Comments for Editing
const article_Comments = (req, res) => {
  console.log(`Adding Comments to ${req.params.id}`);
  console.log(req.body);

  Article.findByIdAndUpdate(
    req.params.id,
    { $set: { comments: req.body.text } },
    { strict: false }
  )
    .then((results) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      res.send(err);
    });
  res.json({
    message: "Adding comments working!",
  });
};

// UPDATE 3: Correct an Article 
const article_Corrections = (req, res) => {
  console.log(`Adding Comments to ${req.params.id}`);
  console.log(req.body);

  Article.findByIdAndUpdate(
    req.params.id,
    { $set: { abstract: req.body.abstract } },
    { strict: false }
  )
    .then((results) => {
      res.redirect(`/articles/details/${req.params.id}`);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  article_index,
  article_create,

  article_details,
  article_search_wordcount,
  article_search,
  article_search_numofarticles,

  article_search_rangewordcount,
  
  article_search_author,
  article_search_bookmark,

  article_bookmark,
  article_Comments,
  article_Corrections,

  article_delete,
  article_delete_date,
};
