const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    abstract: {type: String, default: null},
    web_url: {type: String, default: null},
    snippet: {type: String, default: null},
    lead_paragraph: {type: String, default: null},
    source: {type: String, default: null},

    headline: {
        type: {
            main: {type: String, default: null},
            kicker: {type: String, default: null},
            content_kicker: {type: String, default: null},
            print_headline: {type: String, default: null}
        },
        default: null
    },

    keywords: {
        type: [{
            name: {type: String, default: null},
            value: {type: String, default: null},
            rank: {type: Number, default: 0},
            major: {type: String, default: null}
        }],
        default: null
    },

    pub_date: {type: String, default: null},
    document_type: {type: String, default: null},
    news_desk: {type: String, default: null},
    section_name: {type: String, default: null},
    subsection_name: {type: String, default: null},

    byline: {
        type: {
            original: {type: String, default: null},
            organization: {type: String, default: null}
        },
        default: null
    },

    type_of_material: {type: String, default: null},
    word_count: {type: Number, default: 0}
});

const Article = mongoose.model('test', ArticleSchema);
module.exports = Article;