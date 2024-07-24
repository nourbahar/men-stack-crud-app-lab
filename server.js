const express = require("express");
const app = express();
require('dotenv').config();
require('./config/database');
const Planet = require("./models/planet.js");
const methodOverride = require("method-override"); 
const morgan = require("morgan");
const planetCtrl = require("./controllers/planet");

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))


//controllers
app.get("/", planetCtrl.home);
app.get("/planets/new", planetCtrl.new1);
app.get("/planets", planetCtrl.allplanet);
app.post("/planets", planetCtrl.create)

app.get("/planets/:planetId", async (req, res) => {
  const foundPlanet = await Planet.findById(req.params.planetId);
  res.render("planets/show.ejs", { planet: foundPlanet });
 } );

 app.delete("/planets/:planetId", async (req, res) => {
  await Planet.findByIdAndDelete(req.params.planetId);
  res.redirect("/planets");
});


app.get("/planets/:planetId/edit", async (req, res) => {
  const foundPlanet = await Planet.findById(req.params.planetId);
  res.render("planets/edit.ejs", {
    planet: foundPlanet,
  });
});




app.put("planets/:planetId", async (req, res) => {

  await Planet.findByIdAndUpdate(req.params.planetId, req.body);

  res.redirect(`/planets/${req.params.planetId}`);
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
  });