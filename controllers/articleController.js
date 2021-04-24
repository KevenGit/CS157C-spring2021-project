const Article = require("../models/article");

const article_create = (req, res) => {
  //Insert New Articles
  console.log(req.body);
  // const headline = {
  //     main: doc.headline.main,
  //     kicker: doc.headline.kicker,
  //     content_kicker: doc.headline.content_kicker,
  //     print_headline: doc.headline.print_headline
  // }

  // const byline = {
  //     original: doc.byline.original,
  //     organization: doc.byline.organization
  // }

  // const article = {
  //     abstract: doc.abstract,
  //     web_url: doc.web_url,
  //     snippet: doc.snippet,
  //     lead_paragraph: doc.lead_paragraph,
  //     source: doc.source,
  //     headline: headline,
  //     keywords: doc.keywords,
  //     pub_date: doc.pub_date,
  //     document_type: doc.document_type,
  //     news_desk: doc.news_desk,
  //     section_name: doc.section_name,
  //     subsection_name: doc.subsection_name,
  //     byline: byline,
  //     type_of_material: doc.type_of_material,
  //     word_count: doc.word_count
  // }

  // const DB = new Article(article);
};

const articles_get = async (req, res) => {
  //Get All Articles
  try {
    const articles = await Article.find();
    res.send(articles);
  } catch (error) {
    res.status(500).send(error);
  }
};

const article_delete = async (req, res) => {
  //Delete Article
  try {
    const article = await Article.findOneAndDelete({ _id: req.params.id });
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
};
const article_get = async (req, res) => {
  //Get Specific Article
  try {
    const article = await Article.find({ _id: req.params.id });
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
};
const article_update = async (req, res) => {
  //Update Specific Article
  try {
    const article = await Article.find({ _id: req.params.id });
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  article_create,
  article_delete,
  article_get,
  articles_get,
  article_update,
};
