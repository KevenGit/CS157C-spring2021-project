const fetch = require('node-fetch');
const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//       const conn = await mongoose.connect('mongodb+srv://midterm:5VOTsiSCnFMLmcar@cluster0.3voc6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true,
//       });
  
//       console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//       console.error(`Error: ${error.message}`);
//       process.exit(1);
//     }
// };

// await connectDB();

mongoose.connect('mongodb+srv://midterm:5VOTsiSCnFMLmcar@cluster0.3voc6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const HeadlineSchema = mongoose.Schema({
    main: {type: String, default: null},
    kicker: {type: String, default: null},
    content_kicker: {type: String, default: null},
    print_headline: {type: String, default: null}
});

const KeywordSchema = mongoose.Schema({
    name: {type: String, default: null},
    value: {type: String, default: null},
    rank: {type: Number, default: 0},
    major: {type: String, default: null},
});

const ByLineSchema = mongoose.Schema({
    original: {type: String, default: null},
    organization: {type: String, default: null}
})

const ArticleSchema = mongoose.Schema({
    abstract: {type: String, default: null},
    web_url: {type: String, default: null},
    snippet: {type: String, default: null},
    lead_paragraph: {type: String, default: null},
    source: {type: String, default: null},
    headline: {type: HeadlineSchema,default: null},
    keywords: {type: [KeywordSchema], default: null},
    pub_date: {type: String, default: null},
    document_type: {type: String, default: null},
    news_desk: {type: String, default: null},
    section_name: {type: String, default: null},
    subsection_name: {type: String, default: null},
    byline: {type: ByLineSchema, default: null},
    type_of_material: {type: String, default: null},
    word_count: {type: Number, default: 0}
});

const Article = mongoose.model('test', ArticleSchema);

const url = 'https://api.nytimes.com/svc/archive/v1/2019/12.json?api-key=ViUbIuUS3WR6cQUB4KlLQRkduU6CjHIL'
fetch(url)
.then(res => res.json())
.then(data => {
    const doc = data.response.docs[0];
    const headline = {
        main: doc.headline.main,
        kicker: doc.headline.kicker,
        content_kicker: doc.headline.content_kicker,
        print_headline: doc.headline.print_headline
    }

    const byline = {
        original: doc.byline.original,
        organization: doc.byline.organization
    }

    const article = {
        abstract: doc.abstract,
        web_url: doc.web_url,
        snippet: doc.snippet,
        lead_paragraph: doc.lead_paragraph,
        source: doc.source,
        headline: headline,
        keywords: doc.keywords,
        pub_date: doc.pub_date,
        document_type: doc.document_type,
        news_desk: doc.news_desk,
        section_name: doc.section_name,
        subsection_name: doc.subsection_name,
        byline: byline,
        type_of_material: doc.type_of_material,
        word_count: doc.word_count
    }

    const DB = new Article(article);
    DB.save();
});