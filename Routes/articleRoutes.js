const express = require("express");
const router = new express.Router();
const articleController = require("../controllers/articleController");

// router.get('/', articleController.articles_get);
router.post('/create', articleController.article_create);
router.get('/search', articleController.article_search);
router.post('/bookmark', articleController.article_bookmark);
router.delete('/delete/:id', articleController.article_delete);

module.exports = router;