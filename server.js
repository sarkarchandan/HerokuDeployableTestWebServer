const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

const app = express();
app.set("view engine", hbs);

hbs.registerHelper("upperCased", (text) => {
  return text.toUpperCase();
});
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerPartials(__dirname + "/views/partials");

app.use((request, response, next) => {
  const now = new Date().toString();
  const log = `${now} : ${request.method} : ${request.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", (error) => {
    if(error) {
      console.log("Unable to log.");
    }
  });
  next();
});

app.get("/", (request,response) => {
  response.send({
    "message": "hello world"
  });
});

app.get("/home",(request, response) => {
  response.render("home.hbs", {
    name: "Chandan"
  });
});

app.get("/about", (request, response) => {
  response.render("about.hbs", {
    name: "Chandan"
  });
});

app.listen(port, () => {
  console.log(`Server started listening to port ${port}`);
});