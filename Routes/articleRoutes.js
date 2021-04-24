const express = require("express");
const router = new express.Router();
const articleController = require("../controllers/articleController");

router.post('/create', articleController.article_create);
router.get('/search', articleController.article_search);
router.post('/bookmark', articleController.article_bookmark);
router.get('/delete', articleController.article_delete);

module.exports = router;