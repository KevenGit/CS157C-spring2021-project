const express = require("express");
const router = new express.Router();
const articleController = require("../controllers/articleController");


router.get('/', articleController.article_index);
router.get('/search', articleController.article_search);
router.get('/search/author', articleController.article_search_author);
router.get('/search/bookmark', articleController.article_search_bookmark);
router.get('/search/wordcount', articleController.article_search_wordcount);
router.get('/search/numofarticles', articleController.article_search_numofarticles);
router.get('/search/rangeofwordcount', articleController.article_search_rangewordcount);
router.get('/details/:id', articleController.article_details);
router.post('/create', articleController.article_create);
router.put('/bookmark/:id', articleController.article_bookmark);
router.post('/Comments/:id', articleController.article_Comments);
router.delete('/delete/:id', articleController.article_delete);
router.get('/delete', articleController.article_delete_date);


module.exports = router;