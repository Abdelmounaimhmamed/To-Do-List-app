require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routers = require("./routes/index");
const methodOverride = require("method-override");
const port = 3000;
const app = express();
app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : false}));
app.use(express.static("./public"));
app.use(methodOverride("_method"));

// connection to mongoodb 
mongoose.connect(process.env.DATA_URI, {useUnifiedTopology : true , useNewUrlParser : true});

// routes 
app.use(routers);



app.listen(port , () => {
    console.log(`--Start listining on port ${port}`);
    console.log("....");
});