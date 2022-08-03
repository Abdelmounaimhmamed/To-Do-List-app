const express = require("express");
const router = express.Router();
const todo = require("./../models/todo");
const Contact = require("./../models/contact");


router.get("/" ,  async (req, res) => {
    const items = await  todo.find().sort({createdAt : 'desc'});
    res.render("home.ejs"  , {items : items});
});
router.post("/" , async (req, res) => {
    const todos = new todo({
        text : req.body.text
    });
    try {
       await  todos.save();
       res.redirect("/");
    }
    catch (e){
        console.log(e);
        res.render("error.ejs");
    }
});
router.delete("/:id" , async (req,res) => {
    await todo.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

router.get("/contact" , (req,res) => {
    res.render("contact.ejs");
});

router.post("/contact" , async  (req,res) => {
    const contact = new Contact({
        email : req.body.email,
        text : req.body.text,
        date : req.body.date,
        comment : req.body.comment
    });

    try {
        await contact.save();
        res.redirect("/");
    }
    catch (e){
        console.log(e);
    }
});
module.exports = router;
