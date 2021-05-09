require("dotenv").config();
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Article = require("./models/article");

// Starting and Ending Years for API Data (Inclusive)
const years = {
  start: 2019,
  end: 2019,
};

// Starting and Ending Months for API Data (Inclusive)
const months = {
  start: 1,
  end: 3,
};

// Number of Docs to Take From Each Fetch Request
const numDocs = 10;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    // Get the Articles and Enter Into the DB
    for (let y = years.start; y <= years.end; y++) {
      for (let m = months.start; m <= months.end; m++) {
        execute(y, m);
      }
    }
  })
  .catch((err) => {
    console.error(err);
  });

// Wrangle the Data
function execute(year, month) {
  const url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${process.env.API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (var i = 0; i < numDocs; i++) {
        const doc = data.response.docs[i];

        const keywords = [];
        doc.keywords.forEach((element) => {
          keywords.push({
            name: element.name,
            value: element.value,
          });
        });

        const obj = {
          abstract: doc.abstract,
          web_url: doc.web_url,
          snippet: doc.snippet,
          lead_paragraph: doc.lead_paragraph,
          source: doc.source,

          headline: {
            main: doc.headline.main,
            kicker: doc.headline.kicker,
            print_headline: doc.headline.print_headline,
          },

          keywords: keywords,
          pub_date: doc.pub_date,
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
          .then((result) => {})
          .catch((err) => {
            console.error(err);
          });
      }
    });
}
