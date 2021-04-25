const express = require("express");
const router = new express.Router();
const articleController = require("../controllers/articleController");


router.get('/', articleController.article_index);
router.get('/search', articleController.article_search);
router.get('/details/:id', articleController.article_details);
router.post('/create', articleController.article_create);
router.put('/bookmark/:id', articleController.article_bookmark);
router.delete('/delete/:id', articleController.article_delete);

module.exports = router;