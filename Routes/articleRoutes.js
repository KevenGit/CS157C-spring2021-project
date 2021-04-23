const express = require('express');
const router = new express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.articles_get);
router.post('/', articleController.article_create);
// router.delete('/:id', articleController.article_delete);
// router.get('/:id', articleController.article_get);
// router.put('/:id', articleController.article_update);

module.exports = router;