const Article = require('../models/article');

const article_search = (req, res) => {
    res.send('Check the server console!');
}

const article_create = (req, res) => { //Insert New Articles
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
            print_headline: doc.headline_print_headline
        },

        keywords: [],

        pub_date: Date.now().toString,
        document_type: doc.document_type,
        news_desk: doc.news_desk,
        section_name: doc.section_name,
        subsection_name: doc.subsection_name,

        byline: {
            original: doc.byline.original,
            organization: doc.byline.organization
        },
        type_of_material: doc.type_of_material,
        word_count: doc.word_count
    }

    const article = new Article(obj);
    article.save()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.error(err);
    });   
}

const article_delete = (req, res) => { //Delete Article
    try{
        const article = await Article.findOneAndDelete({_id: req.params.id})
        res.send(article)
    }
    catch(error){
        res.status(500).send(error)
    }   
}

const article_bookmark = (req, res) => {
    
}

module.exports = {
    article_create,
    article_delete,
    article_search,
    article_bookmark,
}
