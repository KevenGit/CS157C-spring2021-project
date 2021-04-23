const express = require('express');
const router = new express.Router();
const articleController = require('../controllers/articleController');


router.post('/', articleController.article_create);
router.get('/', articleController.articles_get);
router.delete('/:id', articleController.article_delete);
router.get('/:id', articleController.article_get);
router.put('/:id', articleController.article_update);

module.exports = router;