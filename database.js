const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Article = require("./models/article");

mongoose
  .connect(
    "mongodb+srv://midterm:5VOTsiSCnFMLmcar@cluster0.3voc6.mongodb.net/testDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then((result) => {
    execute();
  })
  .catch((err) => {
    console.error(err);
  });

function execute() {
  const url =
    "https://api.nytimes.com/svc/archive/v1/2019/12.json?api-key=ViUbIuUS3WR6cQUB4KlLQRkduU6CjHIL";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (var i = 0; i < 10; i++) {
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
          .then((result) => {
            console.log("Data saved!");
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
}
