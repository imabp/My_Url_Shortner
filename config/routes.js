const express = require("express");
const ShortUrl = require("../models/shortUrl");
const Router = express.Router();

// this is the route of home page.
Router.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls });
});

// this is the route of shortening url.
Router.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

// shortUrl Routing

Router.get("/:short_url", async (req, res) => {
  const short = req.params.short_url;
  const shortUrl = await ShortUrl.findOne({ short });
  if (!shortUrl) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});

module.exports = Router;
