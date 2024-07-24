const Planet = require('../models/planet')

const home = (req, res) => {
    res.render("index.ejs");
  }

const new1 = (req, res) => {
    res.render("planets/new.ejs");
  }

const create = async (req, res) => {
    await Planet.create(req.body);
    res.redirect("/planets");
  }


  const allplanet = async(req, res) => {
    const allPlanets = await Planet.find();
    res.render("planets/index.ejs", { planet: allPlanets });
  }




  module.exports = {
    home,
    new1,
    create,
    allplanet,
  }