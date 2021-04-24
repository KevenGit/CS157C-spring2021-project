const express = require("express");
const router = new express.Router();
const articleController = require("../controllers/articleController");

router.get("/", articleController.articles_get);
router.post("/create", articleController.article_create);
//router.get("/search", articleController.article_search);
router.delete("/:id", articleController.article_delete);
router.get("/:id", articleController.article_get);
router.put("/update", articleController.article_update);

module.exports = router;
