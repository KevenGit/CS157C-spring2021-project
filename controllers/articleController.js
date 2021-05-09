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
  console.log(`Getting Details of: ${req.params.id}`);

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
  console.log(`Searching by Abstract: ${req.query.abstract}`);

  Article.find({ abstract: { $regex: req.query.abstract } })
    .then((results) => {
      res.render("searchpage", { results: results });
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 8: All Articles with a Certain Byline (Author)
const article_search_author = (req, res) => {
  console.log(`Searching by Author: ${req.query.byline}`);

  Article.find({ "byline.original": { $regex: req.query.byline } })
    .limit(10)
    .then((results) => {
      res.render("searchpage", { results: results });
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 9: All articles that are bookmarked
const article_search_bookmark = (req, res) => {
  console.log("Getting bookmarked articles");

  Article.find({ bookmark: true })
    .then((results) => {
      res.render("searchpage", { results: results });
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 2: Total Word Count of a month/year
const article_search_wordcount = (req, res) => {
  console.log(`Getting word count in ${req.query.date}`);

  Article.aggregate([
    { $match: { pub_date: { $regex: String(req.query.date) } } },
    { $group: { _id: null, total: { $sum: "$word_count" } } },
  ])
    .then((results) => {
      res.render("display", {
        count: results[0].total,
        date: req.query.date,
        element: "Words",
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 4: Total number of articles in a month/year
const article_search_numofarticles = (req, res) => {
  console.log(`Getting number of articles in ${req.query.date}`);

  results = Article.find({ pub_date: { $regex: String(req.query.date) } })
    .count()
    .then((results) => {
      res.render("display", {
        count: results,
        date: req.query.date,
        element: "Articles",
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 5: Search Articles by Source
const article_search_source = (req, res) => {
  console.log(`Search by Source: ${req.query.source}`);
  Article.find({ source: req.query.source })
    .limit(10)
    .then((results) => {
      res.render("searchpage", { results: results });
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 7: Articles by Section/Subsection Name
const article_search_section = (req, res) => {
  console.log(
    `Search by Section and Subsection: ${req.query.section}, ${req.query.subsection}`
  );
  Article.find({
    section_name: req.query.section,
    subsection_name: req.query.subsection,
  })
    .limit(10)
    .then((results) => {
      res.render("searchpage", { results: results });
    })
    .catch((err) => {
      res.send(err);
    });
};

// QUERY 6: Search All Articles from a Certain Word Count
const article_search_rangewordcount = (req, res) => {
  console.log(
    `Getting all article with word count ${req.query.min} - ${req.query.max}`
  );

  results = Article.find({
    word_count: { $gt: req.query.min, $lt: req.query.max },
  })
    .limit(10)
    .then((results) => {
      res.render("searchpage", { results: results });
    })
    .catch((err) => {
      res.send(err);
    });
};

// DELETE 1: Delete an Article
const article_delete = (req, res) => {
  console.log(`Deleting Article ${req.params.id}`);

  Article.findByIdAndDelete(req.params.id)
    .then((results) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      res.send(err);
    });
};

// DELETE 2: Delete Articles From a Certain Month
const article_delete_date = (req, res) => {
  console.log(`Deleting Articles from ${req.query.date}`);

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

  console.log(`Creating new Article`);
  const article = new Article(obj);
  article
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

// UPDATE 1: Bookmark Article
const article_bookmark = (req, res) => {
  console.log(`Bookmarking Article ${req.params.id}`);

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
  console.log(`Adding Comments to Article ${req.params.id}`);

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
};

// UPDATE 3: Correct an Article
const article_Corrections = (req, res) => {
  console.log(`Adding Corrections to Article ${req.params.id}`);

  Article.findByIdAndUpdate(
    req.params.id,
    { $set: { abstract: req.body.abstract } },
    { strict: false }
  )
    .then((results) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  article_search_source,
  article_index,
  article_create,

  article_details,
  article_search_wordcount,
  article_search,
  article_search_numofarticles,
  article_search_section,
  article_search_rangewordcount,
  article_search_source,
  article_search_author,
  article_search_bookmark,

  article_bookmark,
  article_Comments,
  article_Corrections,

  article_delete,
  article_delete_date,
};
